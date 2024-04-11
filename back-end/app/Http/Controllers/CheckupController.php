<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\DTO\CheckupDTO;
use App\Services\CheckupServiceInterface;

class CheckupController extends Controller
{
    protected $checkupService;

    public function __construct(CheckupServiceInterface $checkupService)
    {
        $this->checkupService = $checkupService;
        $this->middleware('auth:api');
    }

    public function createCheckup(CheckupDTO $dto): JsonResponse
    {
        $checkup = $this->checkupService->createCheckup($dto);

        return response()->json([
            'status' => 'success',
            'data' => $checkup,
        ]);
    }

    public function updateCheckup(int $id, CheckupDTO $dto): JsonResponse
    {
        if ($this->checkupService->updateCheckup($id, $dto)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Checkup updated successfully',
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to update checkup',
        ], 400);
    }

    public function deleteCheckup(int $id): JsonResponse
    {
        if ($this->checkupService->deleteCheckup($id)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Checkup deleted successfully',
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to delete checkup',
        ], 400);
    }

    public function findCheckupByAppointment(int $appointmentId): JsonResponse
    {
        $checkup = $this->checkupService->findCheckupByAppointment($appointmentId);

        if ($checkup) {
            return response()->json([
                'status' => 'success',
                'data' => $checkup,
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Checkup not found for the specified appointment',
        ], 404);
    }
}
