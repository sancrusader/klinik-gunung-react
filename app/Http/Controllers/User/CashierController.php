<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Models\Screening\Payments;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PaymentsRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class CashierController extends Controller
{
    public function index()
    {
        return Inertia::render('Cashier/Dashboard');
    }

    public function profile(Request $request): Response
    {
        return Inertia::render('Profile/Cashier', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
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
     *
     * @param  mixed  $id
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function confirmPaymentOffline(PaymentsRequest $request, $id)
    {

    // Find screening by ID
    $screening = Offline::findOrFail($id);

    // Check if there's an existing payment for this screening
    $existingPayment = Payments::where('screening_id', $screening->id)->first();

    if ($existingPayment && $existingPayment->payment_status) {
        return response()->json(['error' => 'Pembayaran sudah dilakukan sebelumnya.'], 400);
    }

    // Initialize payment proof path as null
    $paymentProofPath = null;

    // Check if payment proof is provided and store it if present
    if ($request->hasFile('payment_proof') && $request->file('payment_proof')->isValid()) {
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');
    }

    $payment = Payments::create([
        'screening_id' => $screening->id,
        'cashier_id' => Auth::id(),
        'payment_status' => true,
        'payment_method' => $request->payment_method,
        'amount_paid' => $request->amount_paid,
        'quantity_product' => $request->quantity_product,
        'price_product' => $request->price_product,
        'payment_proof' => $paymentProofPath,
    ]);
    $screening->payment_status = true;
    $screening->save();

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
        // Get the current cashier's ID
        $cashierId = Auth::id();

        // Get paid screenings associated with the current cashier
        $paidScreenings = Offline::where('payment_status', true)
            ->whereHas('payments', function ($query) use ($cashierId) {
                $query->where('cashier_id', $cashierId);
            })
            ->get();

        // Generate certificate URLs
        foreach ($paidScreenings as $screening) {
            $screening->certificate_url = Storage::url($screening->certificate_path);
        }

        return Inertia::render('Cashier/Payment/History', [
            'paidScreenings' => $paidScreenings,
        ]);
    }
}
