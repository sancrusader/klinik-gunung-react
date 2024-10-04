<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment\Appointment;

class DoctorController extends Controller
{
    // Halaman utama dokter
    public function index(){
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
            'appointments' => $appointments
        ]);
    }

    // Menampilkan Offline Screening Pada Dokter
    public function OfflineScreening()
    {
        $screenings = Offline::all();
        return Inertia::render('Doctor/Screening/Offline', [
            'screenings' => $screenings,
        ]);
    }

    // Menampilkan detail questioner yang pasien buat
    public function QuestionerDetail($id)
        {
            $screening = Offline::with('user')->findOrFail($id);

            $questions = [
            'physical_health_q1' => 'Apakah Anda memiliki riwayat penyakit berikut ini?',
            'physical_health_q2' => 'Kapan terakhir kali Anda Melakukan Pemeriksaan kesehatan umum? ',
            'physical_health_q3' => 'Apakah Anda memiliki masalah dengan:',
            'physical_health_q4' => 'Apakah Anda sedang dalam pengobatan rutin atau menggunakan obat tertentu? jika ya, sebutkan:',
            'physical_health_q5' => 'Bagaimana Anda menilai kondisi fisik Anda saat ini untuk pendakian (misal: kekuatan otot, keseimbangan, stamina)?',
            'physical_health_q6' => 'Apakah Anda memiliki alergi (terhadap makanan, obat, atau lainnya)? Jika Ya, Sebutkan:',
            'experience_knowledge_q1' => 'Apakah Anda pernah mendaki Gunung Semeru sebelumnya?',
            'experience_knowledge_q2' => 'Apakah Anda pernah mengalami Altitude Sickness (mabuk ketinggian)?',
            'experience_knowledge_q3' => 'Apakah Anda mengetahui cara menangani situasi darurat seperti hipotermia, dehidrasi, atau cedera selama pendakian?',
            'experience_knowledge_q4' => 'Apakah Anda membawa atau tahu cara menggunakan perlengkapan berikut? (Centang semua yang sesuai)?',
            'experience_knowledge_q5' => 'Bagaimana persiapan Anda menghadapi perubahan cuaca di Gunung Semeru?',
            ];


            return Inertia::render('Doctor/Questioner/Index', [
                'screening' => $screening,
                'questions' => $questions,
            ]);
        }

    // melakukan approve sehat atau tidak
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
}
