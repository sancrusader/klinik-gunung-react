<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scan QR Code</title>
    <link rel="shortcut icon" href="{{ asset('storage/avatar/klinik_gunung_avatar.jpg') }}" type="image/x-icon">
    @vite('resources/css/app.css')
    <style>
        #reader {
            width: 100%;
            max-width: 600px;
            margin: auto;
        }
    </style>
</head>

<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Scan QR Code</h1>

        @if (session('status'))
            <p class="text-green-600 mb-4">{{ session('status') }}</p>
        @endif

        @if ($errors->any())
            <p class="text-red-600 mb-4">{{ $errors->first() }}</p>
        @endif

        <div id="reader" class="border-2 border-gray-300 mb-4"></div>

        <form id="scan-form" method="POST" action="{{ route('admin.scan.process') }}">
            @csrf
            <input type="hidden" name="qr_code_data" id="qr_code_data">
        </form>

        <div class="flex justify-between mb-4">
            <button id="start-camera" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Start Camera
                Scan</button>
            <button id="stop-camera" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Stop Camera
                Scan</button>
        </div>

        <div class="text-center mb-4">
            <label for="upload-image" class="sr-only">Choose file</label>
            <input type="file" id="upload-image" accept="image/*"
                class="block w-full text-sm text-gray-500
            file:me-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:text-neutral-500
            dark:file:bg-blue-500
            dark:hover:file:bg-blue-400">
        </div>
    </div>

    <script src="https://unpkg.com/qr-scanner/qr-scanner.umd.min.js"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        let html5QrcodeScanner;

        document.getElementById('start-camera').addEventListener('click', () => {
            html5QrcodeScanner = new Html5QrcodeScanner(
                "reader", {
                    fps: 10,
                    qrbox: 250
                }, false);
            html5QrcodeScanner.render(onScanSuccess, onScanError);
        });

        document.getElementById('stop-camera').addEventListener('click', () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear();
            }
        });

        function onScanSuccess(decodedText, decodedResult) {
            document.getElementById('qr_code_data').value = decodedText;
            document.getElementById('scan-form').submit();
        }

        function onScanError(errorMessage) {
            console.warn(`QR error = ${errorMessage}`);
        }

        const fileInput = document.getElementById('upload-image');
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            QrScanner.scanImage(file, {
                    returnDetailedScanResult: true
                })
                .then(result => {
                    document.getElementById('qr_code_data').value = result.data;
                    document.getElementById('scan-form').submit();
                })
                .catch(e => console.log(e));
        });
    </script>
</body>

</html>
