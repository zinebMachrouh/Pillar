<?php

namespace App\Http\Controllers;

use App\DTO\MedDTO;
use App\Services\MedServiceInterface;
use Illuminate\Http\JsonResponse;

class MedController extends Controller
{
    protected $medService;

    public function __construct(MedServiceInterface $medService)
    {
        $this->middleware('auth:api');
        $this->medService = $medService;
    }

    public function store(MedDTO $dto, $patientId): JsonResponse
    {
        $medication = $this->medService->createMedication($dto, $patientId);

        return response()->json([
            'status' => 'success',
            'message' => 'Medication created successfully',
            'medication' => $medication
        ], 201);
    }

    public function update(MedDTO $dto, $id): JsonResponse
    {
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
