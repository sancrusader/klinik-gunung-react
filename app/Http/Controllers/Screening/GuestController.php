<?php

namespace App\Http\Controllers\Screening;

use App\Helpers\ScreeningOfflineHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Screening\GuestRequest;
use App\Services\OfflineGuestScreeningService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class GuestController extends Controller
{
    protected $screeningService;

    public function __construct(OfflineGuestScreeningService $screeningService)
    {
        $this->screeningService = $screeningService;
    }

    public function index()
    {
        return Inertia::render('Screening/Guest/Index', [
            'questions' => ScreeningOfflineHelper::getScreeningQuestions(),
        ]);
    }

    public function store(GuestRequest $request)
    {
        $screeningOffline = $this->screeningService->storeScreening($request);

        return back()->with('success', "Pendaftaran berhasil dan data kuisioner berhasil disimpan, nomor antrian: {$screeningOffline->queue_number}");
    }
}
