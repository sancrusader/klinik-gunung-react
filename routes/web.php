<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\DoctorController;
use App\Http\Controllers\User\CashierController;
use App\Http\Controllers\User\PatientController;
use App\Http\Controllers\User\ParamedisController;
use App\Http\Controllers\Screening\OnlineController;
use App\Http\Controllers\Screening\OfflineController;
use App\Http\Controllers\Clinic\AppointmentController;
use App\Http\Controllers\Community\CommunityController;


// Home
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Role Paramedis
Route::middleware(['auth', 'role:paramedis'])->group(function () {
    Route::get('/dashboard/paramedis', [ParamedisController::class, 'index'])->name('paramedis.dashboard');


    // Screening offline
    Route::get('/dashboard/paramedis/screening/offline', [OfflineController::class, 'showScreeningOfflline'])->name('paramedis.screening.offline');

    Route::get('/dashboard/paramedis/screening/offline/{id}', [ParamedisController::class, 'Questioner'])->name('paramedis.questioner');

    Route::post('/dashboard/paramedis/screening/offline/{id}', [ParamedisController::class, 'QuestionerStore'])->name('paramedis.questioner.store');

    Route::post('/dashboard/paramedis/health/{id}', [ParamedisController::class, 'updateHealthCheck'])->name('paramedis.healthcheck');

    
});

// Role Casier
// Role Paramedis
Route::middleware(['auth', 'role:cashier'])->group(function () {
    Route::get('/dashboard/cashier', [CashierController::class, 'index'])->name('cashier.dashboard');
    Route::get('/dashboard/cashier/screening/offline', [CashierController::class, 'ScreeningOffline'])->name('cashier.screening.offline');

    Route::post('dashboard/cashier/confirm/{id}', [CashierController::class, 'confirmPaymentOffline'])->name('cashier.payment.offline');

    Route::get('dashboard/cashier/payment-history', [CashierController::class, 'history'])->name('cashier.history');

    Route::get('dashboard/cashier/screening/online', [OnlineController::class, 'ScreeningOnlinePayment'])->name('cashier.screening.online');



});

// Role Patients
Route::middleware(['auth', 'role:patients'])->group
(function () {

    // Dashboard Patients
    Route::get('/dashboard', [PatientController::class, 'index'])->name('dashboard');

    // Screening offline
    Route::post('dashboard/screening/offline', [OfflineController::class, 'store'])->name('screening.offline.store');

    // Create Screening offline
    Route::get('dashboard/screening/offline/create', [OfflineController::class, 'index'])->name('screening.offline');

    Route::get('dashboard/screening/offline', [OfflineController::class, 'show'])->name('history.screening.offline');

    // Appoitments
    Route::get('dashboard/appointment', [AppointmentController::class, 'index'])->name('appointment');

    Route::post('dashboard/appointment', [AppointmentController::class, 'store'])->name('appointment.create');

     Route::get('dashboard/appointment/list', [AppointmentController::class, 'patientAppointments'])->name('patient.appointments.list');

     Route::get('dashboard/appointments/medical-record/{appointment}', [AppointmentController::class, 'showMedicalRecordDetail'])
    ->name('patients.medical-record');

    // Screening Online
     Route::get('dashboard/screening/online', [OnlineController::class, 'index'])
    ->name('screening.online');
     Route::get('dashboard/screening/online/create', [OnlineController::class, 'create'])
    ->name('screening.online.create');

     Route::post('dashboard/screening/online/create', [OnlineController::class, 'store'])
    ->name('screening.online.store');
     Route::get('dashboard/screening/online/payment', [OnlineController::class, 'store'])
    ->name('screening.payment');


});


Route::middleware('auth')->group(function () {
    Route::get('community', [CommunityController::class, 'index'])->name('community');
    Route::get('community/reply', [CommunityController::class, 'reply'])->name('community.reply');
    Route::get('community/post', [CommunityController::class, 'post'])->name('community.post');
    Route::post('/community', [CommunityController::class, 'store'])->name('community.store');
});


Route::get('notification', [ProfileController::class, 'Notif'])->name('notif');

// Doctor
Route::middleware(['auth', 'role:doctor'])->group
(function () {

    // Dashboard Doctor
    Route::get('/dashboard/doctor', [DoctorController::class, 'index'])->name('doctor.dashboard');

    Route::get('/dashboard/doctor/appointment', [DoctorController::class, 'Appointment'])->name('doctor.appointment');

    Route::put('/doctor/appointments/{id}/confirm', [AppointmentController::class, 'confirm'])->name('dokter.appointments.confirm');

    Route::put('/doctor/appointments/{id}/complete', [AppointmentController::class, 'complete'])->name('dokter.appointments.complete');

    Route::post('dashboard/doctor/appointments/{appointment}/medical-record', [AppointmentController::class, 'updateMedicalRecord'])->name('doctor.appointments.medical-record');

    Route::get('/doctor/medical-record/{appointment}', [AppointmentController::class, 'showMedicalRecord'])->name('doctor.medical_record');

    Route::get('dashboard/doctor/medical-record/{id}', [AppointmentController::class, 'showMedicalRecordDetail'])->name('doctor.medical_record.detail');

});


Route::middleware('auth')->group(function () {


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
