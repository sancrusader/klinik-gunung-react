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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('screening_id')->nullable();
            $table->foreign('screening_id')->references('id')->on('screening_offlines')->onDelete('cascade');
            $table->boolean('payment_status')->default(false);
            $table->decimal('amount_paid', 10, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->integer('quantity_product')->nullable();
            $table->decimal('price_product',10, 2)->nullable();
            $table->string('payment_proof')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
