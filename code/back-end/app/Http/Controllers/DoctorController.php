<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorStoreRequest;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
}
