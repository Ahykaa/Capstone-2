<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('statuses')->upsert([
            ['id' => 1, 'label' => 'Created'],
            ['id' => 2, 'label' => 'Approved by Unit/Department Head '],
            ['id' => 3, 'label' => 'Approved by Purchaser'],
            ['id' => 4, 'label' => 'Approved by Property Custodian'],
            ['id' => 5, 'label' => 'Approved by GSD'],
            ['id' => 6, 'label' => 'Approved by Cash Management'],
            ['id' => 7, 'label' => 'Approved by Director for Admin'],
            ['id' => 8, 'label' => 'Approved by Director for Finance'],
            ['id' => 9, 'label' => 'Approved'],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
