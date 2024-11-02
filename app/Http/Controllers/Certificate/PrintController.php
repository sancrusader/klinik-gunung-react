<?php

namespace App\Http\Controllers\Certificate;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class PrintController extends Controller
{
    public function printCertificate()
    {
        // Data yang akan diisi dalam sertifikat
        $data = [
            'name' => 'John Doe',
            'event' => 'Hiking Adventure',
            'date' => now()->toDateString(),
        ];

        // Generate PDF Sertifikat
        $pdf = PDF::loadView('certificates.template', $data);
        $filePath = storage_path('app/certificates/certificate.pdf');

        // Simpan PDF ke file
        $pdf->save($filePath);

        // Gunakan perintah lpr untuk mencetak file PDF
        // Untuk printer default, tidak perlu menggunakan -P
        exec("lpr -P EPSON_L850_Series_2 $filePath");

        // Atau untuk printer spesifik, gunakan perintah berikut:
        // ganti 'Printer_Name' dengan nama printer Anda
        // exec("lpr -P Printer_Name $filePath");

        // Hapus file PDF setelah dicetak (opsional)
        unlink($filePath);

        // Response balik ke user (optional, bisa disesuaikan)
        return response()->json(['message' => 'Sertifikat dicetak'], 200);
    }
}
