<?php

namespace App\Http\Controllers;

use App\DTO\MedDTO;
use App\Services\MedServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedController extends Controller
{
    protected $medService;

    public function __construct(MedServiceInterface $medService)
    {
        $this->middleware('auth:api');
        $this->medService = $medService;
    }

    public function store(Request $request): JsonResponse
    {
        $dto = new MedDTO(
            $request->input('name'),
            $request->input('dosage'),
            $request->input('frequency'),
            $request->input('prescription_date'),
            $request->input('patient_id'),
            Auth::user()->doctor->id,
            $request->input('notes')
        );
        $medication = $this->medService->createMedication($dto);

        return response()->json([
            'status' => 'success',
            'message' => 'Medication created successfully',
            'medication' => $medication
        ], 201);
    }

    public function update(Request  $request, $id): JsonResponse
    {
        $dto = new MedDTO(
            $request->input('name'),
            $request->input('dosage'),
            $request->input('frequency'),
            $request->input('prescription_date'),
            $request->input('patient_id'),
            Auth::user()->doctor->id,
            $request->input('notes')
        );
        $this->medService->updateMedication($dto, $id);

        return response()->json([
            'status' => 'success',
            'message' => 'Medication updated successfully'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $this->medService->deleteMedication($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Medication deleted successfully'
        ]);
    }

    public function getMeds($patientId): JsonResponse
    {
        $medications = $this->medService->getMedsByPatient($patientId);

        return response()->json([
            'status' => 'success',
            'data' => $medications
        ]);
    }
}
