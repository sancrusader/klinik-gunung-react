<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin-top: 100px;
        }

        h1 {
            font-size: 50px;
        }

        p {
            font-size: 25px;
        }
    </style>
</head>

<body>
    <h1>Certificate of Achievement</h1>
    <p>This certificate is awarded to</p>
    <h2>{{ $name }}</h2>
    <p>For completing the event</p>
    <h3>{{ $event }}</h3>
    <p>Date: {{ $date }}</p>
</body>

</html>
