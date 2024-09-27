<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment\Appointment;

class DoctorController extends Controller
{
    public function index(){
        return Inertia::render('Doctor/Dashboard');
    }

    public function Appointment(){
    $doctorId = Auth::id(); // Mendapatkan ID dokter yang sedang login
    // Ambil appointment yang terkait dengan dokter yang sedang login
    $appointments = Appointment::with('user')
        ->where('doctor_id', $doctorId)
        ->get();

    return Inertia::render('Doctor/Appointment/Appointment', [
        'appointments' => $appointments
    ]);
    }
    
}
