<?php

namespace App\Http\Controllers\Clinic;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Emergency\Emergency;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EmergencyController extends Controller
{

    public function create()
    {
        return Inertia::render('Patients/Emergency/Index', [
        'coordinators' => $coordinators = User::where('role', 'cordi')->get(),
    ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cordi_id' => 'required|exists:users,id',
        ]);

        Emergency::create([
            'patients_id' => Auth::id(),
            'cordi_id' => $request->cordi_id,
            'status' => 'pending',
        ]);

        return redirect()->route('emergency')->with('success', 'An emergency call has been sent to the coordinator.');
    }


    public function updateStatus($id, $status)
    {
        $call = Emergency::findOrFail($id);
        $call->status = $status;
        $call->save();

        return redirect()->route('cordi.emergency');
    }
    // Menampilkan panggilan darurat
    public function show()
    {
        $emergencies = Emergency::with(['patient', 'cordi'])
            ->where('patients_id', Auth::id()) // Mengambil emergency yang terkait dengan pasien yang sedang login
            ->get()
            ->map(function($emergency) {
                return [
                    'id' => $emergency->id,
                    'patients_name' => $emergency->patient->name,
                    'cordi_name' => $emergency->cordi->name,
                    'status' => $emergency->status,
                    'created_at' => $emergency->created_at,
                ];
            });

        return Inertia('Patients/Emergency/History', compact('emergencies'));
    }

}
