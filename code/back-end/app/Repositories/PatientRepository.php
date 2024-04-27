<?php

namespace App\Repositories;

use App\DTO\AppointmentDTO;
use App\DTO\UserDTO;
use App\Models\User;
use App\DTO\PatientDTO;
use App\Mail\PatientPassword;
use App\Models\Checkup;
use App\Models\Patient;
use App\Models\Appointment;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PatientRepository implements PatientRepositoryInterface
{
	public function index($user)
	{
		$doctor = $user->doctor->load('user');
		$doctor->user->makeHidden('password');

		$patients = $doctor->patients()->latest('updated_at')->with('user')->get();
		$appointments = $doctor->appointments()->with('patient.user', 'checkup')->latest('updated_at')->where('status', '!=', 0)->get();
		$pending = $doctor->appointments()->with('patient.user')->latest('updated_at')->where('status', 0)->get();

		$checkups = $doctor->checkups()->latest('updated_at')->get();
		$statistics = [
			'Patients' => $doctor->patients()->count(),
			'Appoinments' => $doctor->appointments()->where('status', '!=', 0)->count(),
			'Checkups' => Checkup::where('doctor_id', $doctor->id)->count()
		];
		return ['patients' => $patients, 'doctor' => $doctor, 'statistics' => $statistics, 'appointments' => $appointments, 'checkups' => $checkups, 'pending' => $pending];
	}

	public function getData($user)
	{
		$patient = $user->patient->load('user');
		$patient->user->makeHidden('password');

		// $patient = Patient::where('user_id', $user->id)->with('user')->first();
		$appointments = $patient->appointments()->with('doctor.user', 'checkup', 'patient.user')->latest('updated_at')->where('status', '!=', 0)->get();
		$checkups = $patient->checkups()->latest('updated_at')->get();
		$pending = $patient->appointments()->with('doctor.user')->latest('updated_at')->where('status', 0)->get();
		$doctors = $user->patient->doctors()->with('user')->get();

		return ['patient' => $patient, 'appointments' => $appointments, 'checkups' => $checkups, 'doctors' => $doctors, 'pending' => $pending];
		// return $patient;
	}

	public function store(PatientDTO $data)
	{
		$authUser = User::find(Auth::id());
		$user = User::create([
			'name' => $data->name,
			'email' => $data->email,
			'cin' => $data->cin,
			'password' => $data->password['hashed'],
			'phone_number' => $data->phone_number,
			'role_id' => $data->role_id
		]);
		Mail::to($user->email)->send(new PatientPassword($user->name, $user->email, $data->password['plain']));
		$patient = $user->patient()->create($data->toArray());
		$authUser->doctor->patients()->attach($patient->id);
		return ['status' => 'success', 'message' => 'Patient created successfully', 'patient' => $patient];
	}

	public function show($id,$doctor)
	{
		$patient = Patient::findOrFail($id);
		$medications = $patient->meds()
			->where('doctor_id', $doctor)
			->get();
		$appointments = $patient->appointments()
			->with('patient.user', 'checkup', 'doctor.user')
			->latest('updated_at')
			->where('status', '!=', 0)
			->where('doctor_id', $doctor)
			->get();

		$checkups = $patient->checkups()
			->orderBy('created_at', 'desc')
			->where('doctor_id', $doctor)
			->get();
		return ['medications' => $medications, 'appointments' => $appointments, 'checkups' => $checkups];
	}

	public function search(array $data)
	{
		$query = $data['query'];

		$doctorId = Auth::user()->doctor->id;
		$patients = Patient::whereHas('user', function ($queryBuilder) use ($query) {
			$queryBuilder->where('email', 'like', '%' . $query . '%')
				->orWhere('name', 'like', '%' . $query . '%');
		})->whereHas('doctors', function ($queryBuilder) use ($doctorId) {
			$queryBuilder->where('doctor_id', $doctorId);
		})->orderBy('created_at')->with('user')->get();

		return ['patients' => $patients];
	}

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

			$patient = $user->patient;

			if (!$patient) {
				throw new Exception("Patient not found.");
			}

			$patient->update([
				'gender' => $data['gender'],
				'birthday' => $data['birthday'],
				'address' => $data['address'],
				'emergency_contact_name' => $data['emergency_contact_name'],
				'emergency_contact_number' => $data['emergency_contact_number'],
				'insurance_provider' => $data['insurance_provider'],
				'insurance_policy_number' => $data['insurance_policy_number'],
				'allergies' => $data['allergies'],
			]);

			return ['status' => 'success', 'message' => 'Patient updated successfully'];
		} catch (Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}
	}
}
