<!DOCTYPE html>
<html>

<head>
    <title>Laporan Aktivitas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        h1 {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <h1>Laporan Aktivitas Saya</h1>

    <p><strong>Jumlah Screening yang Diperiksa:</strong> {{ $screeningCount }}</p>

    <h2>Screening yang Diperiksa</h2>
    <table>
        <thead>
            <tr>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($screenings as $screening)
                <tr>
                    <td>{{ $screening->full_name }}</td>
                    <td>{{ $screening->user->email }}</td>
                    <td>{{ \Carbon\Carbon::parse($screening->created_at)->toDateString() }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="text-center">Tidak ada screening yang diperiksa.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>
