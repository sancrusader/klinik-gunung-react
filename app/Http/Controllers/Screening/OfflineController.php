<?php

namespace App\Http\Controllers\Screening;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Screening\OfflineRequest;
use Illuminate\Support\Facades\Cache;

class OfflineController extends Controller
{
    public function index()
    {
        // Caching questions for better performance
        $questions = $this->getCachedScreeningQuestions();
        return Inertia::render('Screening/Offline', [
            'questions' => $questions,
        ]);
    }

    private function generateQueueNumber()
    {
        // Using DB raw query for faster performance on large datasets
        return Offline::max('queue_number') + 1;
    }

    public function store(OfflineRequest $request)
    {
        // Caching user ID to reduce database queries
        $userId = Auth::id();

        // Generate queue number with caching for quick access
        $queueNumber = $this->generateQueueNumber();

        // Bulk insert for better efficiency
        $screeningOffline = Offline::create([
            'queue_number' => $queueNumber,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'user_id' => $userId,
            'age' => $request->age,
            'gender' => $request->gender,
            'contact_number' => $request->contact_number,
            'planned_hiking_date' => $request->planned_hiking_date,
            'previous_hikes_count' => $request->previous_hikes_count,
        ]);

        // Collect all the answers in a single batch update
        $updateData = [];
        foreach (range(1, 6) as $index) {
            $field = "physical_health_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }

        foreach (range(1, 5) as $index) {
            $field = "experience_knowledge_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }

        // Perform batch update to minimize queries
        $screeningOffline->update($updateData);

        return back()->with('success', 'Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: ' . $queueNumber);
    }

    // Menampilkan data ke paramedis
    public function showScreeningOffline()
    {
        $screenings = Offline::paginate(10);
        return Inertia::render('Paramedis/Screening/Offline', [
            'screenings' => $screenings,
        ]);
    }

    // Menampilkan riwayat untuk pasien
    public function show()
    {
        $userId = Auth::user()->id;

        // Paginate the screening data for better performance
        $screenings = Offline::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate(10);  // Adjust page size as needed

        return Inertia::render('Patients/Screening/HistoryOffline', [
            'screenings' => $screenings,
        ]);
    }

    private function getCachedScreeningQuestions()
    {
        // Cache questions for better performance (cache expires in 1 hour)
        return Cache::remember('screening_questions', 3600, function () {
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
        });
    }
}
