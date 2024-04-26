<?php

namespace App\Http\Controllers;

use App\DTO\DoctorDTO;
use App\Http\Requests\DoctorStoreRequest;
use App\Http\Requests\ModifyDoctorRequest;
use App\Models\Doctor;
use App\Models\User;
use App\Services\DoctorServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    private $doctorService;
    public function __construct(DoctorServiceInterface $doctorService)
    {
        $this->doctorService = $doctorService;
        // $this->middleware('auth:api');
        
    }
    public function store(DoctorStoreRequest $request)
    {
        $user = User::find(Auth::user()->id);
        $doctor = $user->doctor()->create(array_merge($request->validated(), ['user_id' => $user->id]));

        return response()->json([
            'status' => 'success',
            'message' => 'Doctor created successfully',
            'doctor' => $doctor,
            'redirect' => 'doctor'
        ], 201);
    }
    public function search(Request $request)
    {
        $data = $request->validate([
            'query' => 'string'
        ]);
        
        $query = $data['query'];

        $patientId = Auth::user()->patient->id;

        $doctors = Doctor::whereHas('user', function ($queryBuilder) use ($query) {
            $queryBuilder->where('email', 'like', '%' . $query . '%')
            ->orWhere('name', 'like', '%' . $query . '%');
        })->whereHas('patients', function ($queryBuilder) use ($patientId) {
            $queryBuilder->where('patient_id', $patientId);
        })->orderBy('created_at')->with('user')->get();

        return response()->json([
            'status' => 'success',
            'doctors' => $doctors,
        ], 201);
    }

    public function update(ModifyDoctorRequest $request, $id)
    {
        $data = $request->validated();

        $response = $this->doctorService->update($data, $id);

        return response()->json($response, 201);
    }
}
