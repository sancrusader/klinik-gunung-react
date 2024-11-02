<?php

namespace App\Http\Controllers\UserReport;

use Inertia\Inertia;
use App\Models\Screening\Payments;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PaymentsResource;

class CashierReportController extends Controller
{
    /**
     * Summary of index
     * @return \Inertia\Response
     * Personal report untuk cashier menampilkan jumlah payments yang dilakukannya
     * Menampilkan history yang diperiksanya
     */
    public function index()
    {
        $cashierId = Auth::id();
        $payments = Payments::with(['cashier', 'screening_offlines'])
        ->where('cashier_id', $cashierId)
        ->paginate(10);
        $paymentsCount = Payments::where('cashier_id', $cashierId)->count();
        return Inertia::render('Cashier/Report/Personal/Index', [
            'payments' => $payments->items(),
            'paymentsCount' => $paymentsCount,
            'pagination_links' => $payments->links()->render(),
        ]);
    }

    // Daily report
    public function dailyReport()
    {
        // Retrieve all payments with related cashier and screening_offlines
        $payments = Payments::with(['cashier', 'screening_offlines'])
            ->get();

        // Get the total count of payments
        $paymentsCount = Payments::count();

        return Inertia::render('Cashier/Report/Daily/Index', [
            'payments' => $payments,
            'paymentsCount' => $paymentsCount,
        ]);
    }

    /**
     * Summary of generateReport
     * @return void
     * Generate Report to pdf
     */
    public function generateReport(){

    }

}
