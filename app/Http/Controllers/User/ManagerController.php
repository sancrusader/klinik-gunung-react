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

        return;
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
        // Ambil parameter dari request
        $periode = $request->input('periode');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Jika periode adalah 'today', gunakan tanggal hari ini
        if ($periode === 'today') {
            $startDate = Carbon::now()->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        } elseif ($periode === 'weekly') {
            // Jika periode adalah 'weekly', gunakan tanggal yang dimasukkan oleh user
            // Pastikan untuk mengonversi string menjadi Carbon
            if ($startDate && $endDate) {
                $startDate = Carbon::parse($startDate)->startOfDay();
                $endDate = Carbon::parse($endDate)->endOfDay();
            } else {
                // Jika tidak ada input dari pengguna, default ke minggu ini
                $startDate = Carbon::now()->startOfWeek();
                $endDate = Carbon::now()->endOfWeek();
            }
        } elseif ($periode === 'monthly') {
            // Jika periode adalah 'monthly', gunakan tanggal yang dimasukkan oleh user
            // Pastikan untuk mengonversi string menjadi Carbon
            if ($startDate) {
                $startDate = Carbon::parse($startDate)->startOfMonth();
                $endDate = Carbon::parse($startDate)->endOfMonth(); // Ambil akhir bulan dari start_date
            } else {
                // Jika tidak ada input dari pengguna, default ke bulan ini
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfMonth();
            }
        } else {
            // Gunakan input pengguna jika periode tidak sesuai
            $startDate = Carbon::parse($startDate)->startOfDay();
            $endDate = Carbon::parse($endDate)->endOfDay();
        }

        // Query data berdasarkan periode atau rentang tanggal yang dipilih
        $screeningOnlineDetails = Online::whereBetween('created_at', [$startDate, $endDate])->get();
        $totalScreeningOnline = $screeningOnlineDetails->count();

        $screeningDetails = Offline::whereBetween('created_at', [$startDate, $endDate])->get();
        $totalScreeningOffline = $screeningDetails->count();
        $totalUangMasuk = $screeningDetails->sum('amount_paid');

        // Data yang akan dikirim ke view
        $data = [
            'periode' => $periode,
            'start_date' => $startDate,  // Ganti startDate menjadi start_date
            'end_date' => $endDate,      // Ganti endDate menjadi end_date
            'totalScreeningOnline' => $totalScreeningOnline,
            'screeningOnlineDetails' => $screeningOnlineDetails,
            'totalScreeningOffline' => $totalScreeningOffline,
            'totalUangMasuk' => $totalUangMasuk,
            'screeningDetails' => $screeningDetails,
            'tanggalLaporan' => Carbon::now()->format('d-m-Y'), // Tanggal laporan dibuat
        ];

        // Buat objek PDF menggunakan Dompdf
        $pdf = new Dompdf();
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $pdf->setOptions($options);

        // Render view ke dalam PDF
        $pdf = PDF::loadView('report.pdf', $data);

        // Stream atau unduh PDF
        return $pdf->stream('report.pdf');
    }


    public function reportManager()
    {
        return inertia('Manager/Report/Index');
    }


    public function Shift()
    {
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

    public function ScreeningOffline()
    {
        $screenings = Offline::with('paramedis')->get();
        return Inertia::render('Manager/Screening/Index', [
            'screenings' => $screenings,

        ]);
    }
}
