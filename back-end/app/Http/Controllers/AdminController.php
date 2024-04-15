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

    public function index(){
        $result = $this->adminService->index();

        return response()->json($result);
    }

    public function banPatient($patient_id)
    {
        $result = $this->adminService->banPatient($patient_id);

        return response()->json($result);
    }

    public function banDoctor($doctor_id)
    {
        $result = $this->adminService->banDoctor($doctor_id);

        return response()->json($result);
    }

    public function restorePatient($patient_id)
    {
        $result = $this->adminService->restorePatient($patient_id);

        return response()->json($result);
    }

    public function restoreDoctor($doctor_id)
    {
        $result = $this->adminService->restoreDoctor($doctor_id);

        return response()->json($result);
    }

    public function viewStatistics()
    {
        $statistics = $this->adminService->viewStatistics();

        return response()->json($statistics);
    }
}
