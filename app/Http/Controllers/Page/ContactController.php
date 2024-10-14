<?php

namespace App\Http\Controllers\Page;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    public function Index(){
        return Inertia::render('Contact');
    }
}
