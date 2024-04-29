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
        Schema::create('users', function (Blueprint $table) {
            $staff = 'staff';
            $admin = 'admin';
            $subadmin = 'subadmin';
            $subadmin1 = 'subadmin1';
            $subadmin2 = 'subadmin2';
            $subadmin3 = 'subadmin3';
            $subadmin4 = 'subadmin4';
            $superadmin = 'superadmin';
            $headadmin = 'headadmin';
            $roleEnum = [$staff, $admin,  $subadmin, $subadmin1, $subadmin2, $subadmin3, $subadmin4, $superadmin, $headadmin];

            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->foreignId('department_id')
                ->constrained()
                ->onUpdate('cascade');
            $table->string('position')->nullable();
            $table->enum('role', $roleEnum)->default($staff);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};