<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('health_checks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scan_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->date('date_of_birth');
            $table->string('mountain');
            $table->string('citizenship');
            $table->string('country');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->boolean('question1');
            $table->boolean('question2');
            $table->boolean('question3');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_checks');
    }
};
