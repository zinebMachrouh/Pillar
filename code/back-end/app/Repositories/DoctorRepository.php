<?php

namespace App\Repositories;

use App\Models\User;
use Exception;

class DoctorRepository implements DoctorRepositoryInterface
{
	public function update(array $data, $id)
	{
		try {
			$user = User::find($id);

			if (!$user) {
				throw new Exception("User not found.");
			}

			$user->update([
				'name' => $data['name'],
				'email' => $data['email'],
				'cin' => $data['cin'],
				'phone_number' => $data['phone_number'],
			]);

			$doctor = $user->doctor;

			if (!$doctor) {
				throw new Exception("Doctor not found.");
			}

			$doctor->update([
				'gender' => $data['gender'],
				'address' => $data['address'],
				'speciality' => $data['speciality'],
				'qualifications' => $data['qualifications'],
				'license_number' => $data['license_number'],
				'hospital_affiliation' => $data['hospital_affiliation'],
				'experience' => $data['experience'],
				'working_hours' => $data['working_hours'],
				'appointment_fee' => $data['appointment_fee'],
				'about' => $data['about'],
			]);

			return ['status' => 'success', 'message' => 'Doctor updated successfully'];
		} catch (Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}
}
