<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user = Auth::user();
        $role = $user->role->name;

        if ($role === 'doctor') {
            $redirect = 'doctor';
        } elseif ($role === 'admin') {
            $redirect = 'admin';
        }elseif ($role === 'patient'){
            $redirect = 'patient';
        } else {
            $redirect = '404';
        }

        return response()->json([
            'status' => 'success',
            'message'=> 'Successfully logged in',
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'redirect' => $redirect
        ]);
    }

    public function register(RegisterRequest $request)
    {

        $validatedData = $request->validated();

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'cin' => $validatedData['cin'],
            'password' => Hash::make($validatedData['password']), 
            'phone_number' => $validatedData['phone_number'],
            'role_id' => 2,
        ]);


        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'redirect' => 'doctor/create'
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
