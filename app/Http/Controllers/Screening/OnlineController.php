<?php

namespace App\Http\Controllers\Screening;

use Inertia\Inertia;
use App\Mail\QrCodeMail;
use Illuminate\Http\Request;
use App\Models\Screening\Online;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Requests\Screening\OnlineRequest;

class OnlineController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
         return Inertia::render('Patients/Screening/HistoryOnline', [
            'screenings' => Online::where('user_id', $userId)->get(),
         ]);
    }

    public function create()
    {
        return Inertia::render('Screening/Online');
    }

    public function store(OnlineRequest $request)
    {
        $screening = Online::create([
            'user_id' => Auth::id(),
            'full_name' => $request->full_name,
            'date_of_birth' => $request->date_of_birth,
            'mountain' => $request->mountain,
            'citizenship' => $request->citizenship,
            'country' => $request->country,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'question1' => $request->question1,
            'question2' => $request->question2,
            'question3' => $request->question3,
            'additional_notes' => $request->additional_notes,
            'status' => 'pending',
            'queue_number' => $this->generateQueueNumber(),
        ]);

       return;
    }

    public function payment($id)
    {
        $screening = Online::findOrFail($id);
        return inertia('Patients/Screening/PaymentOnline', compact('screening'));
    }

    public function paymentCallback(Request $request)
    {
        $screeningId = $request->input('screening_id');
        $screening = Online::findOrFail($screeningId);

        $screening->payment_status = true;
        $screening->save();

        $qrCodeData = json_encode($screening->toArray());

        $qrCodeImage = QrCode::format('png')->size(200)->generate($qrCodeData);

        $path = storage_path('app/public/qrcodes/');
        $filename = 'qrcode_' . $screening->id . '.png';

        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }

        file_put_contents($path . $filename, $qrCodeImage);

        $qrCodeUrl = asset('storage/qrcodes/' . $filename);

        $screening->qr_code_url = $qrCodeUrl;
        $screening->save();

        Mail::to($screening->email)->send(new QrCodeMail($screening, $qrCodeUrl));

        return redirect()->route('screenings.index')->with('success', 'Pembayaran berhasil, QR code telah dikirim.');
    }


    public function confirmPayment(Request $request, $id)
    {
        $screening = Online::findOrFail($id);

        if ($screening->payment_status && !$screening->qr_code_sent) {
            $screening->payment_confirmed = true;
            $screening->save();

            // Generate QR Code
            $qrCodeData = json_encode($screening->toArray());
            $qrCodeImage = QrCode::format('png')->size(200)->generate($qrCodeData);
            $path = storage_path('app/public/qrcodes/');
            $filename = 'qrcode_' . $screening->id . '.png';

            if (!is_dir($path)) {
                mkdir($path, 0777, true);
            }

            file_put_contents($path . $filename, $qrCodeImage);
            $qrCodeUrl = asset('storage/qrcodes/' . $filename);

            $screening->qr_code_url = $qrCodeUrl;
            $screening->qr_code_sent = true;
            $screening->save();

            // Send QR Code to Email
            Mail::to($screening->email)->send(new QrCodeMail($screening, $qrCodeUrl));

            return redirect()->route('cashier.screening.online')->with('success', 'Pembayaran dikonfirmasi dan QR code telah dikirim.');
        }

        return redirect()->route('cashier.screening.online')->with('error', 'Pembayaran belum dilakukan atau QR code sudah dikirim.');
    }

    public function ScreeningOnlinePayment()
    {
        return Inertia::render('Cashier/Screening/PaymentOnline', [
            'screenings' => Online::where('payment_status', true)
            ->where('payment_confirmed', false)->get(),
         ]);
    }

    private function generateQueueNumber()
    {
        return Online::max('queue_number') + 1;
    }

    private function generateCertificate($screening)
    {
        $data = [
            'full_name' => $screening->full_name,
            'date_of_birth' => $screening->date_of_birth,
            'mountain' => $screening->mountain,
            'citizenship' => $screening->citizenship,
            'country' => $screening->country,
            'address' => $screening->address,
            'phone' => $screening->phone,
            'email' => $screening->email,
            'date' => now()->format('Y-m-d')
        ];

        $pdf = PDF::loadView('certificates.certificate', $data);

        $path = 'certificates/';
        $filename = 'certificate_' . $screening->id . '.pdf';

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        Storage::put($path . $filename, $pdf->output());

        return $path . $filename;
    }
}
