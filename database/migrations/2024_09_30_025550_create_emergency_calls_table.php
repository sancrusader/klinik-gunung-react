<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('emergency_calls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patients_id');
            $table->unsignedBigInteger('cordi_id');
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->foreign('patients_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('cordi_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('emergency_calls');
    }
};
