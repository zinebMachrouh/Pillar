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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PatientRepository implements PatientRepositoryInterface
{
	public function index($user)
	{
		$doctor = $user->doctor;
		$patients = $doctor->patients()->latest('updated_at')->with('user')->get();
		$appointments = $doctor->appointments()->with('patient.user', 'checkup')->latest('updated_at')->where('status', '!=', 0)->get();
		$pending = $doctor->appointments()->with('patient.user')->latest('updated_at')->where('status', 0)->get();

		$checkups = $doctor->checkups()->latest('updated_at')->get();
		$statistics = [
			'Patients' => $doctor->patients()->count(),
			'Appoinments' => $doctor->appointments()->where('status', '!=', 0)->count(),
			'Checkups' => Checkup::where('doctor_id', $doctor->id)->count()
		];
		return ['patients' => $patients, 'user' => $user, 'statistics' => $statistics, 'appointments' => $appointments, 'checkups' => $checkups, 'pending' => $pending];
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

	public function show($id)
	{
		$patient = Patient::findOrFail($id);
		$medications = $patient->meds;
		$appointments = $patient->appointments()->with('patient.user', 'checkup', 'doctor.user')->latest('updated_at')->where('status', '!=', 0)->get();
		$checkups = $patient->checkups()->orderBy('created_at', 'desc')->limit(3)->get();
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
}