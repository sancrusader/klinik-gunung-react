<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Community\Community;
use App\Models\Screening\Scan;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    // Page Profile Admin
    public function profile(Request $request): Response
    {
        return Inertia::render('Profile/Admin', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // Scan Qr Code Online Screening
    public function scan()
    {
        return view('scan');
    }

    public function scanQr(Request $request)
    {
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

    // Function Community Menyetujui Postingan
    public function Community()
    {

        $community = Community::all();

        return Inertia::render('Admin/Community/Index', [

        ]);
    }

    public function Users()
    {
        return Inertia::render('Admin/Users/Index');
    }

    public function addUsers()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:admin,cashier,paramedis,doctor,manager,cordi',
        ]);

        //
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->back()->with('success', 'User added successfully.');
    }
}
