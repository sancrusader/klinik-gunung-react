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
        return Inertia::render('Screening/Offline');
    }

    private function generateQueueNumber()
    {
        return Offline::max('queue_number') + 1;
    }


    public function store(OfflineRequest $request){

        $userId = Auth::id();
        // Dapatkan nomor antrian terbaru
        $queueNumber = Offline::generateQueueNumber();

        // Simpan data screening ke dalam database
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

        // Trigger event untuk notifikasi
        // event(new NewScreeningCreated($screeningOffline));

        return back()->with('success', 'Pendaftaran berhasil, nomor antrian: ' . $queueNumber);
    }

    // Menampilkan Ke Paramedis
    public function showScreeningOfflline(){

        $screenings = Offline::all();
                return Inertia::render('Paramedis/Screening/Offline', [
            'screenings' => $screenings,
            
        ]);

        
    }

// Menampilkan di pasien
    public function show()
    {
        $userId = auth()->id();
        $screenings = Offline::where('user_id', $userId)->get();
         return Inertia::render('Patients/Screening/HistoryOffline', [
            'screenings' => $screenings,
         ]);
        
    }

}
