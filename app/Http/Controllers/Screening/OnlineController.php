<?php

namespace App\Http\Controllers\Screening;

use Inertia\Inertia;
use App\Mail\QrCodeMail;
use Illuminate\Http\Request;
use App\Models\Screening\Online;
use App\Models\Screening\Payments;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\PaymentsRequest;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Helpers\ScreeningOfflineHelper;
use Illuminate\Support\Facades\Storage;
use App\Models\Screening\PaymentsOnline;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Requests\PaymentsOnlineRequest;
use App\Http\Requests\Screening\OnlineRequest;

class OnlineController extends Controller
{

    // Index Form Screening Online
    public function index()
    {
        $userId = Auth::id();
        $hasScreening = Online::where('user_id', $userId)->exists();
        if ($hasScreening) {
            return redirect()->route('screening.online')->with('error', 'Anda sudah melakukan screening offline.');
        }
        $questions = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Screening/Online', [
            'questions' => $questions,
        ]);
    }

    public function show()
    {
        $userId = Auth::user()->id;

        $screening = Online::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('Patients/Screening/HistoryOnline', [
            'screening' => $screening,
        ]);
    }

    public function store(OnlineRequest $request)
    {
        $userId = Auth::id();

        $queueNumber = $this->generateQueueNumber();

        $screeningOffline = Online::create([
            'status' => 'pending',
            'queue_number' => $queueNumber,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'user_id' => $userId,
            'age' => $request->age,
            'gender' => $request->gender,
            'contact_number' => $request->contact_number,
            'planned_hiking_date' => $request->planned_hiking_date,
            'previous_hikes_count' => $request->previous_hikes_count,
        ]);

        $updateData = [];
        foreach (range(1, 6) as $index) {
            $field = "physical_health_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }

        foreach (range(1, 5) as $index) {
            $field = "experience_knowledge_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }

        // Perform batch update to minimize queries
        $screeningOffline->update($updateData);

        return back()->with('success', 'Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: '.$queueNumber);
    }

    // View untuk screening online
    public function payment($id)
    {
        $screening = Online::findOrFail($id);

        return Inertia::render('Patients/Screening/Payments/ScreeningOnlinePayment', [
            'screening' => $screening,
        ]);
    }

    public function confirmPaymentOnline(PaymentsOnlineRequest $request, $id)
    {
    // Temukan data screening online berdasarkan ID
    $screening = Online::findOrFail($id);

    // Cek apakah pembayaran sudah pernah dilakukan
    $existingPayment = PaymentsOnline::where('screening_id', $screening->id)->first();
    if ($existingPayment && $existingPayment->payment_status) {
        return response()->json(['error' => 'Pembayaran sudah dilakukan sebelumnya.'], 400);
    }

    // Simpan bukti pembayaran jika ada
    $paymentProofPath = null;
    if ($request->hasFile('payment_proof') && $request->file('payment_proof')->isValid()) {
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');
    }

    $payment = PaymentsOnline::create([
        'screening_id' => $screening->id,
        'payment_status' => true,
        'payment_method' => $request->payment_method,
        'amount_paid' => $request->amount_paid,
        'payment_proof' => $paymentProofPath,
    ]);

    $screening->payment_status = true;
    $screening->save();

    $qrCodeData = json_encode([
        'id' => $screening->id,
        'full_name' => $screening->full_name,
        'email' => $screening->email,
        'age' => $screening->age,
        'planned_hiking_date' => $screening->planned_hiking_date,
        'previous_hikes_count' => $screening->previous_hikes_count,
    ]);

    // Generate QR code
    $qrCodeImage = QrCode::format('png')->size(200)->generate($qrCodeData);
    $path = 'qrcodes/';
    $filename = 'qrcode_' . $screening->id . '.png';

    Storage::disk('public')->put($path . $filename, $qrCodeImage);

    // Simpan URL QR code ke dalam database
    $qrCodeUrl = asset('storage/' . $path . $filename);
    $screening->qr_code_url = $qrCodeUrl;
    $screening->save();

    // Kirim email dengan QR code jika dibutuhkan
    Mail::to($screening->email)->send(new QrCodeMail($screening, $qrCodeUrl));

    return response()->json(['message' => 'Pembayaran berhasil diproses. QR code telah dikirim.'], 200);
}

    // Menampilkan ke cashier
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
            'date' => now()->format('Y-m-d'),
        ];

        $pdf = PDF::loadView('certificates.certificate', $data);

        $path = 'certificates/';
        $filename = 'certificate_'.$screening->id.'.pdf';

        if (! Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        Storage::put($path.$filename, $pdf->output());

        return $path.$filename;
    }
}
