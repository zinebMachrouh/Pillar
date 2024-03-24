<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MedController;
use App\Http\Controllers\PatientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/patients', [PatientController::class, 'index']);
Route::middleware('auth', 'role:doctor')->prefix('api')->group(function () {
    Route::post('/doctors/create', [DoctorController::class, 'store']);
    Route::post('/patient/store', [PatientController::class, 'store']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::post('/medications/{patientId}', [MedController::class, 'store']);
    Route::put('/medications/{id}', [MedController::class, 'update']);
    Route::delete('/medications/{id}', [MedController::class, 'destroy']);
    Route::post('/patients/search', [PatientController::class, 'search']);
});