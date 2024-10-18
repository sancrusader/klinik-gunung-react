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
        Schema::create('screening_offlines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('paramedic_id')->nullable();
            $table->foreign('paramedic_id')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('set null');
            $table->string('full_name');
            $table->string('email')->unique();
            $table->integer('queue_number')->unique();
            $table->integer('age')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('contact_number')->nullable();
            $table->date('planned_hiking_date')->nullable();
            $table->integer('previous_hikes_count')->nullable();
            $table->string('physical_health_q1')->nullable();
            $table->string('physical_health_q2')->nullable();
            $table->string('physical_health_q3')->nullable();
            $table->string('physical_health_q4')->nullable();
            $table->string('physical_health_q5')->nullable();
            $table->string('physical_health_q6')->nullable();
            $table->string('experience_knowledge_q1')->nullable();
            $table->string('experience_knowledge_q2')->nullable();
            $table->string('experience_knowledge_q3')->nullable();
            $table->string('experience_knowledge_q4')->nullable();
            $table->string('experience_knowledge_q5')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->integer('oxygen_saturation')->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->decimal('body_temperature', 5, 2)->nullable();
            $table->string('physical_assessment')->nullable();
            $table->string('is_recommended_for_hiking')->nullable();
            $table->text('medical_recommendations')->nullable();
            $table->string('health_check_result')->nullable();
            $table->boolean('payment_status')->default(false);
            $table->boolean('certificate_issued')->default(false);
            $table->string('certificate_path')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('screening_offlines');
    }
};
