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
            ['id' => 1, 'label' => 'Accounting', 'budget' => 0], 
            ['id' => 2, 'label' => 'GSD', 'budget' => 0],
            ['id' => 3, 'label' => 'HRMD', 'budget' => 0],
            ['id' => 4, 'label' => 'MIS', 'budget' => 0],
            ['id' => 5, 'label' => 'Chaplaincy', 'budget' => 0],
            ['id' => 6, 'label' => 'BOT', 'budget' => 0],
            ['id' => 7, 'label' => 'President', 'budget' => 0],
            ['id' => 8, 'label' => 'Alumni', 'budget' => 0],
            ['id' => 9, 'label' => 'ComExt', 'budget' => 0],
            ['id' => 10, 'label' => 'Marketing', 'budget' => 0],
        ], ['label'], ['created_at', 'updated_at']);
    }
}
