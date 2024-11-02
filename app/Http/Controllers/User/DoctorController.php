<?php

namespace App\Http\Controllers\User;

use App\Helpers\ScreeningOfflineHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\ScreeningResource;
use App\Models\Appointment\Appointment;
use App\Models\Screening\Offline;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    // Halaman utama dokter
    public function index()
    {
        return Inertia::render('Doctor/Dashboard');
    }

    // Menampilkan Daftar Appointment
    public function Appointment()
    {
        $doctorId = Auth::id();
        $appointments = Appointment::with('user')
            ->where('doctor_id', $doctorId)
            ->get();

        return Inertia::render('Doctor/Appointment/Appointment', [
            'appointments' => $appointments,
        ]);
    }

    public function profile(Request $request): Response
    {
        return Inertia::render('Profile/Doctor', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // Menampilkan Offline Screening Pada Dokter
    public function OfflineScreening(Request $request)
    {
        $validatedData = $request->validate([
            'perpage' => 'sometimes|nullable|integer|min:1|max:100',
        ]);

        $perpage = $validatedData['perpage'] ?? 10;

        // Menampilkan screening dengan penyakit jantung
        $screenings = Offline::where('physical_health_q1', '=', 'penyakit jantung')
            ->paginate($perpage);

        return Inertia::render('Doctor/Screening/Offline', [
            'screenings' => ScreeningResource::collection($screenings),
            'pagination_links' => $screenings->links()->render(),
        ]);
    }

    // Menampilkan detail questioner yang pasien buat
    public function QuestionerDetail($id)
    {
        $screening = Offline::with('user')->findOrFail($id);

        $questions = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Doctor/Questioner/Index', [
            'screening' => $screening,
            'questions' => $questions,
        ]);
    }

    public function updateHealthCheck(Request $request, $id)
    {
        $request->validate([
            'health_check_result' => 'required|in:sehat,butuh_pendamping,butuh_dokter',
        ]);
        $screening = Offline::findOrFail($id);
        $screening->health_check_result = $request->health_check_result;
        $screening->save();

        return redirect()->route('doctor.OfflineScreening')->with('success', 'Hasil cek kesehatan berhasil diperbarui.');
    }

    public function PhysicalExamination($id)
    {
        // Ambil data dari database berdasarkan id
        $screening = Offline::findOrFail($id);

        // Kirim data ke halaman Inertia
        return Inertia::render('Doctor/PhysicalExamination/Index', [
            'screening' => $screening,
        ]);
    }
}
