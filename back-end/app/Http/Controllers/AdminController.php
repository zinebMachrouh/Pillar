<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminServiceInterface;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminServiceInterface $adminService)
    {
        $this->adminService = $adminService;
    }

    public function banPatient(Request $request, $patient_id)
    {
        $result = $this->adminService->banPatient($patient_id);

        return response()->json($result);
    }

    public function banDoctor(Request $request, $doctor_id)
    {
        $result = $this->adminService->banDoctor($doctor_id);

        return response()->json($result);
    }

    public function viewStatistics()
    {
        $statistics = $this->adminService->viewStatistics();

        return response()->json($statistics);
    }
}
