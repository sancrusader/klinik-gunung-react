<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class ProfileCommunityController extends Controller
{
    public function Index($uuid)
    {
        $user = User::where('uuid', $uuid)->firstOrFail();

        return Inertia::render('Community/Profile/Index', [
            'user' => $user,
            'userid' => $user->uuid,
        ]);
    }
}
