<?php

namespace App\Http\Controllers;

use Exception;
use App\DTO\PatientDTO;
use App\Http\Requests\PatientRequest;
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
}
