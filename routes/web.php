<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\user\AdminController;
use App\Http\Controllers\User\CordiController;
use App\Http\Controllers\User\DoctorController;
use App\Http\Controllers\Page\ContactController;
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
use App\Http\Controllers\Community\ProfileCommunityController;

//Home
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', function () {
//     if (Auth::check()) {
//         // Jika pengguna sudah login, tampilkan halaman dashboard
//         return Inertia::render('Dashboard');
//     }

//     // Jika pengguna belum login, tampilkan landing page
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Role Manager
Route::middleware(['auth', 'role:manager'])->group(function () {
    Route::get('/dashboard/manager', [ManagerController::class, 'index'])->name('manager.dashboard');
    Route::get('/dashboard/manager/report', [ManagerController::class, 'reportManager'])->name('report.manager');
    Route::get('dashboard/manager/report/pdf', [ManagerController::class, 'generatePDF'])->name('manager.report.pdf');
});

// Role Paramedis
Route::middleware(['auth', 'role:paramedis'])->group(function () {

    // dashboard paramedis
    Route::get('/dashboard/paramedis', [ParamedisController::class, 'index'])->name('paramedis.dashboard');
    // List Offline Screening
    Route::get('/dashboard/paramedis/screening/offline', [OfflineController::class, 'showScreeningOfflline'])->name('paramedis.screening.offline');
    // Detail Offline Screening
    Route::get('/dashboard/paramedis/screening/{id}/detail', [ParamedisController::class, 'QuestionerDetail'])->name('paramedis.questioner.detail');
    // List Online Screening Online
    Route::get('/dashboard/paramedis/screening/online', [ParamedisController::class, 'ScreeningOnline'])->name('paramedis.screeningOnline');
    Route::post('dashboard/paramedis/confirm/{id}', [ParamedisController::class, 'processHealthCheck'])->name('paramedis.confirm');

    Route::get('/dashboard/paramedis/screening/physical/{id}', [ParamedisController::class, 'PhysicalExamination'])->name('physical.paramedis');

    Route::post('api/paramedis/screening/pyshical/{id}', [ParamedisController::class, 'store'])->name('physical.store');

});

// Role Casier
Route::middleware(['auth', 'role:cashier'])->group(function () {
    // Dashboard Cashier
    Route::get('/dashboard/cashier', [CashierController::class, 'index'])->name('cashier.dashboard');
    // List Offline Screening
    Route::get('/dashboard/cashier/screening/offline', [CashierController::class, 'ScreeningOffline'])->name('cashier.screening.offline');
    // Confirm Payment
    Route::post('dashboard/cashier/confirm/{id}', [CashierController::class, 'confirmPaymentOffline'])->name('cashier.payment.offline');
    // History Payment
    Route::get('dashboard/cashier/payment-history', [CashierController::class, 'history'])->name('cashier.history');
    // List Online Screening
    Route::get('dashboard/cashier/screening/online', [OnlineController::class, 'ScreeningOnlinePayment'])->name('cashier.screening.online');
    // Menampilkan form payment
    Route::get('dashboard/cashier/screening/payment/{id}', [CashierController::class, 'Payment'])->name('payment.cashier');
    // Confirm Payment Online Screening
    Route::post('dashboard/cashier/confirm-payment/{id}', [OnlineController::class, 'confirmPayment'])->name('cashier.confirmPayment');
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
    Route::get('screening/offline/{id}', [PatientController::class, 'DetailScreeningOffline'])->name('detail.screening');
});


Route::middleware('auth')->group(function () {
    Route::get('community', [CommunityController::class, 'index'])->name('community');
    Route::get('community/reply', [CommunityController::class, 'reply'])->name('community.reply');
    Route::get('community/post', [CommunityController::class, 'post'])->name('community.post');
    Route::post('/community', [CommunityController::class, 'store'])->name('community.store');
    Route::get('/community/profile/{hash}', [ProfileCommunityController::class, 'Index'])->name('community.profile');

    Route::get('/cart', [ProductController::class, 'showCart'])->name('cart');
});

Route::middleware(['auth', 'role:admin'])->group
(function () {
    Route::get('/dashboard/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    // Scan
    Route::get('/dashboard/admin/scan', [AdminController::class, 'scan'])->name('admin.scan');
    Route::post('/dashboard/admin/scan/process', [AdminController::class, 'scanQr'])->name('admin.scan.process');
    // Community
    Route::get('/dashboard/admin/community/list', [CommunityController::class, 'Approv'])->name('admin.community');
    Route::post('/communities/{id}/approve', [CommunityController::class, 'approve'])->name('community.approve');
    // Product
    Route::get('product/new', [ProductController::class, 'create'])->name('product.create');
    Route::post('/products/post', [ProductController::class, 'store'])->name('products.store');
    Route::get('product/category', [CategoryController::class, 'create'])->name('category.create');
    Route::post('product/category/post', [CategoryController::class, 'store'])->name('category.store');
    Route::get('product/list', [EcommerceController::class, 'index'])->name('product.list');
    // Blog
    Route::get('blog/new-post', [BlogController::class, 'create'])->name('blog.post');
    Route::post('blog/post', [BlogController::class, 'store'])->name('blog.store');

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

    Route::get('dashboard/doctor/screening/{id}', [DoctorController::class, 'QuestionerDetail'])->name('doctor.screeningDetail');

    Route::post('api/screening/health-check/{id}', [DoctorController::class, 'updateHealthCheck'])->name('health.check.doctor');

    Route::get('dashboard/doctor/physical/{id}', [DoctorController::class, 'PhysicalExamination'])->name('doctor.physical');
});

Route::middleware(['auth', 'role:cordi'])->group
(function () {
    Route::get('dashboard/cordi', [CordiController::class, 'index'])->name('cordi.dashboard');

    Route::get('dashboard/cordi/emergency', [CordiController::class, 'emergency'])->name('cordi.emergency');

    Route::get('dashboard/cordi/emergecy/{id}/{status}', [EmergencyController::class, 'updateStatus'])->name('emergency.status.store');

    Route::get('dashboard/cordi/history', [CordiController::class, 'emergencyHistory'])->name('emergency.history.cordi');

});

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Product
Route::get('product', [ProductController::class, 'index'])->name('product');
Route::post('/product/cart/{id}', [ProductController::class, 'addToCart'])->name('cart');


// Blog
Route::get('blog', [BlogController::class, 'index'])->name('blogs.index');
// Contact
Route::get('contact', [ContactController::class, 'Index'])->name('contact');

// Offline Screening
Route::get('/screening-now', [GuestController::class, 'index'])->name('screening.guest');
Route::post('/guest/post', [GuestController::class, 'store'])->name('guest.post');



require __DIR__.'/auth.php';
