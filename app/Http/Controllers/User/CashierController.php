<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Models\Screening\Payments;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentsRequest;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Storage;

class CashierController extends Controller
{

    public function index()
    {
        return Inertia::render('Cashier/Dashboard');
    }

    public function ScreeningOffline()
    {
        $screenings = Offline::whereNotNull('health_check_result')
            ->where('payment_status', false)
            ->get();

        return Inertia::render('Cashier/Screening/Offline/Screening', [
            'screenings' => $screenings,
        ]);
    }

    public function Payment($id)
    {
        $screening = Offline::findOrFail($id);
        return Inertia::render('Cashier/Payment/Index', [
            'screening' => $screening,
        ]);
    }

    /**
     * Summary of confirmPaymentOffline
     * @param \App\Http\Requests\PaymentsRequest $request
     * @param mixed $id
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function confirmPaymentOffline(PaymentsRequest $request, $id)
    {
        // Cari screening berdasarkan ID
        $screening = Offline::findOrFail($id);

        // Cek apakah sudah ada pembayaran terkait screening ini
        $existingPayment = Payments::where('screening_id', $screening->id)->first();

        if ($existingPayment && $existingPayment->payment_status) {
            return response()->json(['error' => 'Pembayaran sudah dilakukan sebelumnya.'], 400);
        }

        // Simpan bukti pembayaran
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');

        // Buat pembayaran baru
        $payment = Payments::create([
            'screening_id' => $screening->id,
            'payment_status' => true,
            'amount_paid' => $request->amount_paid,
            'quantity_product' => $request->quantity_product,
            'price_product' => $request->price_product,
            'payment_proof' => $paymentProofPath, // Simpan path gambar
        ]);

        // Update status pembayaran pada screening
        $screening->payment_status = true; // Atur status pembayaran menjadi true
        $screening->save(); // Simpan perubahan ke database

        return response()->json(['message' => 'Pembayaran berhasil diproses.'], 200);
    }

    private function validatePayment(PaymentsRequest $request)
    {
        return $request->validated();
    }

    private function responseError(string $message)
    {
        return response()->json(['error' => $message], 400);
    }



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
