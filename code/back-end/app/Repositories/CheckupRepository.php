<?php

namespace App\Repositories;

use App\DTO\CheckupDTO;
use App\Models\Appointment;
use App\Models\Checkup;
use Illuminate\Support\Collection;
use Carbon\Carbon;

class CheckupRepository implements CheckupRepositoryInterface
{
	public function create(CheckupDTO $dto): Checkup
	{
		$checkup = Checkup::create($dto->toArray());
		Appointment::create([
			'patient_id' =>$checkup->patient_id,
			'doctor_id' =>$checkup->doctor_id,
			'date' =>$checkup->follow_up_date,
			'status' => 1,
		]);
		return $checkup;
	}

	public function find(int $id): ?Checkup
	{
		return Checkup::find($id);
	}

	public function update(int $id, CheckupDTO $dto): bool
	{
		$checkup = Checkup::find($id);

		if (!$checkup) {
			return false;
		}

		return $checkup->update($dto->toArray());
	}

	public function delete(int $id): bool
	{
		$checkup = Checkup::find($id);

		if (!$checkup) {
			return false;
		}

		return $checkup->delete();
	}
	public function findCheckupByAppointment(int $appointmentId): ?Checkup
	{
		return Checkup::where('appointment_id', $appointmentId)->first();
	}

}