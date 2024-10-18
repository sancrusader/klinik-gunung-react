<?php

namespace App\Listeners;


use Carbon\Carbon;
use Illuminate\Auth\Events\Login;
use App\Models\Activity\UserActivity;

class LogSuccessfulLogin
{
    public function handle(Login $event)
    {
        // Menyimpan aktivitas login
        UserActivity::create([
            'user_id' => $event->user->id,
            'activity_type' => 'login',
            'activity_time' => Carbon::now(), // Waktu saat login
            'ip_address' => request()->ip(), // Alamat IP pengguna
            'user_agent' => request()->header('User-Agent'), // Informasi browser
        ]);
    }
}
