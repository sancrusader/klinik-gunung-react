<?php

namespace App\Http\Controllers;

use App\Models\Screening\Offline;
use Inertia\Inertia;

class ApiController extends Controller
{
    public function sendData()
    {
        $patients = Offline::all();

        return Inertia::render('Api/SentData', [
            'data' => $patients,
        ]);
    }
}
