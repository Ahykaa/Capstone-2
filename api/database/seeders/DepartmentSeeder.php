<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->upsert([
            ['id' => 1, 'label' => 'Accounting'],
            ['id' => 2, 'label' => 'GSD'],
            ['id' => 3, 'label' => 'HRMD'],
            ['id' => 4, 'label' => 'MIS'],
            ['id' => 5, 'label' => 'Chaplaincy'],
            ['id' => 6, 'label' => 'BOT'],
            ['id' => 7, 'label' => 'President'],
            ['id' => 8, 'label' => 'Alumni'],
            ['id' => 9, 'label' => 'ComExt'],
            ['id' => 10, 'label' => 'Marketing'],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
