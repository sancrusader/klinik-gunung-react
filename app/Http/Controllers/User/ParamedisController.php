<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use App\Models\Screening\Online;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Screening\QuestionerRequest;

class ParamedisController extends Controller
{

    public function index()
        {
            return inertia('Paramedis/Dashboard', [
                'totalScreening' => Offline::count(),
                'totalScreeningOnline'=> Online::count(),
                'latestScreenings' => Offline::orderBy('created_at', 'desc')->take(5)
                ->get(),
            ]);
        }
    
        public function Questioner($id)
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


         return Inertia::render('Paramedis/Screening/Questioner', [
            'screening' => $screening,
            'questions' => $questions,
         ]);
    }

public function QuestionerStore(QuestionerRequest $request, $id)
{
    $screening = Offline::findOrFail($id);
    
    $updateData = [];

    foreach (range(1, 6) as $index) {
        $field = "physical_health_q{$index}";
        $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
    }

    foreach (range(1, 5) as $index) {
        $field = "experience_knowledge_q{$index}";
        $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
    }

    // Log untuk cek data yang akan diupdate

    $screening->update($updateData);

    return back()->with('success', 'Data berhasil disimpan');
}



    public function updateHealthCheck(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'health_check_result' => 'required|in:sehat,butuh_pendamping,butuh_dokter',
        ]);

        // Temukan data screening offline berdasarkan ID
        $screening = Offline::findOrFail($id);

        // Perbarui hasil cek kesehatan
        $screening->health_check_result = $request->health_check_result;
        $screening->save();


        // Redirect kembali ke halaman paramedis dengan pesan sukses
        return redirect()->route('paramedis.screening.offline')->with('success', 'Hasil cek kesehatan berhasil diperbarui.');
    }

}
