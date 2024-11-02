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
        Schema::create('health_check_online', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->integer('oxygen_saturation')->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->decimal('body_temperature', 5, 2)->nullable();
            $table->string('physical_assessment')->nullable();
            $table->string('is_recommended_for_hiking')->nullable();
            $table->text('medical_recommendations')->nullable();
            $table->unsignedBigInteger('paramedic_id')->nullable();
            $table->foreign('paramedic_id')->references('id')->on('users')->onDelete('set null');
            $table->string('health_check_result')->nullable();
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_check_online');
    }
};
