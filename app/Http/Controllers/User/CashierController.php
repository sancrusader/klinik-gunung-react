<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Storage;

class CashierController extends Controller
{

    public function index(){
        return Inertia::render('Cashier/Dashboard');
    }

public function ScreeningOffline()
{
    // Mendapatkan data dengan whereNotNull dan where
    $screenings = Offline::whereNotNull('health_check_result')
        ->where('payment_status', false)
        ->get(); // Tambahkan get() untuk memastikan $screenings berupa koleksi/array

    return Inertia::render('Cashier/Screening/Payment', [
        'screenings' => $screenings, // Kirim data screenings ke frontend
    ]);
}
    public function confirmPaymentOffline(Request $request, $id)
    {
        $screening = Offline::findOrFail($id);
        $screening->payment_status = true;
        $screening->amount_paid = $request->amount_paid;
        $screening->save();

        $certificatePath = $this->generateCertificateOffline($screening);
        $screening->certificate_path = $certificatePath;
        $screening->save();

        return redirect()->route('cashier.dashboard')->with('success', 'Pembayaran berhasil dikonfirmasi dan sertifikat telah dibuat.');
    }
    
    private function generateCertificateOffline($screening)
    {
        $data = [
            'full_name' => $screening->full_name,
            'health_check_result' => $screening->health_check_result,
            'date' => now()->format('Y-m-d')
        ];

        $pdf = PDF::loadView('certificates.simple_certificate', $data);

        $path = 'public/certificates/';
        $filename = 'certificate_' . $screening->id . '.pdf';

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        Storage::put($path . $filename, $pdf->output());

        return $path . $filename;
    }

    public function history()
    {
        $paidScreenings = Offline::where('payment_status', true)->get();

        foreach ($paidScreenings as $screening) {
            $screening->certificate_url = Storage::url($screening->certificate_path);
        }

        return Inertia::render('Cashier/Screening/History', [
        'paidScreenings' => $paidScreenings, // Kirim data screenings ke frontend
    ]);
    }

    
}
