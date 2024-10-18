<?php

namespace App\Listeners;

use Illuminate\Support\Carbon;
use App\Models\Activity\UserActivity;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class LogSuccessfulLogout
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        UserActivity::create([
            'user_id' => $event->user->id,
            'activity_type' => 'logout',
            'activity_time' => Carbon::now(), // Waktu saat login
            'ip_address' => request()->ip(), // Alamat IP pengguna
            'user_agent' => request()->header('User-Agent'), // Informasi browser
        ]);
    }
}
