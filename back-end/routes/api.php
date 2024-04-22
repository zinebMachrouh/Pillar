<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\CheckupController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;

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

Route::post('/refresh', [AuthController::class, 'refresh']);

Route::post('/doctors/create', [DoctorController::class, 'store']);

Route::get('/patients', [PatientController::class, 'index']);
Route::post('/patient/store', [PatientController::class, 'store']);
Route::get('/patients/{id}', [PatientController::class, 'show']);
Route::post('/patients/search', [PatientController::class, 'search']);
Route::post('/patients/attach', [PatientController::class, 'addByCin']);

Route::post('/medications', [MedController::class, 'store']);
Route::put('/medications/{id}', [MedController::class, 'update']);
Route::delete('/medications/{id}', [MedController::class, 'destroy']);
Route::get('/patients/{patientId}/meds', [MedController::class, 'getMeds']);

Route::post('/appointments', [AppointmentController::class, 'create']);
Route::get('/appointments/{id}', [AppointmentController::class, 'find']);
Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
Route::delete('/appointments/{id}', [AppointmentController::class, 'delete']);
Route::patch('/appointments/{id}', [AppointmentController::class, 'modify']);
Route::get('/appointments/upcoming', [AppointmentController::class, 'getUpcomingAppointments']);
Route::get('/appointments/pending', [AppointmentController::class, 'getPending']);

Route::post('/checkups', [CheckupController::class, 'createCheckup']);
Route::put('/checkups/{id}', [CheckupController::class, 'updateCheckup']);
Route::delete('/checkups/{id}', [CheckupController::class, 'deleteCheckup']);
Route::get('/checkups/appointment/{appointmentId}', [CheckupController::class, 'findCheckupByAppointment']);

Route::get('/admin/index', [AdminController::class, 'index']);
Route::delete('/banpatient/{patient_id}', [AdminController::class, 'banPatient']);
Route::delete('/bandoctor/{doctor_id}', [AdminController::class, 'banDoctor']);
Route::get('/restorepatient/{patient_id}', [AdminController::class, 'restorePatient']);
Route::get('/restoredoctor/{doctor_id}', [AdminController::class, 'restoreDoctor']);
Route::get('/viewstatistics', [AdminController::class, 'viewStatistics']);