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
            'department_id' => 1,
            'position' => 8,
            'role' => 'superadmin',
        ], ['username']);
        
        DB::table('users')->insert([
            'name' => 'Rose Puyat',
            'username' => 'rose',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 4,
            'position' => 1,
            'role' => 'staff', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Vince Venida',
            'username' => 'vince',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 8,
            'position' => 2,
            'role' => 'admin', 
        ], ['username']);
        
        DB::table('users')->insert([
            'name' => 'Maribeth Valenzuela',
            'username' => 'maribeth',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 10,
            'position' => 3,
            'role' => 'subadmin1', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Joseph Abajero',
            'username' => 'joseph',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 10,
            'position' => 4,
            'role' => 'subadmin2', 
        ], ['username']);
        
        DB::table('users')->insert([
            'name' => 'Manolo Decripito',
            'username' => 'manolo',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 2,
            'position' => 5,
            'role' => 'subadmin', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'George M. Capao, JR',
            'username' => 'george',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 2,
            'position' => 6,
            'role' => 'subadmin3', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Reneboy Libot',
            'username' => 'reneboy',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 2,
            'position' => 7,
            'role' => 'subadmin4', 
        ], ['username']);

        DB::table('users')->insert([
            'name' => 'Bishop Hamuel G. Tequis, MDiv',
            'username' => 'hamuel',
            'password' => Hash::make('!p@ssword123'),
            'department_id' => 2,
            'position' => 9,
            'role' => 'headadmin', 
        ], ['username']);
    }
}

