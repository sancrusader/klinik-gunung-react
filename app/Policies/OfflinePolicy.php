<?php

namespace App\Policies;

use App\Models\Screening\Offline;
use App\Models\User;

class OfflinePolicy
{
    public function view(User $user, Offline $offline)
    {
        return $user->id === $offline->user_id || $user->role === 'paramedis' || $user->role === 'doctor';
    }
}
