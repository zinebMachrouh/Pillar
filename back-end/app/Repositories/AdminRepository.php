<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\AdminRepositoryInterface;
use Illuminate\Support\Facades\DB;

class AdminRepository implements AdminRepositoryInterface
{
	public function banPatient($patientId)
	{
		try {
			$patient = User::findOrFail($patientId);
			$patient->delete();
			return ['status' => 'success', 'message' => 'Patient banned successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}

	public function banDoctor($doctorId)
	{
		try {
			$doctor = User::findOrFail($doctorId);
			$doctor->delete();
			return ['status' => 'success', 'message' => 'Doctor banned successfully'];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}

	public function viewStatistics()
	{
		try {
			$patientsCount = User::where('role_id', 3)->count();
			$doctorsCount = User::where('role_id', 2)->count();
			$appointmentsCount = DB::table('appointments')->count();
			$activePatientsCount = User::where('role_id', 3)->whereNull('deleted_at')->count();
			$activeDoctorsCount = User::where('role_id', 2)->whereNull('deleted_at')->count();
			$bannedPatientsCount = $patientsCount - $activePatientsCount;
			$bannedDoctorsCount = $doctorsCount - $activeDoctorsCount;

			return [
				'patients_count' => $patientsCount,
				'doctors_count' => $doctorsCount,
				'appointments_count' => $appointmentsCount,
				'active_patients_count' => $activePatientsCount,
				'active_doctors_count' => $activeDoctorsCount,
				'banned_patients_count' => $bannedPatientsCount,
				'banned_doctors_count' => $bannedDoctorsCount,
			];
		} catch (\Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}
}
