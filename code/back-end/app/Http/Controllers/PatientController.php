<?php

namespace App\Http\Controllers;

use Exception;
use App\DTO\PatientDTO;
use App\Http\Requests\ModifyPatientRequest;
use App\Http\Requests\PatientRequest;
use App\Models\User;
use App\Services\PatientServiceInterface;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    protected $patientService;

    public function __construct(PatientServiceInterface $patientService)
    {
        $this->patientService = $patientService;
    }

    public function index()
    {
        $patients = $this->patientService->index();
        return response()->json($patients);
    }

    public function getData(){
        $response = $this->patientService->getData();
        return response()->json($response);
    }

    public function store(PatientRequest $request)
    {
        $patientDto = PatientDTO::fromRequest($request->all());
        $result = $this->patientService->store($patientDto);
        return response()->json($result);
    }

    public function show($id)
    {
        $patient = $this->patientService->show($id);
        return response()->json($patient);
    }

    public function search(Request $request)
    {
        $data = $request->validate([
            'query' => 'string'
        ]);
        $patients = $this->patientService->search($data);
        return response()->json($patients);
    }
    public function addByCin(Request $request)
    {
        $data =
            $request->validate([
                'cin' => 'required|string|min:5'
            ]);;
        $doctor = auth()->user()->doctor;
        $user = User::where('cin', $data['cin'])->with('patient')->first();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        if ($doctor->patients()->where('patient_id', $user->patient->id)->exists()) {
            return response()->json(['message' => 'Patient is already attached to this doctor']);
        }

        $doctor->patients()->attach($user->patient->id);
        return response()->json(['message' => 'Patient attached successfully']);
    }
    public function update(ModifyPatientRequest $request, $id)
    {
        $data = $request->validated();

        $response = $this->patientService->update($data, $id);

        return response()->json($response, 201);
    }
}
