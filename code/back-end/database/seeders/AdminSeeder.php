<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Adam Smith',
            'email' => 'admin@gmail.com',
            'cin'=> 'AD12345',
            'password'=> Hash::make('test1234'),
            'phone_number' => '1234567890',
            'role_id' => 1
        ]);
    }
}
