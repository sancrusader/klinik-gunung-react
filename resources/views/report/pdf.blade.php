<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan @if ($periode == 'weekly')
            Mingguan
        @else
            Bulanan
        @endif
    </title>
    <style>
        /* Tambahkan styling CSS untuk mempercantik tampilan PDF */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>

<body>
    <h1>Laporan @if ($periode == 'weekly')
            Mingguan
        @else
            Bulanan
        @endif
    </h1>
    <p>Total Screening Online: {{ $totalScreeningOnline }}</p>
    <p>Total Screening Offline: {{ $totalScreeningOffline }}</p>
    <p>Total Uang Masuk: Rp {{ number_format($totalUangMasuk, 0, ',', '.') }}</p>

    <h2>Detail Screening Offline</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama Pasien</th>
                <th>Tanggal Screening</th>
                <th>Status</th>
                <th>Jumlah Dibayar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($screeningDetails as $index => $screening)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $screening->full_name }}</td> <!-- Sesuaikan dengan field nama pasien -->
                    <td>{{ $screening->created_at->format('d-m-Y') }}</td> <!-- Sesuaikan dengan format tanggal -->
                    <td>{{ $screening->health_check_result }}</td> <!-- Sesuaikan dengan field hasil pemeriksaan -->
                    <td>Rp {{ number_format($screening->amount_paid, 0, ',', '.') }}</td>
                    <!-- Sesuaikan dengan field jumlah dibayar -->
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Detail Screening Online</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama Pasien</th>
                <th>Tanggal Screening</th>
                <th>Status</th>
                <th>Jumlah Dibayar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($screeningOnlineDetails as $index => $screeningOnline)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $screeningOnline->full_name }}</td> <!-- Sesuaikan dengan field nama pasien -->
                    <td>{{ $screeningOnline->created_at->format('d-m-Y') }}</td>
                    <!-- Sesuaikan dengan format tanggal -->
                    <td>{{ $screeningOnline->date_of_birth }}</td> <!-- Sesuaikan dengan field tanggal lahir -->
                    <td>Rp {{ number_format($screeningOnline->amount_paid, 0, ',', '.') }}</td>
                    <!-- Sesuaikan dengan field jumlah dibayar -->
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Pasien Melakukan Konsultasi</h2>
    <table>
        <tr>
            <td>Nama Dokter</td>
            <td></td>
            <td></td>
        </tr>
    </table>

</body>

</html>
