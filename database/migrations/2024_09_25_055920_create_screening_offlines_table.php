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
            $table->string('full_name');
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
            $table->boolean('is_recommended_for_hiking')->nullable();
            $table->text('not_recommended_reason')->nullable();
            $table->text('medical_recommendations')->nullable();
            $table->string('health_check_result')->nullable();
            $table->boolean('payment_status')->default(false);
            $table->decimal('amount_paid', 10, 2)->nullable();
            $table->boolean('certificate_issued')->default(false);
            $table->string('certificate_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('screening_offlines');
    }
};
