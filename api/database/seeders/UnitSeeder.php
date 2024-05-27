<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('units')->upsert([
            ['id' => 1, 'label' => 'pieces'],
            ['id' => 2, 'label' => 'dozen'],
            ['id' => 3, 'label' => 'pair'],
            ['id' => 4, 'label' => 'pack'],
            ['id' => 5, 'label' => 'bundle'],
            ['id' => 6, 'label' => 'carton'],
            ['id' => 7, 'label' => 'roll'],
            ['id' => 8, 'label' => 'meter'],
            ['id' => 9, 'label' => 'liter'],
            ['id' => 10, 'label' => 'gallon'],
            ['id' => 11, 'label' => 'rim'],
            ['id' => 12, 'label' => 'unit'],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
