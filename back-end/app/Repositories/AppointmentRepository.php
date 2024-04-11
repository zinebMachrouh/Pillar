<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\User;
use App\DTO\AppointmentDTO;
use App\Models\Appointment;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class AppointmentRepository implements AppointmentRepositoryInterface
{
	public function create(AppointmentDTO $dto)
	{
		$taken = Appointment::where('doctor_id', $dto->doctor_id)->where('date', $dto->date)->first();

		if ($taken) {
			return response()->json(['error' => 'Selected date and time are already taken.'], 422);
		} else {
			return response()->json([
				'status' => '200',
				'message'=> 'Appointment Created!',
				'data'=> Appointment::create($dto->toArray()),
			]);
		}
	}

	public function find(int $id)
	{
		return Appointment::find($id);
	}

	public function update(int $id, AppointmentDTO $dto): bool
	{
		$appointment = Appointment::find($id);

		if (!$appointment) {
			return false;
		}

		return $appointment->update($dto->toArray());
	}

	public function delete(int $id): bool
	{
		$appointment = Appointment::find($id);

		if (!$appointment) {
			return false;
		}

		return $appointment->delete();
	}
	public function getUpcomingAppointments($user)
	{
		$appts = $user->doctor()->appointments()->whereDate('date', '>=', Carbon::now())->get();
		return $appts;
	}
}
