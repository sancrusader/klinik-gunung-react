<?php

namespace App\Services;

use App\Events\PatientScreeningUpdated;
use App\Mail\AccountCreated;
use App\Models\Screening\Offline;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class OfflineGuestScreeningService
{
    // Fungsi untuk menyimpan data pasien baru dan mengirim notifikasi
    public function storeScreening($request)
    {
        $user = $this->findOrCreateUser($request);
        $screeningOffline = $this->createScreeningRecord($user, $request);
        $this->updateScreeningQuestionnaireData($screeningOffline, $request);

        event(new PatientScreeningUpdated(
            patient: $screeningOffline,
        ));

        return $screeningOffline;
    }

    // Fungsi untuk menemukan atau membuat user baru
    private function findOrCreateUser($request)
    {
        $password = Str::random(10);

        $user = User::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->full_name,
                'password' => Hash::make($password),
            ]
        );

        if ($user->wasRecentlyCreated) {
            Mail::to($user->email)->queue(new AccountCreated($user, $password));
        }

        return $user;
    }

    // Fungsi untuk membuat catatan screening
    private function createScreeningRecord(User $user, $request)
    {
        return Offline::create([
            'status' => 'pending',
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

    // Fungsi untuk memperbarui data kuesioner screening
    private function updateScreeningQuestionnaireData(Offline $screeningOffline, $request)
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

    // Fungsi untuk mendapatkan jawaban dari pertanyaan kuesioner
    private function getQuestionnaireAnswer($request, string $field)
    {
        return $request->filled($field) ? implode(', ', $request->$field) : null;
    }
}
