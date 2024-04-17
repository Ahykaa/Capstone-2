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
            'department' => 'Department of Finance',
            'position' => 'Director for Finance',
            'role' => 'superadmin',
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Vince Venida',
            'username' => 'vince',
            'password' => Hash::make('!p@ssword123'),
            'department' => 'BSIT',
            'position' => 'Department Head',
            'role' => 'admin', 
        ], ['username']);
        
        DB::table('users')->insert([
            'name' => 'Rose Puyat',
            'username' => 'rose',
            'password' => Hash::make('!p@ssword123'),
            'department' => 'ASBM',
            'position' => 'ASBM Secretary',
            'role' => 'staff', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Manolo Decripito',
            'username' => 'manolo',
            'password' => Hash::make('!p@ssword123'),
            'department' => 'GSD',
            'position' => 'GSD Unit Head',
            'role' => 'subadmin', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Maribeth Valenzuela',
            'username' => 'maribeth',
            'password' => Hash::make('!p@ssword123'),
            'position' => 'Purchaser',
            'role' => 'subadmin1', 
        ], ['username']);
    }
}
