<!DOCTYPE html>
<html>

<head>
    <title>Your QR Code</title>
</head>

<body>
    <p>Dear {{ $user->name }},</p>
    <p>Thank you for registering. Please find your QR code below:</p>
    <p>Queue Number: {{ $user->queue_number }}</p>
    <img src="{{ $qrCodeUrl }}" alt="QR Code">
</body>

</html>
