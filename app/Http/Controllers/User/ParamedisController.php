<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Screening\Scan;
use App\Models\Screening\Online;
use App\Models\Screening\Offline;
use App\Models\Clinic\HealthCheck;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Http\Requests\Screening\QuestionerRequest;

class ParamedisController extends Controller
{

    public function index()
        {
            return inertia('Paramedis/Dashboard', [
                'totalScreening' => Offline::count(),
                'totalScreeningOnline'=> Online::count(),
                'latestScreenings' => Offline::orderBy('created_at', 'desc')->take(5)
                ->get(),
            ]);
        }

    public function ScreeningOnline()
        {
            // Ambil semua scan dengan status 'pending'
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



    public function processHealthCheck(Request $request, $id)
    {
        $request->validate([
            'health_status' => 'required|string|in:sehat,tidak sehat',
            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'mountain' => 'required|string|max:255',
            'citizenship' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255',
            'question1' => 'required|boolean',
            'question2' => 'required|boolean',
            'question3' => 'required|boolean',
        ]);

        $scan = Scan::findOrFail($id);
        $scan->update(['status' => 'processed']); // Update status scan

        $data = array_merge($request->all(), ['scan_id' => $id]);

        $healthCheck = HealthCheck::create($data);

        if ($request->health_status === 'sehat') {
            $screening = Online::where('id', $scan->screening_id)->first();
            $certificatePath = $this->generateCertificate($screening);

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
        $filename = 'certificate_' . $screening->id . '.pdf';

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        Storage::put($path . $filename, $pdf->output());

        return $path . $filename;
    }


    public function PhysicalExamination($id)
    {
        // Ambil data dari database berdasarkan id
        $screening = Offline::findOrFail($id);

        // Kirim data ke halaman Inertia
        return Inertia::render('Paramedis/PhysicalExamination/Index', [
            'screening' => $screening
        ]);
    }

    public function store(Request $request, $id)
        {
            dd($request->all());
            $validated = $request->validate([
                'blood_pressure' => 'nullable|string',
                'heart_rate' => 'nullable|integer',
                'oxygen_saturation' => 'nullable|integer',
                'respiratory_rate' => 'nullable|integer',
                'body_temperature' => 'nullable|numeric',
                'physical_assessment' => 'nullable|string',
                'is_recommended_for_hiking' => 'nullable|boolean',
                'not_recommended_reason' => 'nullable|string',
                'medical_recommendations' => 'nullable|string',
            ]);

            // Cari screening berdasarkan ID
            $screening = Screening::findOrFail($id);

            // Update data pemeriksaan fisik
            $screening->update([
                'blood_pressure' => $validated['blood_pressure'],
                'heart_rate' => $validated['heart_rate'],
                'oxygen_saturation' => $validated['oxygen_saturation'],
                'respiratory_rate' => $validated['respiratory_rate'],
                'body_temperature' => $validated['body_temperature'],
                'physical_assessment' => $validated['physical_assessment'],
                'is_recommended_for_hiking' => $validated['is_recommended_for_hiking'],
                'not_recommended_reason' => $validated['not_recommended_reason'],
                'medical_recommendations' => $validated['medical_recommendations'],
            ]);

                return redirect()->route('paramedis.screening.offline');
        }

}
