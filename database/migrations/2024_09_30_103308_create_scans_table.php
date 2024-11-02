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
        Schema::create('scans', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->date('date_of_birth');
            $table->string('mountain');
            $table->string('citizenship');
            $table->string('country');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->integer('question1');
            $table->integer('question2');
            $table->integer('question3');
            $table->text('additional_notes')->nullable();
            $table->string('status');
            $table->integer('queue_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scans');
    }
};
