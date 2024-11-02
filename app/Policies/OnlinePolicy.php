<?php

namespace App\Policies;

use App\Models\Screening\Online;
use App\Models\User;

class OnlinePolicy
{
    public function online(User $user, Online $online)
    {
        return $user->id === $online->user_id || $user->role === 'paramedis' || $user->role === 'doctor';
    }
}
