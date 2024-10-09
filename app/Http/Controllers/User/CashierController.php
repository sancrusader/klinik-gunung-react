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

    public function index()
    {
        return Inertia::render('Cashier/Dashboard');
    }

    // Offline Screening Payment
    public function ScreeningOffline()
    {
        // Mendapatkan data dengan whereNotNull dan where
        $screenings = Offline::whereNotNull('health_check_result')
            ->where('payment_status', false)
            ->get();

        return Inertia::render('Cashier/Screening/Offline/Screening', [
            'screenings' => $screenings,
        ]);
    }

    public function Payment($id) {
        $screening = Offline::findOrFail($id);
        return Inertia::render('Cashier/Screening/Offline/Payment', [
            'screening' => $screening,
        ]);
    }

    // Konfirmasi pembayaran screening
    public function confirmPaymentOffline(Request $request, $id)
    {
        // Validasi data yang dikirimkan
        $validated = $request->validate([
            'payment_method' => 'required|in:cash,qris,transfer',
            'amount_paid' => 'required|in:50000,100000,150000,200000',
        ]);

        // Temukan data screening berdasarkan ID
        $screening = Offline::findOrFail($id);

        // Pastikan pembayaran belum dikonfirmasi sebelumnya
        if ($screening->payment_status) {
            return response()->json(['error' => 'Pembayaran sudah dikonfirmasi sebelumnya.'], 400);
        }

        // Update status pembayaran dan jumlah yang dibayar
        $screening->payment_status = true;
        $screening->amount_paid = $validated['amount_paid'];
        $screening->payment_method = $validated['payment_method'];
        $screening->save();

        // Buat sertifikat dan simpan path-nya
        $certificatePath = $this->generateCertificateOffline($screening);
        $screening->certificate_path = $certificatePath;
        $screening->save();

        // return response()->json(['success' => 'Pembayaran berhasil diproses.'], 200);
        return;
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


    // History pembayaran
    public function history()
    {
        $paidScreenings = Offline::where('payment_status', true)->get();

        foreach ($paidScreenings as $screening) {
            $screening->certificate_url = Storage::url($screening->certificate_path);
        }

        return Inertia::render('Cashier/Screening/Offline/History', [
        'paidScreenings' => $paidScreenings,
    ]);
    }

}
