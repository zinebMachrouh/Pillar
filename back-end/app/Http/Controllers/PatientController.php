<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Checkup;
use App\Models\User;
use App\Models\Patient;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\error;

class PatientController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }
    public function index()
    {
        try {
            $user = Auth::user();
            $doctor = $user->doctor;
            $patients = $doctor->patients()->orderBy('created_at')->with('user')->get();
            $statistics = [
                'Patients' => $doctor->patients()->count(),
                'Appoinments' => Appointment::where('doctor_id', $doctor->id)->count(),
                'Checkups' => Checkup::where('doctor_id', $doctor->id)->count()
            ];
            return response()->json(['patients' => $patients, 'user' => $user, 'statistics'=> $statistics]);

        } catch (Exception $error) {
            return response()->json(["error"=>$error->getMessage()]);
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|integer',
            'gender' => 'required|string',
            'birthday' => 'required|date',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_number' => 'required|integer',
            'insurance_provider' => 'required|string',
            'insurance_policy_number' => 'required|string',
            'last_visit' => 'required|date',
            'medical_history' => 'required|string',
            'allergies' => 'required|string',
        ]);

        $randomPassword = mt_rand(1000000000, 9999999999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make((string)$randomPassword),
            'phone_number' => $request->phone_number,
            'role_id' => 3
        ]);

        $patient = $user->patient()->create([
            'user_id' => $user->id,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'address' => $request->address,
            'emergency_contact_name' => $request->emergency_contact_name,
            'emergency_contact_number' => $request->emergency_contact_number,
            'insurance_provider' => $request->insurance_provider,
            'insurance_policy_number' => $request->insurance_policy_number,
            'last_visit' => $request->last_visit,
            'medical_history' => $request->medical_history,
            'allergies' => $request->allergies,
        ]);
        Auth::user()->doctor->patients()->attach($patient->id);
        return response()->json(['status' => 'success', 'message' => 'Patient created successfully', 'patient' => $patient], 201);
    }

    public function show($id)
    {
        $patient = Patient::findOrFail($id);
        $medications = $patient->meds;
        $appointments = $patient->appointments;
        $checkups = $patient->checkups()->orderBy('created_at', 'desc')->limit(3)->get();

        return response()->json(['patient' => $patient, 'medications' => $medications, 'appointments' => $appointments, 'checkups' => $checkups]);
    }
    public function search(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        $user = User::where('email', $email)->first();
        $patient = $user->patient;

        if (!$patient) {
            return response()->json(['error' => 'Patient not found'], 404);
        }

        return response()->json(['patient' => $patient]);
    }
}
