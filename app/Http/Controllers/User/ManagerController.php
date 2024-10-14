<?php

namespace App\Http\Controllers\User;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StaffSchedule;
use Illuminate\Support\Carbon;
use App\Models\Screening\Online;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ManagerController extends Controller
{
     public function index()
    {

        $latestScreening = Offline::orderBy('created_at', 'desc')->take(5)->get();

        $patientsData = User::where('role', 'pasien') // Ambil berdasarkan peran pasien
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total_patients')
            ->where('created_at', '>=', Carbon::now()->subDays(1))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Siapkan data untuk chart
        $datesPasien = [];
        $totalsPasien = [];

        foreach ($patientsData as $data) {
            $datesPasien[] = Carbon::parse($data->date)->format('d F');
            $totalsPasien[] = $data->total_patients;
        }

        // Ambil total pendapatan minggu ini
        $paymentsData = Offline::selectRaw('DATE(created_at) as date, SUM(amount_paid) as total_payment')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->where('payment_status', true) // Hanya mengambil data yang sudah dibayar
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Siapkan data untuk chart
        $dates = [];
        $totals = [];

        foreach ($paymentsData as $data) {
            $dates[] = Carbon::parse($data->date)->format('d F');
            $totals[] = $data->total_payment;
        }

        $totalPaymentsThisWeek = Offline::where('payment_status', true)
            ->where('created_at', '>=', Carbon::now()->startOfWeek())
            ->sum('amount_paid');

        $totalPaymentsLastWeek = Offline::where('payment_status', true)
            ->whereBetween('created_at', [
                Carbon::now()->subWeek()->startOfWeek(),
                Carbon::now()->subWeek()->endOfWeek()
            ])->sum('amount_paid');

        if ($totalPaymentsLastWeek > 0) {
            $percentageChange = (($totalPaymentsThisWeek - $totalPaymentsLastWeek) / $totalPaymentsLastWeek) * 100;
        } else {
            $percentageChange = 100;
        }

        $totalPatients = User::where('role', 'patient')->count();

        return inertia('Manager/Dashboard');
    }

    public function generateReport(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:weekly,monthly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $reportContent = $this->generateReportContent($request->type, $request->start_date, $request->end_date);

        Report::create([
            'type' => $request->type,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'content' => $reportContent,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('dashboard.manajer.reports')->with('success', 'Laporan berhasil dibuat.');
    }

    private function generateReportContent($type, $startDate, $endDate)
    {
        return "Laporan $type dari $startDate sampai $endDate.";
    }

    public function viewReports()
    {
        $reports = Report::all();
        return view('dashboard.manajer.reports', compact('reports'));
    }

    public function getNewUsers()
    {
        $newUsers = User::where('role', 'pasien')
            ->where('created_at', '>=', Carbon::now()->subMonth())
            ->count();

        return response()->json([
            'new_users' => $newUsers,
            'percentage_change' => $this->getPercentageChange()
        ]);
    }

    private function getPercentageChange()
    {
        $currentMonth = User::where('role', 'pasien')
            ->where('created_at', '>=', Carbon::now()->startOfMonth())
            ->count();

        $lastMonth = User::where('role', 'pasien')
            ->where('created_at', '>=', Carbon::now()->subMonth()->startOfMonth())
            ->where('created_at', '<', Carbon::now()->startOfMonth())
            ->count();

        if ($lastMonth == 0) {
            return $currentMonth > 0 ? 100 : 0;
        }

        return (($currentMonth - $lastMonth) / $lastMonth) * 100;
    }

    // Activity
    public function ScreeningAcitivity()
    {
        // Mendapatkan semua transaksi yang sudah dibayar
        $screenings = Offline::all();

        // Menyertakan URL sertifikat dalam setiap screening
        foreach ($screenings as $screening) {
            $screening->certificate_url = Storage::url($screening->certificate_path);
        }
        return view('dashboard.manajer.screening.screening_activity', compact('screenings'));
    }

    public function generatePDF(Request $request)
    {
        // Ambil parameter periode (weekly atau monthly)
        $periode = $request->input('periode');

        // Inisialisasi variabel tanggal awal dan akhir
        $startDate = null;
        $endDate = null;

        if ($periode == 'weekly') {
            // Set tanggal awal dan akhir untuk laporan mingguan
            $startDate = Carbon::now()->startOfWeek();
            $endDate = Carbon::now()->endOfWeek();
        } elseif ($periode == 'monthly') {
            // Set tanggal awal dan akhir untuk laporan bulanan
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();
        }

        // Query data berdasarkan periode yang dipilih
        $screeningOnlineDetails = Online::whereBetween('created_at', [$startDate, $endDate])->get();
        $totalScreeningOnline = Online::whereBetween('created_at', [$startDate, $endDate])->count();

        $screeningDetails = Offline::whereBetween('created_at', [$startDate, $endDate])->get();
        $totalScreeningOffline = $screeningDetails->count();
        $totalUangMasuk = $screeningDetails->sum('amount_paid');

        // Data yang akan dikirim ke view
        $data = [
            'periode' => $periode,
            'totalScreeningOnline' => $totalScreeningOnline,
            'screeningOnlineDetails' => $screeningOnlineDetails,
            'totalScreeningOffline' => $totalScreeningOffline,
            'totalUangMasuk' => $totalUangMasuk,
            'screeningDetails' => $screeningDetails,
        ];

        // Buat objek PDF menggunakan Dompdf
        $pdf = new Dompdf();
        $options = new Options();
        $options->set('defaultFont', 'Arial'); // Atur font default
        $pdf->setOptions($options);

        // Render view ke dalam PDF
        $pdf = PDF::loadView('report.pdf', $data);

        // Stream atau unduh PDF
        return $pdf->stream('report.pdf');
    }

    public function reportManager(){
        return inertia('Manager/Report/Index');
    }


    public function Shift(){
        $staff = User::whereIn('role', ['paramedis', 'doctor', 'admin', 'cashier'])->get();
        return inertia('Manager/Shift/Index', [
            'staff' => $staff,
        ]);
    }

    public function storeSchedule(Request $request)
    {

        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'shift' => 'required|string',
            'schedule_date' => 'required|date',
            'role' => 'required|string',
        ]);

        StaffSchedule::create([
            'staff_id' => $request->staff_id,
            'shift' => $request->shift,
            'schedule_date' => $request->schedule_date,
            'role' => $request->role,
        ]);

        return;
    }
}
