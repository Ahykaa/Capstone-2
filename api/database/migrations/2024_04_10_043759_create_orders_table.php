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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('from');
            $table->foreignId('department_id')
                ->constrained()
                ->onUpdate('cascade');
            $table->foreignId('request_fors_id')
                ->constrained()
                ->onUpdate('cascade');
            $table->text('notes')->nullable();
            $table->foreignId('status_id')
                ->constrained()
                ->onUpdate('cascade');
            $table->dateTime('order_at')->default(now());
            $table->dateTime('date_needed');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
