<?php

namespace App\Http\Controllers\UserReport;

use App\Http\Controllers\Controller;
use App\Models\Activity\UserActivity;
use App\Models\Screening\Offline;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParamedisReportController extends Controller
{
    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index()
    {
        $activities = UserActivity::where('user_id', Auth::id())->get();
        $screeningCount = Offline::where('paramedic_id', Auth::id())->count();

        $lastLogin = $activities->where('activity_type', 'login')->sortByDesc('created_at')->first();
        $lastLogout = $activities->where('activity_type', 'logout')->sortByDesc('created_at')->first();

        // Convert login and logout times to Jakarta time zone
        $lastLoginTime = $lastLogin ? Carbon::parse($lastLogin->created_at)->timezone('Asia/Jakarta')->format('Y-m-d H:i:s') : null;
        $lastLogoutTime = $lastLogout ? Carbon::parse($lastLogout->created_at)->timezone('Asia/Jakarta')->format('Y-m-d H:i:s') : null;

        $screenings = Offline::where('paramedic_id', Auth::id())->with('user')->get();

        return Inertia::render('Paramedis/Report/Personal/Index', [
            'activities' => $activities,
            'screeningCount' => $screeningCount,
            'lastLogin' => $lastLoginTime,
            'lastLogout' => $lastLogoutTime,
            'screenings' => $screenings,
        ]);
    }

    // Daily Report untuk Paramedis
    public function DailyReport(Request $request)
    {
        // Validasi input tanggal opsional
        $request->validate([
            'date' => 'nullable|date',
        ]);

        // Ambil tanggal yang dikirim dari request
        $date = $request->input('date');

        // Jika tidak ada input tanggal, gunakan hari ini
        if (! $date) {
            $date = now()->toDateString();
        }
        $reports = Offline::whereDate('created_at', $date)
            ->with(['paramedis', 'user'])
            ->get();
        $summary = $reports->groupBy('health_check_result')->map(function ($group) {
            return $group->count();
        });

        // Count patients with heart disease in 'physical_health_q1'
        $physicalHealth = $reports->where('physical_health_q1', 'penyakit jantung')->count();

        return Inertia::render('Paramedis/Report/Daily/Index', [
            'date' => $date,  // Pastikan tanggal dikirim kembali ke frontend
            'reports' => $reports,
            'summary' => $summary,
            'physical_health' => $physicalHealth,
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
}
