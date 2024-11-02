<?php

namespace App\Http\Controllers\User;

use App\Helpers\ScreeningOfflineHelper;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Screening\Online;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PatientController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $user = Auth::id();
        $screening = Offline::where('user_id', $user)->first();
        $visitCount = Offline::where('created_at', '>=', now()->subMonths(3))->count();
        return Inertia::render('Dashboard', [
            'screening' => $screening,
            'visitCount' => $visitCount,
        ]);
    }

    public function profile(Request $request): Response
    {
        return Inertia::render('Profile/Patients', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function DetailScreeningOffline($id)
    {
        $screening = Offline::findOrFail($id);

        $this->authorize('view', $screening);
        $question = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Patients/Screening/Detail/Index', [
            'screening' => $screening,
            'question' => $question,
        ]);
    }
    public function DetailScreeningOnline($id)
    {
        $screening = Online::findOrFail($id);

        // Authorize the action using the view policy in OnlinePolicy
        $this->authorize('online', $screening);

        $question = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Patients/Screening/Detail/Online', [
            'screening' => $screening,
            'question' => $question,
        ]);
    }


    public function generateScreeningOfflinePDFReport($screeningId)
    {
        // Ambil data screening offline berdasarkan ID
        $screening = Offline::findOrFail($screeningId);

        // Otorisasi akses
        $this->authorize('view', $screening);

        // Data yang akan dikirim ke view PDF
        $data = [
            'full_name' => $screening->full_name,
            'age' => $screening->age,
            'gender' => $screening->gender,
            'health_check_result' => $screening->health_check_result,
            'planned_hiking_date' => $screening->planned_hiking_date,
        ];

        // Render view untuk PDF
        $pdf = Pdf::loadView('report.patients.screening_pdf', $data);

        // Format nama file PDF dengan nama pasien dan tanggal saat ini
        $fileName = sprintf('%s_%s.pdf',
                            str_replace(' ', '_', $screening->full_name),
                            now()->format('Ymd_His'));
        return $pdf->download($fileName);
    }

}
