<?php

namespace App\Http\Controllers\Clinic;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Appointment\Appointment;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Appointment\AppointmentRequest;

class AppointmentController extends Controller
{
    public function index(){
        $appointments = Appointment::with('user', 'doctor')->get();
        $doctors = User::where('role', 'doctor')->get();
        return Inertia::render('Appointments/Create', [
        'appointments' => $appointments,
        'doctors' => $doctors,
    ]);
    }

    public function patientAppointments()
    {
        // Mengambil user yang sedang login
        $user = auth()->user();

        // Mengambil daftar appointments milik user (pasien) yang sedang login
        $appointments = Appointment::with('user', 'doctor')
            ->where('user_id', $user->id) // Filter berdasarkan user yang sedang login
            ->get();

        // Kirim data appointments ke view
        return Inertia::render('Appointments/History', [
            'appointments' => $appointments,
        ]);
    }



    public function store(AppointmentRequest $request)
    {
        // Menyimpan data appointment
        $appointment = Appointment::create([
            'user_id' => $request->user_id,
            'doctor_id' => $request->doctor_id,
            'scheduled_at' => $request->is_scheduled ? $request->scheduled_at : null,
            'unscheduled_reason' => !$request->is_scheduled ? $request->unscheduled_reason : null,
            'status' => $request->status,
        ]);

        return redirect()->route('appointment')->with('success', 'Appointment created successfully.');
    }

    public function confirm($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'confirmed';
        $appointment->save();

        return redirect()->back()->with('success', 'Appointment confirmed.');
    }


    public function complete($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'completed';
        $appointment->completed_at = now();
        $appointment->save();

        return redirect()->back()->with('success', 'Appointment marked as completed.');
    }

    public function updateMedicalRecord(Request $request, Appointment $appointment)
{
    $request->validate([
        'medical_notes' => 'required|string',
        'prescription' => 'nullable|string',
        'examination_photo' => 'nullable|image',
    ]);

    // Jika ada gambar yang diupload, simpan di storage
    if ($request->hasFile('examination_photo')) {
        $path = $request->file('examination_photo')->store('examination_photos', 'public');
        $appointment->examination_photo = $path;
    }

    // Simpan data medical record
    $appointment->update([
        'medical_notes' => $request->medical_notes,
        'prescription' => $request->prescription,
    ]);

    return redirect()->route('doctor.appointment')->with('success', 'Medical record updated successfully.');
}

    public function showMedicalRecord($id)
    {
        $appointment = Appointment::findOrFail($id);

        return Inertia::render('Doctor/Appointment/MedicalRecord', [
            'appointment' => $appointment
        ]);
    }
    
    public function showMedicalRecordDetail($id)
    {
        // Mencari appointment dengan relasi user
        $appointment = Appointment::with('user')->findOrFail($id);

        // Memastikan bahwa pengguna yang saat ini terautentikasi adalah pemilik appointment
        if ($appointment->user_id !== auth()->user()->id) {
            // Jika bukan pemilik, berikan respons error
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Mengembalikan view dengan detail medical record
        return Inertia::render('Appointments/MedicalRecord', [
            'record' => [
                'id' => $appointment->id,
                'medical_notes' => $appointment->medical_notes,
                'prescription' => $appointment->prescription,
                'examination_photo' => $appointment->examination_photo 
                    ? Storage::url($appointment->examination_photo) 
                    : null,
                'patient_name' => $appointment->user->name,
            ],
        ]);
    }


}
