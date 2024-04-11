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
            $table->string('request_for')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('status_id')
            ->constrained()
            ->onUpdate('cascade');
            $table->integer('quantity');
            $table->foreignId('unit_id')
                ->constrained()
                ->onUpdate('cascade');
            $table->string('description')->nullable();
            $table->decimal('uniCost')->default(0);
            $table->decimal('amount');
            $table->text('remarks')->nullable();
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
