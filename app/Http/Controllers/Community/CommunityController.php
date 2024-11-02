<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Http\Requests\Community\CommunityRequest;
use App\Models\Community\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Community/Dashboard', [
            'userid' => $user->uuid,
            'communityPosts' => Community::with('user')
                ->where('status', 'approve')
                ->latest()
                ->get(),
        ]);
    }

    public function setUsername(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:communities,username|max:255',
        ]);

        $user = Auth::user();
        $community = Community::firstOrCreate(
            ['user_id' => $user->id],
            ['username' => $request->username]
        );

        if (! $community->wasRecentlyCreated && ! $community->username) {
            $community->username = $request->username;
            $community->save();
        }

        return back()->with([
            'message' => 'Username successfully set!',
        ]);
    }

    // Reply postingan pada komunitas
    public function reply()
    {
        return inertia('Community/Reply');
    }

    // Melakukan Posting di komunitas
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

    }

    // Menerima postingan komunitas
    public function approve($id)
    {
        $community = Community::findOrFail($id);
        $community->status = 'approve';
        $community->save();

        return redirect()->back()->with('success', 'Postingan telah diizinkan.');
    }

    public function destroy($id)
    {
        $community = Community::findOrFail($id);
        $community->delete();

        return redirect()->back()->with('success', 'Postingan telah dihapus.');
    }

    public function Approv()
    {
        $community = Community::paginate(10);

        return Inertia::render('Admin/Community/Index', [
            'communityPosts' => $communityPosts = Community::with('user')->latest()->get(),
        ]);

    }
}
