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
        return Inertia::render('Cashier/Screening/Offline/Payment', [
            'screening' => $screening,
        ]);
    }

    public function confirmPaymentOffline(Request $request, $id)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:cash,qris,transfer',
            'amount_paid' => 'required|in:50000,100000,150000,200000',
            'quantity_product' => 'required|integer',
        ]);

        $screening = Offline::findOrFail($id);

        if ($screening->payment_status) {
            return response()->json(['error' => 'Pembayaran sudah dikonfirmasi sebelumnya.'], 400);
        }

        $screening->payment_status = true;
        $screening->amount_paid = $validated['amount_paid'];
        $screening->payment_method = $validated['payment_method'];
        $screening->save();

        return;
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
