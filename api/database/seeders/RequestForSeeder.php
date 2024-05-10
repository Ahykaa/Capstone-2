<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequestForSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    DB::table('request_fors')->upsert([
        ['id' => 1, 'label' => 'Check/Repair/Calibrate'],
        ['id' => 2, 'label' => 'Housekeeping/Landscaping/Laundry/Security'],
        ['id' => 3, 'label' => 'Materials/Supplies/Equipment'],
        ['id' => 4, 'label' => 'Riso/Photocopy/Bind/Print'],
        ['id' => 5, 'label' => 'Deliver/Transfer/Setup/Restore/Install/Etc'],
        ['id' => 6, 'label' => 'Others'],
    ],['label'], ['created_at', 'updated_at']);
    }
}
