<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('facilities');
            $table->dateTime('reserv_at')->default(now());
            $table->time('time_at');
            $table->string('company_name');
            $table->string('representative');
            $table->string('address');
            $table->string('activity');
            $table->integer('no_participants');
            $table->date('event_date');
            $table->time('event_time');
            $table->string('ownItems');
            $table->timestamps();
            $table->softDeletes();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
