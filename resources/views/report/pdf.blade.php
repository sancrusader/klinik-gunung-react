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

    <p>Periode:
        {{ $periode === 'today' ? 'Hari Ini' : ($periode === 'weekly' ? 'Dari ' . \Carbon\Carbon::parse($start_date)->format('d-m-Y') . ' hingga ' . \Carbon\Carbon::parse($end_date)->format('d-m-Y') : 'Bulan: ' . \Carbon\Carbon::parse($start_date)->format('F Y')) }}
    </p>
    <p>Total Screening Offline: {{ $totalScreeningOffline }}</p>
    <p>Total Uang Masuk: Rp {{ number_format($totalUangMasuk, 0, ',', '.') }}</p>

    <h2>Screening Offline</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama Pasien</th>
                <th>Tanggal Screening</th>
                <th>Status</th>
                <th>Jumlah Dibayar</th>
                <th>Metode Pembayaran</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($screeningDetails as $index => $screening)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $screening->full_name }}</td>
                    <td>{{ \Carbon\Carbon::parse($screening->created_at)->format('d-m-Y') }}</td>
                    <td>{{ $screening->health_check_result }}</td>
                    <td>Rp {{ number_format($screening->amount_paid, 0, ',', '.') }}</td>
                    <td>{{ $screening->payment_method }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>




</body>

</html>
