<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Harian Paramedis</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Laporan Harian Paramedis</h1>
        <p class="text-center">Tanggal: {{ $date }}</p>

        <!-- Summary Section -->
        <h3 class="mt-4">Ringkasan Pemeriksaan Kesehatan</h3>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Hasil Pemeriksaan</th>
                    <th>Jumlah</th>

                </tr>
            </thead>
            <tbody>
                @foreach ($summary as $result => $count)
                    <tr>
                        <td>{{ ucfirst($result) }}</td>
                        <td>{{ $count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <h3 class="mt-4">Detail Laporan</h3>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Nomor Antrian</th>
                    <th>Nama Pasien</th>
                    <th>Nama Paramedis</th>
                    <th>Hasil Pemeriksaan</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($reports as $report)
                    <tr>
                        <td>{{ $report->queue_number }}</td>
                        <td>{{ $report->user->name }}</td> <!-- Nama Pasien -->
                        <td>{{ $report->paramedis ? $report->paramedis->name : 'N/A' }}</td> <!-- Nama Paramedis -->
                        <td>{{ ucfirst($report->health_check_result) }}</td>
                        <td>{{ $report->created_at->format('Y-m-d') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">Tidak ada laporan untuk tanggal ini.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>
</html>
