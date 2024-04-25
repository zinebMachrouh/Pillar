<?php

namespace App\Http\Controllers;

use App\DTO\AppointmentDTO;
use Illuminate\Http\JsonResponse;
use App\Services\AppointmentServiceInterface;
use App\Http\Requests\CreateAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    protected $appointmentService;

    public function __construct(AppointmentServiceInterface $appointmentService)
    {
        $this->appointmentService = $appointmentService;
        // $this->middleware('auth:api');

    }
    public function find(int $id): JsonResponse
    {
        $id = (int) $id;
        $appointment = $this->appointmentService->findAppointment($id);

        if ($appointment) {
            return response()->json([
                'status' => 'success',
                'data' => $appointment,
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Appointment not found',
        ], 404);
    }
    public function create(CreateAppointmentRequest $request): JsonResponse
    {
        $dto = new AppointmentDTO(
            $request->input('patient_id'),
            Auth::user()->doctor->id,
            $request->input('date'),
            1,
            $request->input('notes')
        );

        $appointment = $this->appointmentService->createAppointment($dto);

        return $appointment;
        
    }

    public function update(UpdateAppointmentRequest $request, int $id): JsonResponse
    {
        $dto = new AppointmentDTO(
            $request->input('patient_id'),
            Auth::user()->doctor->id,
            $request->input('date'),
            1,
            $request->input('notes')
        );

        if ($this->appointmentService->updateAppointment($id, $dto)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment updated successfully',
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Appointment not found or could not be updated',
        ], 404);
    }

    public function delete(int $id): JsonResponse
    {
        if ($this->appointmentService->deleteAppointment($id)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment deleted successfully',
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Appointment not found or could not be deleted',
        ], 404);
    }
    public function modify(int $id): JsonResponse
    {
        if ($this->appointmentService->approveAppointment($id)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment deleted successfully',
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Appointment not found or could not be deleted',
        ], 404);
    }

    public function getUpcomingAppointments(): JsonResponse
    {
        $upcomingAppointments = $this->appointmentService->getUpcomingAppointments();

        return response()->json([
            'status' => 'success',
            'appointments' => $upcomingAppointments,
        ]);
    }

    public function store(Request $request) : JsonResponse
    {
        $dto = new AppointmentDTO(
            Auth::user()->patient->id,
            $request->input('doctor_id'),
            $request->input('date'),
            0,
            $request->input('notes')
        );

        $appointment = $this->appointmentService->createAppointment($dto);

        return $appointment;
    }
}
