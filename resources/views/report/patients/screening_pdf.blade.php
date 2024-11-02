<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Screening Offline Report</title>
    <style>
        /* Gaya CSS untuk PDF */
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { margin: 20px; }
        .content h2 { margin-top: 0; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table th, .info-table td { border: 1px solid #ddd; padding: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Screening Offline Report</h1>
        <p>{{ $planned_hiking_date }}</p>
    </div>
    <div class="content">
        <h2>Informasi Pasien</h2>
        <table class="info-table">
            <tr>
                <th>Nama Lengkap</th>
                <td>{{ $full_name }}</td>
            </tr>
            <tr>
                <th>Umur</th>
                <td>{{ $age }}</td>
            </tr>
            <tr>
                <th>Jenis Kelamin</th>
                <td>{{ $gender }}</td>
            </tr>
            <tr>
                <th>Hasil Pemeriksaan</th>
                <td>{{ $health_check_result }}</td>
            </tr>
        </table>
    </div>
</body>
</html>
