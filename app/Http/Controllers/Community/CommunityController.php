<?php

namespace App\Http\Controllers\Community;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Community\Community;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Community\CommunityRequest;

class CommunityController extends Controller
{
    public function index()
    {
        return Inertia::render('Community/Dashboard', [
            'communityPosts' => $communityPosts = Community::with('user')->latest()->get(),
        ]);
    }

    public function reply(){
        return inertia('Community/Reply');
    }

    public function post()
    {
        return Inertia::render('Community/Post', [
            'userId' => $userId = Auth::id(),
    ]);
    }

    public function store(CommunityRequest $request)
    {
        // Validasi input
        $community = Community::create([
        'content' => $request->content,
        'image_path' => $request->hasFile('image_path')
            ? $request->file('image_path')->store('images', 'public')
            : null,
        'user_id' => Auth::id(),
    ]);

    return redirect()->route('community');

    }

    public function Approv(){
        $community = Community::all();
        return Inertia::render('Admin/Community/Index',[
            'communityPosts' => $communityPosts = Community::with('user')->latest()->get(),
    ]);

    }
}
