<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Screening\Offline;
use Illuminate\Support\Facades\Http;

class ScreeningApiController extends Controller
{
    public function index()
    {
        $screenings = Offline::all();

        return response()->json([
            'message' => 'Data screening berhasil diambil',
            'data' => $screenings,
        ], 200);
    }

    public function store()
    {
        $hardcodedData = [
            'user_id' => 'sandi',
            'health_check_result' => 'sehat',
            'paramedic_id' => 100,
        ];

        // Kirim data ke Airtable
        return $this->sendToAirtable($hardcodedData);
    }

    // Fungsi untuk mengirim data ke Airtable
    private function sendToAirtable($screening)
    {
        $airtableApiKey = env('AIRTABLE_API_KEY');
        $airtableBaseId = env('AIRTABLE_BASE_ID');
        $airtableTableName = env('AIRTABLE_TABLE_NAME');

        $dataToSend = [
            'records' => [
                [
                    'fields' => [
                        'Id' => $screening['user_id'],
                        'Name' => 'We created this from API',
                        'Status' => $screening['health_check_result'],
                    ],
                ],
            ],
        ];
        $response = Http::withToken($airtableApiKey)->post("https://api.airtable.com/v0/{$airtableBaseId}/{$airtableTableName}", $dataToSend);
        $responseData = $response->json();

        if ($response->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengirim data ke Airtable.',
                'error' => $responseData,
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dikirim ke Airtable.',
            'data' => $responseData,
        ], 201);
    }
}
