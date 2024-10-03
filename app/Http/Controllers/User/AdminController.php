<?php

namespace App\Http\Controllers\user;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Scan;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Dashboard');
    }

    public function scan(){
        return view('scan');
    }

    public function scanQr(Request $request)
    {
        // Validasi input
        $request->validate([
            'qr_code_data' => 'required|string',
        ]);

        // Dekode data QR code
        $data = json_decode($request->qr_code_data, true);

        // Simpan data scan ke database dengan status "pending"
        Scan::create([
            'full_name' => $data['full_name'],
            'date_of_birth' => $data['date_of_birth'],
            'mountain' => $data['mountain'],
            'citizenship' => $data['citizenship'],
            'country' => $data['country'],
            'address' => $data['address'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'question1' => $data['question1'],
            'question2' => $data['question2'],
            'question3' => $data['question3'],
            'additional_notes' => $data['additional_notes'],
            'status' => 'pending',
            'queue_number' => $data['queue_number'],
        ]);

        // Arahkan ke dashboard paramedis
        return redirect()->route('admin.scan');
    }

}
