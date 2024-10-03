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

}
