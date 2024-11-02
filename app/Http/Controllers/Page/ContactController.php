<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function Index()
    {
        return Inertia::render('Contact');
    }
}
