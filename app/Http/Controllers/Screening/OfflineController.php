<?php

namespace App\Http\Controllers\Screening;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Screening\OfflineRequest;

class OfflineController extends Controller
{
    public function index(){
        $questions = $this->getScreeningQuestions();
        return Inertia::render('Screening/Offline', [
            'questions' => $questions,
        ]);
    }

    private function generateQueueNumber()
    {
        return Offline::max('queue_number') + 1;
    }


    public function store(OfflineRequest $request){

            $userId = Auth::id();
            $queueNumber = Offline::generateQueueNumber();

            $screeningOffline = Offline::create([
                'queue_number' => $queueNumber,
                'full_name' => $request->full_name,
                'user_id' => $userId,
                'age' => $request->age,
                'gender' => $request->gender,
                'contact_number' => $request->contact_number,
                'planned_hiking_date' => $request->planned_hiking_date,
                'previous_hikes_count' => $request->previous_hikes_count,
            ]);

            $updateData = [];

            foreach (range(1, 6) as $index) {
                $field = "physical_health_q{$index}";
                $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
            }

            foreach (range(1, 5) as $index) {
                $field = "experience_knowledge_q{$index}";
                $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
            }

            $screeningOffline->update($updateData);

            return back()->with('success', 'Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: ' . $queueNumber);
    }



    // Menampilkan Ke Paramedis
    public function showScreeningOfflline(){

        $screenings = Offline::all();
                return Inertia::render('Paramedis/Screening/Offline', [
            'screenings' => $screenings,

        ]);

    }

    // Menampilkan di patient
    public function show()
    {
        $userId = auth()->id();

        // Mengurutkan berdasarkan kolom created_at dari yang terbaru
        $screenings = Offline::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Patients/Screening/HistoryOffline', [
            'screenings' => $screenings,
        ]);
    }

    private function getScreeningQuestions()
    {
        return [
            'physical_health_q1' => 'Apakah Anda memiliki riwayat penyakit berikut ini?',
            'physical_health_q2' => 'Kapan terakhir kali Anda Melakukan Pemeriksaan kesehatan umum?',
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
    }


}
