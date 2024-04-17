<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->upsert([
            'name' => 'Kimberly Pavino ',
            'username' => 'Kimberly',
            'password' => Hash::make('!p@ssword123'),
            'role' => 'superadmin',
        ], ['username']);
    }
}
