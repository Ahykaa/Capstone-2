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
            ['id' => 2, 'label' => 'Approved for Checking'],
            ['id' => 3, 'label' => 'For Approval'],
            ['id' => 4, 'label' => 'Pending'],
            ['id' => 5, 'label' => 'Approved'],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
