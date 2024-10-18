<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Offline;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function sendData()
    {
        $patients = Offline::all();
        return Inertia::render('Api/SentData', [
            'data' => $patients
        ]);
    }
}

