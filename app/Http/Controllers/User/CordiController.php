<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Emergency\Emergency;
use Illuminate\Support\Facades\Auth;

class CordiController extends Controller
{
    public function index()
    {
        return inertia('Cordi/Dashboard');
    }

    public function emergency()
    {
        $emergencies = Emergency::with(['patient', 'cordi'])
            ->where('cordi_id', Auth::id())
            ->where('status', 'pending')
            ->get()
            ->map(function ($emergency) {
                return [
                    'id' => $emergency->id,
                    'patients_name' => $emergency->patient->name,
                    'cordi_name' => $emergency->cordi->name,
                    'status' => $emergency->status,
                    'created_at' => $emergency->created_at,
                ];
            });

        return Inertia('Cordi/Emergency/Index', compact('emergencies'));
    }

    public function emergencyHistory()
    {
        $emergencies = Emergency::with(['patient', 'cordi'])
            ->where('cordi_id', Auth::id())
            ->get()
            ->map(function ($emergency) {
                return [
                    'id' => $emergency->id,
                    'patients_name' => $emergency->patient->name,
                    'cordi_name' => $emergency->cordi->name,
                    'status' => $emergency->status,
                    'created_at' => $emergency->created_at,
                ];
            });

        return Inertia('Cordi/Emergency/History', compact('emergencies'));
    }
}
