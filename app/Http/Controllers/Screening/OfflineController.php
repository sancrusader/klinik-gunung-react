<?php

namespace App\Http\Controllers\Screening;

use App\Http\Controllers\Controller;
use App\Http\Requests\Screening\OfflineRequest;
use App\Http\Resources\ScreeningResource;
use App\Models\Screening\Offline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Helpers\ScreeningOfflineHelper;

class OfflineController extends Controller
{
    // Index fomr Screening Offline
    public function index()
    {
        $userId = Auth::id();

        $hasScreening = Offline::where('user_id', $userId)->exists();

        if ($hasScreening) {
            return redirect()->route('history.screening.offline')->with('error', 'Anda sudah melakukan screening offline.');
        }
        $questions = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Screening/Offline', [
            'questions' => $questions,
        ]);
    }


    // Menampilkan History Screening Offline Pasien
    public function show()
    {
        $userId = Auth::user()->id;

        $screening = Offline::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('Patients/Screening/HistoryOffline', [
            'screening' => $screening,
        ]);
    }

    // Pasien melakukan screening
    public function store(OfflineRequest $request)
    {
        $userId = Auth::id();

        $queueNumber = $this->generateQueueNumber();

        $screeningOffline = Offline::create([
            'status' => 'pending',
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

        return back()->with('success', 'Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: '.$queueNumber);
    }
    // Membuat Nomor Antrian
    private function generateQueueNumber()
    {
        return Offline::max('queue_number') + 1;
    }
    public function showScreeningOffline(Request $request)
    {
        $validatedData = $request->validate([
            'perpage' => 'sometimes|nullable|integer|min:1|max:100',
        ]);

        $perpage = $validatedData['perpage'] ?? 10;

        // Menambahkan kondisi untuk tidak menampilkan pasien dengan penyakit jantung
        $screenings = Offline::whereNull('health_check_result')
            ->where('physical_health_q1', '!=', 'penyakit jantung')
            ->paginate($perpage);

        return Inertia::render('Paramedis/Screening/Offline', [
            'screenings' => ScreeningResource::collection($screenings),
            'pagination_links' => $screenings->links()->render(),
        ]);
    }


}
