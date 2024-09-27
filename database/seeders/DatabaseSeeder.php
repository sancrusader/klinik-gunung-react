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
    public function run(): void
    {
               $userData = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => 'admin',
                'password' => Hash::make('sandifox')
            ],
            [
                'name' => 'Paramedis User',
                'email' => 'paramedis@example.com',
                'role' => 'paramedis',
                'password' => Hash::make('sandifox'), 
            ],
            [
                'name' => 'Cashier User',
                'email' => 'cashier@example.com',
                'role' => 'cashier',
                'password' => Hash::make('sandifox'), 
            ],
            [
                'name' => 'Doctor User',
                'email' => 'doctor@example.com',
                'role' => 'doctor',
                'password' => Hash::make('sandifox'), 
            ],
            [
                'name' => 'Manager User',
                'email' => 'manager@example.com',
                'role' => 'manager',
                'password' => Hash::make('sandifox'), 
            ],
            [
                'name' => 'Coordinator User',
                'email' => 'cordi@example.com',
                'role' => 'cordi',
                'password' => Hash::make('sandifox'), 
            ],
            [
                'name' => 'Patient User',
                'email' => 'patient@example.com',
                'role' => 'patients',
                'password' => Hash::make('sandifox'), 
            ],
        ];

        // Insert data into the users table
        foreach ($userData as $key =>  $user) {
            User::create($user);
        }

 
    }
}
