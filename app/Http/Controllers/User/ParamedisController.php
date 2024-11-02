<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Screening\Scan;
use App\Models\Screening\Online;
use App\Models\Screening\Offline;
use App\Models\Clinic\HealthCheck;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Helpers\ScreeningOfflineHelper;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ScreeningResource;
use App\Http\Requests\Screening\OnlineRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\Screening\QuestionerRequest;

class ParamedisController extends Controller
{
    public function index()
    {
        return inertia('Paramedis/Dashboard', [
            'totalScreening' => Offline::count(),
            'totalScreeningOnline' => Online::count(),
            'latestScreenings' => Offline::orderBy('created_at', 'desc')->take(5)
                ->get(),
        ]);
    }

    public function profile(Request $request): Response
    {
        return Inertia::render('Profile/Paramedis', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function ScreeningOnline()
    {
        $scans = Scan::where('status', 'pending')->get();

        return inertia('Paramedis/Screening/Online', [
            'scans' => $scans,
        ]);
    }

    public function Questioner($id)
    {
        $screening = Offline::with('user')->findOrFail($id);

        $questions = [
            'physical_health_q1' => 'Apakah Anda memiliki riwayat penyakit berikut ini?',
            'physical_health_q2' => 'Kapan terakhir kali Anda Melakukan Pemeriksaan kesehatan umum? ',
            'physical_health_q3' => 'Apakah Anda memiliki masalah dengan:',
            'physical_health_q4' => 'Apakah Anda sedang dalam pengobatan rutin atau menggunakan obat tertentu? jika ya, sebutkan:',
            'physical_health_q5' => 'Bagaimana Anda menilai kondisi fisik Anda saat ini untuk pendakian (misal: kekuatan otot, keseimbangan, stamina)?',
            'physical_health_q6' => 'Apakah Anda memiliki alergi (terhadap makanan, obat, atau lainnya)? Jika Ya, Sebutkan:',
            'experience_knowledge_q1' => 'Apakah Anda pernah mendaki Gunung Semeru sebelumnya?',
            'experience_knowledge_q2' => 'Apakah Anda pernah mengalami Altitude Sickness (mabuk ketinggian)?',
            'experience_knowledge_q3' => 'Apakah Anda mengetahui cara menangani situasi darurat seperti hipotermia, dehidrasi, atau cedera selama pendakian?',
            'experience_knowledge_q4' => 'Apakah Anda membawa atau tahu cara menggunakan perlengkapan berikut? (Centang semua yang sesuai)?',
            'experience_knowledge_q5' => 'Bagaimana persiapan Anda menghadapi perubahan cuaca di Gunung Semeru?',
        ];

        return Inertia::render('Paramedis/Screening/Questioner', [
            'screening' => $screening,
            'questions' => $questions,
        ]);
    }

    public function QuestionerDetail($id)
    {
        $screening = Offline::with('user')->findOrFail($id);

        $questions = ScreeningOfflineHelper::getScreeningQuestions();

        return Inertia::render('Paramedis/Questioner/QuestionerDetail', [
            'screening' => $screening,
            'questions' => $questions,
        ]);
    }

    public function QuestionerStore(QuestionerRequest $request, $id)
    {

        dd($request->all());
        $screening = Offline::findOrFail($id);
        $updateData = [];
        foreach (range(1, 6) as $index) {
            $field = "physical_health_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }
        foreach (range(1, 5) as $index) {
            $field = "experience_knowledge_q{$index}";
            $updateData[$field] = $request->filled($field) ? implode(', ', $request->$field) : null;
        }

        $screening->update($updateData);

        return back()->with('success', 'Data berhasil disimpan');
    }

    public function processHealthCheck(OnlineRequest $request, $id)
    {
        // Temukan scan berdasarkan ID
        $scan = Scan::findOrFail($id);
        $scan->update(['status' => 'processed']); // Update status scan

        // Siapkan data untuk HealthCheck
        $data = array_merge($request->validated(), ['scan_id' => $id]);

        // Buat HealthCheck baru
        $healthCheck = HealthCheck::create($data);

        // Proses sertifikat jika status kesehatan 'sehat'
        if ($request->health_status === 'sehat') {
            $screening = Online::find($scan->screening_id);
            $certificatePath = $this->generateCertificate($screening);

            // Simpan path sertifikat dan perbarui status
            $screening->certificate_path = $certificatePath;
            $screening->certificate_issued = true;
            $screening->save();

            return response()->json([
                'message' => 'Health check processed successfully.',
                'data' => [
                    'health_status' => $request->health_status,
                    'scan_id' => $id,
                    'certificate_path' => $certificatePath,
                ],
            ], 200);
        }

        return response()->json([
            'message' => 'Health check processed successfully.',
            'data' => [
                'health_status' => $request->health_status,
                'scan_id' => $id,
            ],
        ], 200);
    }
    private function generateCertificate($screening)
    {
        $data = [
            'full_name' => $screening->full_name,
            'date_of_birth' => $screening->date_of_birth,
            'mountain' => $screening->mountain,
            'citizenship' => $screening->citizenship,
            'country' => $screening->country,
            'address' => $screening->address,
            'phone' => $screening->phone,
            'email' => $screening->email,
            'date' => now()->format('Y-m-d'),
        ];

        $pdf = PDF::loadView('certificates.certificate', $data);

        $path = 'certificates/';
        $filename = 'certificate_'.$screening->id.'.pdf';

        if (! Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        Storage::put($path.$filename, $pdf->output());

        return $path.$filename;
    }

    public function PhysicalExamination($id)
    {
        // Ambil data dari database berdasarkan id
        $screening = Offline::findOrFail($id);

        // Kirim data ke halaman Inertia
        return Inertia::render('Paramedis/PhysicalExamination/Index', [
            'screening' => $screening,
        ]);
    }

    public function store(Request $request, $id)
    {

        $validated = $request->validate([
            'blood_pressure' => 'nullable|string',
            'heart_rate' => 'nullable|integer',
            'oxygen_saturation' => 'nullable|integer',
            'respiratory_rate' => 'nullable|integer',
            'body_temperature' => 'nullable|numeric',
            'is_recommended_for_hiking' => 'nullable|string',
            'medical_recommendations' => 'nullable|string',
        ]);

        $screening = Offline::findOrFail($id);

        $paramedicId = Auth::id();

        $screening->update([
            'blood_pressure' => $validated['blood_pressure'],
            'heart_rate' => $validated['heart_rate'],
            'oxygen_saturation' => $validated['oxygen_saturation'],
            'respiratory_rate' => $validated['respiratory_rate'],
            'body_temperature' => $validated['body_temperature'],
            'is_recommended_for_hiking' => $validated['is_recommended_for_hiking'],
            'medical_recommendations' => $validated['medical_recommendations'],
            'paramedic_id' => $paramedicId,
        ]);

    }


        public function updateHealthCheck(Request $request, $id)
    {
        $request->validate([
            'health_check_result' => 'required|in:sehat,butuh_pendamping,butuh_dokter',
        ]);

        // Cari data screening berdasarkan ID
        $screening = Offline::findOrFail($id);

        // Update hasil cek kesehatan dan status
        $screening->health_check_result = $request->health_check_result;
        $screening->status = 'completed';
        $screening->save();

        // Generate sertifikat setelah hasil kesehatan diperbarui
        $certificatePath = $this->generateCertificateOffline($screening);

        // Simpan path sertifikat di database
        $screening->certificate_path = $certificatePath;
        $screening->save();
    }


    private function generateCertificateOffline($screening)
    {
        $data = [
            'full_name' => $screening->full_name,
            'health_check_result' => $screening->health_check_result,
            'date' => now()->format('Y-m-d'),
        ];

        // Generate PDF Sertifikat
        $pdf = PDF::loadView('certificates.simple_certificate', $data);

        // Path penyimpanan PDF di storage Laravel
        $path = 'public/certificates/';
        $filename = 'certificate_'.$screening->id.'.pdf';

        // Jika folder belum ada, buat folder
        if (! Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        // Simpan PDF ke storage
        Storage::put($path.$filename, $pdf->output());

        // Path lengkap ke file PDF untuk dicetak
        $filePath = storage_path('app/'.$path.$filename);

        // Cetak file PDF menggunakan lpr
        exec("lpr -P EPSON_L850_Series_2 $filePath");

        // Kembalikan path untuk referensi lain jika diperlukan
        return $path.$filename;
    }

    public function HistoryOfflineScreening(Request $request)
    {
        $validatedData = $request->validate([
            'perpage' => 'sometimes|nullable|integer|min:1|max:100',
        ]);

        $perpage = $validatedData['perpage'] ?? 10;

        $user = Auth::user();

        if (! $user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $screenings = Offline::where('paramedic_id', $user->id)
            ->whereNotNull('health_check_result')
            ->paginate($perpage);

        return Inertia::render('Paramedis/History/Index', [
            'screenings' => ScreeningResource::collection($screenings),
            'pagination_links' => $screenings->links()->render(),
        ]);
    }
}
