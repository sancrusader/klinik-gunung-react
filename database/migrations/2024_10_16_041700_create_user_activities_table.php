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
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key untuk user
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('activity_type'); // Misalnya: login, logout, dll.
            $table->timestamp('activity_time'); // Waktu aktivitas
            $table->string('ip_address', 45)->nullable(); // IP address pengguna
            $table->text('user_agent')->nullable(); // Informasi user agent (browser)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_activities');
    }
};
