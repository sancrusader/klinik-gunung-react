<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\ProviderController;
use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\Certificate\PrintController;
use App\Http\Controllers\Clinic\AppointmentController;
use App\Http\Controllers\Clinic\EcommerceController;
use App\Http\Controllers\Clinic\EmergencyController;
use App\Http\Controllers\Community\CommunityController;
use App\Http\Controllers\Community\ProfileCommunityController;
use App\Http\Controllers\Ecommerce\CategoryController;
use App\Http\Controllers\Ecommerce\ProductController;
use App\Http\Controllers\Page\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Screening\GuestController;
use App\Http\Controllers\Screening\OfflineController;
use App\Http\Controllers\Screening\OnlineController;
use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\User\CashierController;
use App\Http\Controllers\User\CordiController;
use App\Http\Controllers\User\DoctorController;
use App\Http\Controllers\User\ManagerController;
use App\Http\Controllers\User\ParamedisController;
use App\Http\Controllers\User\PatientController;
use App\Http\Controllers\UserReport\CashierReportController;
use App\Http\Controllers\UserReport\ParamedisReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

/**
 * This Route Public
 */
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
// Login with provider
Route::get('/auth/{provider}/redirect', [ProviderController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [ProviderController::class, 'callback']);
Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('product');
    Route::post('/cart/{id}', [ProductController::class, 'addToCart'])->name('cart');
    Route::get('/cart', [ProductController::class, 'showCart'])->name('cart');
});

/**
 * Route community
 */
Route::middleware('auth')->group(function () {
    Route::prefix('community')->group(function () {
        Route::get('/', [CommunityController::class, 'index'])->name('community');
        Route::post('/usernme', [CommunityController::class, 'setUsername'])->name('community.setUsername');
        Route::get('/reply', [CommunityController::class, 'reply'])->name('community.reply');
        Route::get('/post', [CommunityController::class, 'post'])->name('community.post');
        Route::post('/', [CommunityController::class, 'store'])->name('community.store');
        Route::get('/profile/{uuid}', [ProfileCommunityController::class, 'Index'])->name('community.profile');
    });
});

/**
 * Define routes accessible only to authenticated users.
 */
Route::middleware('auth')->group(function () {

    /**
     * Routes prefixed with 'dashboard/role' for users with role.
     */
    Route::middleware('role:manager')->prefix('dashboard/manager')->group(function () {
        // Routes dashboard
        Route::get('/', [ManagerController::class, 'index'])->name('manager.dashboard');
        // report
        Route::get('/report', [ManagerController::class, 'reportManager'])->name('report.manager');
        // generate reports to pdf
        Route::get('/report/pdf', [ManagerController::class, 'generatePDF'])->name('manager.report.pdf');
        // Shift for users
        Route::get('/shift', [ManagerController::class, 'Shift'])->name('manager.shiff');
        Route::post('/shift-schedule', [ManagerController::class, 'storeSchedule'])->name('manager.staff.store');
        Route::get('/screening', [ManagerController::class, 'ScreeningOffline'])->name('screening.manager');

        // Profile
        Route::get('/profile', [ManagerController::class, 'profile'])->name('manager.profile');
    });

    // Paramedis routes
    Route::middleware('role:paramedis')->prefix('dashboard/paramedis')->group(function () {
        Route::get('/', [ParamedisController::class, 'index'])->name('paramedis.dashboard');
        Route::get('/screening/offline', [OfflineController::class, 'showScreeningOffline'])->name('paramedis.screening.offline');
        Route::get('/screening/{id}/detail', [ParamedisController::class, 'QuestionerDetail'])->name('paramedis.questioner.detail');
        Route::get('/screening/history', [ParamedisController::class, 'HistoryOfflineScreening'])->name('history.paramedis.screening');

        // Profile
        Route::get('/profile', [ParamedisController::class, 'profile'])->name('paramedis.profile');

        // Online Screening
        Route::get('/screening/online', [ParamedisController::class, 'ScreeningOnline'])->name('paramedis.screeningOnline');
        Route::post('/confirm/{id}', [ParamedisController::class, 'processHealthCheck'])->name('paramedis.confirm');
        Route::get('/screening/physical/{id}', [ParamedisController::class, 'PhysicalExamination'])->name('physical.paramedis');
        Route::post('/screening/physical/{id}', [ParamedisController::class, 'store'])->name('physical.store');
        Route::get('/report', [ParamedisReportController::class, 'index'])->name('paramedis.report');
        Route::get('/generate/report', [ParamedisReportController::class, 'report'])->name('report');
        Route::get('/daily-report', [ParamedisReportController::class, 'DailyReport'])->name('daily.report');
        Route::post('/{id}', [ParamedisController::class, 'updateHealthCheck'])->name('offline.healthcheck');
    });

    Route::middleware('role:cashier')->prefix('dashboard/cashier')->group(function () {
        Route::get('/', [CashierController::class, 'index'])->name('cashier.dashboard');

        // Screening Offline
        Route::get('/screening/offline', [CashierController::class, 'ScreeningOffline'])->name('cashier.screening.offline');
        // confirm payment
        route::post('/payment/offline/{id}', [CashierController::class, 'confirmPaymentOffline'])->name('cashier.payment.offline');

        // Profile Cashier
        Route::get('/profile', [CashierController::class, 'profile'])->name('cashier.profile');

        // History payment
        Route::get('/payment-history', [CashierController::class, 'history'])->name('cashier.history');

        // Screening online
        Route::get('/screening/online', [OnlineController::class, 'ScreeningOnlinePayment'])->name('cashier.screening.online');
        // Screening Online Payements
        Route::get('/screening/payment/{id}', [CashierController::class, 'Payment'])->name('payment.cashier');
        // Post payment screening online
        Route::post('/payment/online/{id}', [OnlineController::class, 'confirmPayment'])->name('cashier.confirmPayment');
        // Report
        Route::get('/report', [CashierReportController::class, 'index'])->name('cashier.report');
        Route::get('/daily-report', [CashierReportController::class, 'dailyReport'])->name('cashier.dailyReport');
    });

    // Patient routes
    Route::middleware('role:patients')->prefix('dashboard')->group(function () {
        // Dashboard
        Route::get('/', [PatientController::class, 'index'])->name('dashboard');

        // Screening Offline

        // Appointments
        Route::prefix('appointment')->group(function () {
            Route::get('/', [AppointmentController::class, 'index'])->name('appointment');
            Route::post('/', [AppointmentController::class, 'store'])->name('appointment.create');
            Route::get('list', [AppointmentController::class, 'patientAppointments'])->name('patient.appointments.list');
            Route::get('medical-record/{appointment}', [AppointmentController::class, 'showMedicalRecordDetail'])
                ->name('patients.medical-record');
        });

        // Screening offline
        Route::prefix('screening/offline')->group(function () {
            Route::get('/', [OfflineController::class, 'show'])->name('history.screening.offline');
            Route::get('create', [OfflineController::class, 'index'])->name('screening.offline');
            Route::post('/', [OfflineController::class, 'store'])->name('screening.offline.store');
            Route::get('{id}', [PatientController::class, 'DetailScreeningOffline'])->name('detail.screening');
            // Generate Screening Offline Pdf
            Route::get('/screening/offline/pdf/{screeningId}', [PatientController::class, 'generateScreeningOfflinePDFReport'])->name('generate.screening.pdf');
        });

        // Screening Online
        Route::prefix('screening/online')->group(function () {
            Route::get('/', [OnlineController::class, 'show'])->name('screening.online');
            Route::get('/create', [OnlineController::class, 'index'])->name('screening.online.history');
            Route::post('create/store', [OnlineController::class, 'store'])->name('screening.online.store');
            Route::get('{id}', [PatientController::class, 'DetailScreeningOnline'])->name('detail.screening.online');

            // Route payments online
            Route::get('payment/{id}', [OnlineController::class, 'payment'])->name('screening.oline.payment');

            Route::post('payments/callback/{id}', [OnlineController::class, 'confirmPaymentOnline'])->name('payments.screening.online');
        });

        // Emergency
        Route::prefix('emergency')->group(function () {
            Route::get('/', [EmergencyController::class, 'create'])->name('emergency');
            Route::post('/', [EmergencyController::class, 'store'])->name('emergency_store');
            Route::get('history', [EmergencyController::class, 'show'])->name('emergency_show');
        });

        // Profile
        Route::get('/profile', [PatientController::class, 'profile'])->name('patient.profile');
    });

    // Admin routes
    Route::middleware('role:admin')->prefix('dashboard/admin')->group(function () {
        // Dashboard
        Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::delete('/community/{id}', [CommunityController::class, 'destroy'])->name('community.destroy');
        // Scan
        Route::prefix('scan')->group(function () {
            Route::get('/', [AdminController::class, 'scan'])->name('admin.scan');
            Route::post('process', [AdminController::class, 'scanQr'])->name('admin.scan.process');
        });
        // Admin Profile
        Route::get('/profile', [AdminController::class, 'profile'])->name('admin.profile');
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

        // profile
        Route::get('/profile', [DoctorController::class, 'profile'])->name('doctor.profile');
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

require __DIR__ . '/auth.php';
