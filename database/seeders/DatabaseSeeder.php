<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $userData = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => 'admin',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Paramedis User',
                'email' => 'paramedis@example.com',
                'role' => 'paramedis',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Cashier User',
                'email' => 'cashier@example.com',
                'role' => 'cashier',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Doctor User',
                'email' => 'doctor@example.com',
                'role' => 'doctor',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Manager User',
                'email' => 'manager@example.com',
                'role' => 'manager',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Coordinator User',
                'email' => 'cordi@example.com',
                'role' => 'cordi',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Patient User',
                'email' => 'patient@example.com',
                'role' => 'patients',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sandi',
                'email' => 'sandimaulanafz@gmail.com',
                'role' => 'patients',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($userData as $data) {
            // Membuat nomor acak 6 digit
            do {
                $uuid = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            } while (User::where('uuid', $uuid)->exists()); // Memastikan nomor unik

            User::create(array_merge($data, ['uuid' => $uuid])); // Menyimpan pengguna dengan uuid
        }
    }
}
