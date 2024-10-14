<?php

namespace App\Http\Controllers\Blog;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Blog\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Blogs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
        }

        Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $path,
        ]);

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
    }
}
