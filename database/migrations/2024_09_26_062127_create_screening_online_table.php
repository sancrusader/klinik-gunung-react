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
            $table->id(); // id utama, auto-increment
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // foreign key ke tabel users
            $table->string('full_name'); // nama lengkap
            $table->date('date_of_birth'); // tanggal lahir
            $table->string('mountain'); // informasi tambahan
            $table->string('citizenship'); // kewarganegaraan
            $table->string('country'); // negara
            $table->string('address'); // alamat
            $table->string('phone'); // nomor telepon
            $table->string('email'); // alamat email
            $table->tinyInteger('question1')->default(0); // pertanyaan 1
            $table->tinyInteger('question2')->default(0); // pertanyaan 2
            $table->tinyInteger('question3')->default(0); // pertanyaan 3
            $table->text('additional_notes')->nullable(); // catatan tambahan
            $table->string('queue_number')->nullable(); // nomor antrean
            $table->text('qr_code')->nullable(); // QR code
            $table->tinyInteger('screening_passed')->default(0); // status lolos screening
            $table->timestamps(); // created_at dan updated_at
            $table->string('status')->default('pending'); // status screening
            $table->string('qr_code_url')->nullable(); // URL QR code
            $table->enum('payment_status', ['pending', 'paid'])->default('pending'); // status pembayaran
            $table->tinyInteger('certificate_issued')->default(0); // sertifikat diterbitkan
            $table->string('certificate_path')->nullable(); // path sertifikat
            $table->tinyInteger('payment_confirmed')->default(0); // pembayaran terkonfirmasi
            $table->tinyInteger('qr_code_sent')->default(0); // QR code dikirim
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
