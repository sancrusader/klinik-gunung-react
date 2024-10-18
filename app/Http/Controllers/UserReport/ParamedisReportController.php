<?php

namespace App\Http\Controllers\UserReport;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Activity\UserActivity;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class ParamedisReportController extends Controller
{

    // Report untuk paramedis perorangan
    public function index()
    {
        $activities = UserActivity::where('user_id', Auth::id())->get();
        $screeningCount = Offline::where('paramedic_id', Auth::id())->count();

        $lastLogin = $activities->where('activity_type', 'login')->sortByDesc('created_at')->first();
        $lastLogout = $activities->where('activity_type', 'logout')->sortByDesc('created_at')->first();

        $screenings = Offline::where('paramedic_id', Auth::id())->with('user')->get();
        return Inertia::render("Paramedis/Report/Index", [
            'activities' => $activities,
            'screeningCount' => $screeningCount,
            'lastLogin' => $lastLogin ? $lastLogin->created_at : null,
            'lastLogout' => $lastLogout ? $lastLogout->created_at : null,
            'screenings' => $screenings,
        ]);
    }

    public function report()
    {
        $activities = UserActivity::where('user_id', Auth::id())->get();
        $screeningCount = Offline::where('paramedic_id', Auth::id())->count();
        $screenings = Offline::where('paramedic_id', Auth::id())->with('user')->get();
        $data = [
            'screeningCount' => $screeningCount,
            'screenings' => $screenings,
        ];
        $userName = str_replace(' ', '_', Auth::user()->name);
        $currentDate = Carbon::now()->format('Y-m-d');
        $fileName = "activity_report_{$userName}_{$currentDate}.pdf";
        $pdf = PDF::loadView('report.paramedis.activity_report', $data);
        return $pdf->download($fileName);
    }

    // Report untuk semua paramedis agar bisa melihat report harian
    public function DailyReport(Request $request)
    {
        // Validasi parameter yang diperlukan, jika ada
        $request->validate([
            'date' => 'nullable|date' // Misalnya, jika ingin filter berdasarkan tanggal
        ]);

        // Ambil tanggal yang ingin dilihat laporan harian
        $date = $request->input('date') ?? now()->toDateString(); // Gunakan hari ini jika tidak ada input

        // Ambil data laporan berdasarkan tanggal
        $reports = Offline::whereDate('created_at', $date)
            ->with('paramedic') // Misalkan ada relasi dengan model Paramedic
            ->get();

        // Jika Anda ingin menampilkan jumlah cek kesehatan berdasarkan hasil
        $summary = $reports->groupBy('health_check_result')->map(function ($group) {
            return $group->count();
        });

        // Kembalikan view dengan data laporan
        return view('reports.daily', [
            'date' => $date,
            'reports' => $reports,
            'summary' => $summary,
        ]);
    }
}
