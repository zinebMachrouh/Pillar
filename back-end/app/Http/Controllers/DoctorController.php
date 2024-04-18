<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorStoreRequest;
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
}
