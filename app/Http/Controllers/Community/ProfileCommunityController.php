<?php

namespace App\Http\Controllers\Community;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Veelasky\LaravelHashId\Eloquent\HashableId;

class ProfileCommunityController extends Controller
{
    public function Index($hash){
        $id = HashableId::decode($hash)[0] ?? null;

        $user = User::findOrFail($id);
        return Inertia::render('Community/Profile/Index', [
            "user" => $user,
        ]);
    }
}
