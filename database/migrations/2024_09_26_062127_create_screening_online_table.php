<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreeningOnlineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screening_online', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->uuid('uuid')->unique()->nullable();
            $table->unsignedBigInteger('paramedic_id')->nullable();
            $table->foreign('paramedic_id')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('set null');
            $table->boolean('isOnline')->default(true);
            $table->string('full_name');
            $table->string('email')->unique();
            $table->integer('queue_number')->unique();
            $table->integer('age')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('contact_number')->nullable();
            $table->enum('status', ['completed', 'pending', 'cancelled'])->nullable();
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
            $table->boolean('payment_status')->default(false);
            $table->text('qr_code')->nullable(); // QR code
            $table->tinyInteger('screening_passed')->default(0);
            $table->timestamps();
            $table->string('qr_code_url')->nullable();
            $table->tinyInteger('certificate_issued')->default(0);
            $table->string('certificate_path')->nullable();
            $table->tinyInteger('payment_confirmed')->default(0);
            $table->tinyInteger('qr_code_sent')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screening_online');
    }
}
