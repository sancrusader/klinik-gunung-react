<?php

namespace App\Http\Controllers\Screening;

use App\Models\User;
use App\Models\Screening\Offline;
use App\Http\Controllers\Controller;
use App\Http\Requests\Screening\GuestRequest;
use App\Mail\AccountCreated;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function index()
    {
        return Inertia::render('Screening/Guest/Index', [
            'questions' => $this->getScreeningQuestions(),
        ]);
    }

    public function store(GuestRequest $request)
    {
        $user = $this->findOrCreateUser($request);
        $screeningOffline = $this->createScreeningRecord($user, $request);
        $this->updateScreeningQuestionnaireData($screeningOffline, $request);

        return back()->with('success', "Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: {$screeningOffline->queue_number}");
    }

    private function findOrCreateUser(GuestRequest $request)
    {
        // Generate random password
        $password = Str::random(10);

        // Create or find the user
        $user = User::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->full_name,
                'password' => Hash::make($password),
            ]
        );

        // Send account creation email asynchronously using queue
        if ($user->wasRecentlyCreated) {
            Mail::to($user->email)->queue(new AccountCreated($user, $password));
        }

        return $user;
    }

    private function createScreeningRecord(User $user, GuestRequest $request)
    {
        return Offline::create([
            'queue_number' => Offline::generateQueueNumber(),
            'full_name' => $request->full_name,
            'email' => $request->email,
            'user_id' => $user->id,
            'age' => $request->age,
            'gender' => $request->gender,
            'contact_number' => $request->contact_number,
            'planned_hiking_date' => $request->planned_hiking_date,
            'previous_hikes_count' => $request->previous_hikes_count,
        ]);
    }

    private function updateScreeningQuestionnaireData(Offline $screeningOffline, GuestRequest $request)
    {
        $updateData = [];
    
        foreach (range(1, 6) as $index) {
            $updateData["physical_health_q{$index}"] = $this->getQuestionnaireAnswer($request, "physical_health_q{$index}");
        }
    
        foreach (range(1, 5) as $index) {
            $updateData["experience_knowledge_q{$index}"] = $this->getQuestionnaireAnswer($request, "experience_knowledge_q{$index}");
        }
        $screeningOffline->update($updateData);
    }

    private function getQuestionnaireAnswer(GuestRequest $request, string $field)
    {
        return $request->filled($field) ? implode(', ', $request->$field) : null;
    }

    private function getScreeningQuestions()
    {
        // Use cache to store questions for 1 hour (60 * 60 seconds)
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
