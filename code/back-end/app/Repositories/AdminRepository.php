<?php

namespace App\Repositories;

use App\Models\Appointment;
use App\Models\User;
use App\Repositories\AdminRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminRepository implements AdminRepositoryInterface
{
	public function index()
	{
		try {
			$user = Auth::user();
			$patients = User::where('role_id', 3)->withTrashed()->with('patient')->get();
			$doctors = User::where('role_id', 2)->withTrashed()->with('doctor')->get();
			return ['status' => 'success', 'patients' => $patients, 'doctors' => $doctors, 'user' => $user];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}

	public function banPatient($patientId)
	{
		try {
			$patient = User::findOrFail($patientId);
			$patient->delete();
			return ['status' => 'success', 'message' => 'Patient banned successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => 'Could not ban patient'];
		}
	}

	public function restorePatient($patientId)
	{
		try {
			$patient = User::onlyTrashed()->findOrFail($patientId);
			$patient->restore();
			return ['status' => 'success', 'message' => 'Patient restored successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => 'Could not restore patient'];
		}
	}

	public function banDoctor($doctorId)
	{
		try {
			$doctor = User::findOrFail($doctorId);
			$doctor->delete();
			return ['status' => 'success', 'message' => 'Doctor banned successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => 'Could not ban doctor'];
		}
	}

	public function restoreDoctor($doctorId)
	{
		try {
			$doctor = User::onlyTrashed()->findOrFail($doctorId);
			$doctor->restore();
			return ['status' => 'success', 'message' => 'Doctor restored successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => 'Could not restore doctor'];
		}
	}

	public function viewStatistics()
	{
		try {
			$patientsCount = User::where('role_id', 3)->withTrashed()->count();
			$doctorsCount = User::where('role_id', 2)->withTrashed()->count();
			$appointmentsCount = Appointment::count();
			$activePatientsCount = User::where('role_id', 3)->whereNull('deleted_at')->count();
			$activeDoctorsCount = User::where('role_id', 2)->whereNull('deleted_at')->count();
			$bannedPatientsCount = $patientsCount - $activePatientsCount;
			$bannedDoctorsCount = $doctorsCount - $activeDoctorsCount;

			$statistics = [
				'patients_count' => $patientsCount,
				'doctors_count' => $doctorsCount,
				'appointments_count' => $appointmentsCount,
				'active_patients_count' => $activePatientsCount,
				'active_doctors_count' => $activeDoctorsCount,
				'banned_patients_count' => $bannedPatientsCount,
				'banned_doctors_count' => $bannedDoctorsCount,
			];
			return [
				'statisctics' => $statistics,
			];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}
}
