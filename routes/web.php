<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\user\AdminController;
use App\Http\Controllers\User\CordiController;
use App\Http\Controllers\User\DoctorController;
use App\Http\Controllers\User\CashierController;
use App\Http\Controllers\User\ManagerController;
use App\Http\Controllers\User\PatientController;
use App\Http\Controllers\User\ParamedisController;
use App\Http\Controllers\Ecommerce\OrderController;
use App\Http\Controllers\Screening\GuestController;
use App\Http\Controllers\Clinic\EcommerceController;
use App\Http\Controllers\Clinic\EmergencyController;
use App\Http\Controllers\Screening\OnlineController;
use App\Http\Controllers\Ecommerce\ProductController;
use App\Http\Controllers\Screening\OfflineController;
use App\Http\Controllers\Clinic\AppointmentController;
use App\Http\Controllers\Ecommerce\CategoryController;
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

// Screening offline Guest


// Role Manager
Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::get('/dashboard/manager', [ManagerController::class, 'index'])->name('manager.dashboard');

    Route::get('/dashboard/manager/report', [ManagerController::class, 'reportManager'])->name('report.manager');

    Route::get('dashboard/manager/report/pdf', [ManagerController::class, 'generatePDF'])->name('manager.report.pdf');
});



// Role Paramedis
Route::middleware(['auth', 'role:paramedis'])->group(function () {

    Route::get('/dashboard/paramedis', [ParamedisController::class, 'index'])->name('paramedis.dashboard');

    // Screening offline
    Route::get('/dashboard/paramedis/screening/offline', [OfflineController::class, 'showScreeningOfflline'])->name('paramedis.screening.offline');

    Route::get('/dashboard/paramedis/screening/offline/{id}', [ParamedisController::class, 'Questioner'])->name('paramedis.questioner');


    Route::post('/dashboard/paramedis/screening/offline/{id}', [ParamedisController::class, 'QuestionerStore'])->name('paramedis.questioner.store');

    Route::get('/dashboard/paramedis/screening/{id}/detail', [ParamedisController::class, 'QuestionerDetail'])->name('paramedis.questioner.detail');

    Route::post('/dashboard/paramedis/health/{id}', [ParamedisController::class, 'updateHealthCheck'])->name('paramedis.healthcheck');

    // Screening Online
    Route::get('/dashboard/paramedis/screening/online', [ParamedisController::class, 'ScreeningOnline'])->name('paramedis.screeningOnline');

    Route::post('dashboard/paramedis/confirm/{id}', [ParamedisController::class, 'processHealthCheck'])->name('paramedis.confirm');

});

// Role Casier
// Role Paramedis
Route::middleware(['auth', 'role:cashier'])->group(function () {
    Route::get('/dashboard/cashier', [CashierController::class, 'index'])->name('cashier.dashboard');
    Route::get('/dashboard/cashier/screening/offline', [CashierController::class, 'ScreeningOffline'])->name('cashier.screening.offline');

    Route::post('dashboard/cashier/confirm/{id}', [CashierController::class, 'confirmPaymentOffline'])->name('cashier.payment.offline');

    Route::get('dashboard/cashier/payment-history', [CashierController::class, 'history'])->name('cashier.history');

    Route::get('dashboard/cashier/screening/online', [OnlineController::class, 'ScreeningOnlinePayment'])->name('cashier.screening.online');


    Route::post('dashboard/cashier/confirm-payment/{id}', [OnlineController::class, 'confirmPayment'])->name('kasir.confirmPayment');

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

    Route::get('dashboard/screenings/payment/{id}', [OnlineController::class, 'payment'])->name('screenings.payment');

    Route::get('emergency', [EmergencyController::class, 'create'])->name('emergency');

    Route::get('emergency/history', [EmergencyController::class, 'show'])->name('emergency_show');

    Route::post('emergency/create', [EmergencyController::class, 'store'])->name('emergency_store');
});


Route::middleware('auth')->group(function () {
    Route::get('community', [CommunityController::class, 'index'])->name('community');
    Route::get('community/reply', [CommunityController::class, 'reply'])->name('community.reply');
    Route::get('community/post', [CommunityController::class, 'post'])->name('community.post');
    Route::post('/community', [CommunityController::class, 'store'])->name('community.store');
});

Route::middleware(['auth', 'role:admin'])->group
(function () {
    Route::get('/dashboard/admin', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('/dashboard/admin/scan', [AdminController::class, 'scan'])->name('admin.scan');

    Route::post('/dashboard/admin/scan/process', [AdminController::class, 'scanQr'])->name('admin.scan.process');

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

    Route::get('dashboard/doctor/medical-record/{id}', [AppointmentController::class, 'showMedicalRecordDetailDoctor'])->name('doctor.medical_record.detail');

    // Route Menampilkan Screening Offline
    Route::get('dashboard/doctor/screening', [DoctorController::class, 'OfflineScreening'])->name('doctor.OfflineScreening');
});

Route::middleware(['auth', 'role:cordi'])->group
(function () {
    Route::get('dashboard/cordi', [CordiController::class, 'index'])->name('cordi.dashboard');

    Route::get('dashboard/cordi/emergency', [CordiController::class, 'emergency'])->name('cordi.emergency');

    Route::get('dashboard/cordi/emergecy/{id}/{status}', [EmergencyController::class, 'updateStatus'])->name('emergency.status.store');

    Route::get('dashboard/cordi/history', [CordiController::class, 'emergencyHistory'])->name('emergency.history.cordi');

});


Route::middleware('auth')->group(function () {


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// ecommerce
Route::get('product', [ProductController::class, 'index'])->name('product');
// Membuat Product Baru
Route::get('product/new', [ProductController::class, 'create'])->name('product.create');
Route::post('/products/post', [ProductController::class, 'store'])->name('products.store');

// List Product For Admin or
Route::get('product/list', [EcommerceController::class, 'index'])->name('product.list');

// Blog
Route::get('blog', [BlogController::class, 'index'])->name('blogs.index');
Route::get('blog/new-post', [BlogController::class, 'create'])->name('blog.post');
Route::post('blog/post', [BlogController::class, 'store'])->name('blog.store');



// Offline Screening
Route::get('/screening-now', [GuestController::class, 'index'])->name('screening.guest');
Route::post('/guest/post', [GuestController::class, 'store'])->name('guest.post');



require __DIR__.'/auth.php';
