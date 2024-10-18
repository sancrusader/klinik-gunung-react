<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\PatientScreeningUpdated;

class TestController extends Controller
{
    public function index(){
        return Inertia::render('tes');
    }

    public function sendMessage(Request $request){
        $message  = $request->message;

        event(new PatientScreeningUpdated(
            patient: $message
        ));

        return response()->json(['message'=>'Berhasil',$message], 200);
    }

}
