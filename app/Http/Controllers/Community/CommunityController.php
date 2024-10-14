<?php

namespace App\Http\Controllers\Community;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Community\Community;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Veelasky\LaravelHashId\Eloquent\HashableId;
use App\Http\Requests\Community\CommunityRequest;

class CommunityController extends Controller
{
    public function index()
    {
        $userid = Auth::user()->uuid;
        return Inertia::render('Community/Dashboard', [
            'userid' => $userid,
            'communityPosts' => Community::with('user')
                ->where('status', 'approve')
                ->latest()
                ->get(),
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

        $community = Community::create([
        'content' => $request->content,
        'image_path' => $request->hasFile('image_path')
            ? $request->file('image_path')->store('images', 'public')
            : null,
        'user_id' => Auth::id(),
        'status' => 'pending',
    ]);

    return;

    }

    public function approve($id)
    {
       $community = Community::findOrFail($id);
       $community->status = 'approve';
       $community->save();

       return redirect()->back()->with('success', 'Postingan telah diizinkan.');
   }


    public function Approv(){
        $community = Community::all();
        return Inertia::render('Admin/Community/Index',[
            'communityPosts' => $communityPosts = Community::with('user')->latest()->get(),
    ]);


    }
}
