<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Controllers
use App\Http\Controllers\{
    TestController,
    ApiController,
    ProfileController,
    Blog\BlogController,
    User\AdminController,
    User\CordiController,
    User\DoctorController,
    Page\ContactController,
    User\CashierController,
    User\ManagerController,
    User\PatientController,
    User\ParamedisController,
    Ecommerce\OrderController,
    Screening\GuestController,
    Clinic\EcommerceController,
    Clinic\EmergencyController,
    Screening\OnlineController,
    Certificate\PrintController,
    Ecommerce\ProductController,
    Screening\OfflineController,
    Clinic\AppointmentController,
    Ecommerce\CategoryController,
    Community\CommunityController,
    Community\ProfileCommunityController,
    UserReport\ParamedisReportController
};


Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Community
    Route::prefix('community')->group(function () {
        Route::get('/', [CommunityController::class, 'index'])->name('community');
        Route::get('/reply', [CommunityController::class, 'reply'])->name('community.reply');
        Route::get('/post', [CommunityController::class, 'post'])->name('community.post');
        Route::post('/', [CommunityController::class, 'store'])->name('community.store');
        Route::get('/profile/{uuid}', [ProfileCommunityController::class, 'Index'])->name('community.profile');
    });

    Route::get('/cart', [ProductController::class, 'showCart'])->name('cart');
});


Route::middleware('auth')->group(function () {
    // Manager routes
    Route::middleware('role:manager')->prefix('dashboard/manager')->group(function () {
        Route::get('/', [ManagerController::class, 'index'])->name('manager.dashboard');
        Route::get('/report', [ManagerController::class, 'reportManager'])->name('report.manager');
        Route::get('/report/pdf', [ManagerController::class, 'generatePDF'])->name('manager.report.pdf');
        Route::get('/shiff', [ManagerController::class, 'Shift'])->name('manager.shiff');
        Route::post('/shiff-schedule', [ManagerController::class, 'storeSchedule'])->name('manager.staff.store');
        Route::get('/screening', [ManagerController::class, 'ScreeningOffline'])->name('screening.manager');
    });

    // Paramedis routes
    Route::middleware('role:paramedis')->prefix('dashboard/paramedis')->group(function () {
        Route::get('/', [ParamedisController::class, 'index'])->name('paramedis.dashboard');
        Route::get('/screening/offline', [OfflineController::class, 'showScreeningOfflline'])->name('paramedis.screening.offline');
        Route::get('/screening/{id}/detail', [ParamedisController::class, 'QuestionerDetail'])->name('paramedis.questioner.detail');
        Route::get('/screening/online', [ParamedisController::class, 'ScreeningOnline'])->name('paramedis.screeningOnline');
        Route::post('/confirm/{id}', [ParamedisController::class, 'processHealthCheck'])->name('paramedis.confirm');
        Route::get('/screening/physical/{id}', [ParamedisController::class, 'PhysicalExamination'])->name('physical.paramedis');
        Route::post('/screening/physical/{id}', [ParamedisController::class, 'store'])->name('physical.store');
        Route::get('/report', [ParamedisReportController::class, 'index'])->name('paramedis.report');
        Route::get('/generate/report', [ParamedisReportController::class, 'report'])->name('report');
        Route::get('/daily-report', [ParamedisController::class, 'DailyReport'])->name('daily.report');
        Route::post('/{id}', [ParamedisController::class, 'updateHealthCheck'])->name('offline.healthcheck');
    });
    // Cashier routes
    Route::middleware('role:cashier')->prefix('dashboard/cashier')->group(function () {
        Route::get('/', [CashierController::class, 'index'])->name('cashier.dashboard');
        Route::get('/screening/offline', [CashierController::class, 'ScreeningOffline'])->name('cashier.screening.offline');
        Route::post('/confirm/{id}', [CashierController::class, 'confirmPaymentOffline'])->name('cashier.payment.offline');
        Route::get('/payment-history', [CashierController::class, 'history'])->name('cashier.history');
        Route::get('/screening/online', [OnlineController::class, 'ScreeningOnlinePayment'])->name('cashier.screening.online');
        Route::get('/screening/payment/{id}', [CashierController::class, 'Payment'])->name('payment.cashier');
        Route::post('/confirm-payment/{id}', [OnlineController::class, 'confirmPayment'])->name('cashier.confirmPayment');
    });

    // Patient routes
    Route::middleware('role:patients')->prefix('dashboard')->group(function () {
        // Dashboard
        Route::get('/', [PatientController::class, 'index'])->name('dashboard');

        // Screening Offline
        Route::prefix('screening/offline')->group(function () {
            Route::get('/', [OfflineController::class, 'show'])->name('history.screening.offline');
            Route::get('create', [OfflineController::class, 'index'])->name('screening.offline');
            Route::post('/', [OfflineController::class, 'store'])->name('screening.offline.store');
            Route::get('{id}', [PatientController::class, 'DetailScreeningOffline'])->name('detail.screening');
        });

        // Appointments
        Route::prefix('appointment')->group(function () {
            Route::get('/', [AppointmentController::class, 'index'])->name('appointment');
            Route::post('/', [AppointmentController::class, 'store'])->name('appointment.create');
            Route::get('list', [AppointmentController::class, 'patientAppointments'])->name('patient.appointments.list');
            Route::get('medical-record/{appointment}', [AppointmentController::class, 'showMedicalRecordDetail'])
                ->name('patients.medical-record');
        });

        // Screening Online
        Route::prefix('screening/online')->group(function () {
            Route::get('/', [OnlineController::class, 'index'])->name('screening.online');
            Route::get('create', [OnlineController::class, 'create'])->name('screening.online.create');
            Route::post('create', [OnlineController::class, 'store'])->name('screening.online.store');
            Route::get('payment', [OnlineController::class, 'store'])->name('screening.payment');
            Route::get('payment/{id}', [OnlineController::class, 'payment'])->name('screenings.payment');
        });

        // Emergency
        Route::prefix('emergency')->group(function () {
            Route::get('/', [EmergencyController::class, 'create'])->name('emergency');
            Route::post('/', [EmergencyController::class, 'store'])->name('emergency_store');
            Route::get('history', [EmergencyController::class, 'show'])->name('emergency_show');
        });
    });

    // Admin routes
    Route::middleware('role:admin')->prefix('dashboard/admin')->group(function () {
        // Dashboard
        Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');

        // Scan
        Route::prefix('scan')->group(function () {
            Route::get('/', [AdminController::class, 'scan'])->name('admin.scan');
            Route::post('process', [AdminController::class, 'scanQr'])->name('admin.scan.process');
        });

        // Community
        Route::prefix('community')->group(function () {
            Route::get('list', [CommunityController::class, 'Approv'])->name('admin.community');
            Route::post('{id}/approve', [CommunityController::class, 'approve'])->name('community.approve');
        });

        // Product
        Route::prefix('product')->group(function () {
            Route::get('new', [ProductController::class, 'create'])->name('product.create');
            Route::post('store', [ProductController::class, 'store'])->name('products.store');
            Route::get('list', [EcommerceController::class, 'index'])->name('product.list');
            
            // Category
            Route::prefix('category')->group(function () {
                Route::get('/', [CategoryController::class, 'create'])->name('category.create');
                Route::post('store', [CategoryController::class, 'store'])->name('category.store');
            });
        });

        // Blog
        Route::prefix('blog')->group(function () {
            Route::get('new', [BlogController::class, 'create'])->name('blog.post');
            Route::post('store', [BlogController::class, 'store'])->name('blog.store');
        });

        // Users
        Route::prefix('users')->group(function () {
            Route::get('/', [AdminController::class, 'Users'])->name('users.admin');
            Route::get('new', [AdminController::class, 'addUsers'])->name('users.new');
            Route::post('store', [AdminController::class, 'storeUser'])->name('users.store');
        });
    });

    // Doctor routes
    Route::middleware('role:doctor')->prefix('dashboard/doctor')->group(function () {
        Route::get('/', [DoctorController::class, 'index'])->name('doctor.dashboard');
        Route::get('/appointment', [DoctorController::class, 'Appointment'])->name('doctor.appointment');

        // Appointments
        Route::prefix('appointments')->group(function () {
            Route::put('{id}/confirm', [AppointmentController::class, 'confirm'])->name('doctor.appointments.confirm');
            Route::put('{id}/complete', [AppointmentController::class, 'complete'])->name('doctor.appointments.complete');
            Route::post('{appointment}/medical-record', [AppointmentController::class, 'updateMedicalRecord'])->name('doctor.appointments.medical-record');
        });

        // Medical Records
        Route::prefix('medical-record')->group(function () {
            Route::get('{appointment}', [AppointmentController::class, 'showMedicalRecord'])->name('doctor.medical_record');
            Route::get('detail/{id}', [AppointmentController::class, 'showMedicalRecordDetailDoctor'])->name('doctor.medical_record.detail');
        });

        // Screening
        Route::prefix('screening')->group(function () {
            Route::get('/', [DoctorController::class, 'OfflineScreening'])->name('doctor.OfflineScreening');
            Route::get('{id}', [DoctorController::class, 'QuestionerDetail'])->name('doctor.screeningDetail');
            Route::post('health-check/{id}', [DoctorController::class, 'updateHealthCheck'])->name('health.check.doctor');
        });

        Route::get('physical/{id}', [DoctorController::class, 'PhysicalExamination'])->name('doctor.physical');
    });

    // Coordinator routes
    Route::middleware('role:cordi')->prefix('dashboard/cordi')->group(function () {
        Route::get('/', [CordiController::class, 'index'])->name('cordi.dashboard');

        // Route::get('/emergency', [CordiController::class, 'emergency'])->name('cordi.emergency');

        Route::get('/emergency/{id}/{status}', [EmergencyController::class, 'updateStatus'])->name('emergency.status.store');

        Route::get('/history', [CordiController::class, 'emergencyHistory'])->name('emergency.history.cordi');
    });
});




/**
 * 
 * This Route Public
 */
Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('product');
    Route::post('/cart/{id}', [ProductController::class, 'addToCart'])->name('cart');
    
});

// Blog
Route::get('blog', [BlogController::class, 'index'])->name('blogs.index');
// Contact
Route::get('contact', [ContactController::class, 'Index'])->name('contact');

// Offline Screening
Route::get('/screening-now', [GuestController::class, 'index'])->name('screening.guest');
Route::post('/guest/post', [GuestController::class, 'store'])->name('guest.post');


// Test Kirim data
Route::get('/send-data', [ApiController::class, 'sendData']);

Route::get('/print-certificate', [PrintController::class, 'printCertificate']);

Route::get('/message', [TestController::class, 'index']);
Route::post('/send', [TestController::class, 'sendMessage']);

require __DIR__ . '/auth.php';

