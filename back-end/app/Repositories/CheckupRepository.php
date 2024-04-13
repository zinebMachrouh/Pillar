<?php

namespace App\Repositories;

use App\DTO\CheckupDTO;
use App\Models\Checkup;
use Illuminate\Support\Collection;
use Carbon\Carbon;

class CheckupRepository implements CheckupRepositoryInterface
{
	public function create(CheckupDTO $dto): Checkup
	{
		return Checkup::create($dto->toArray());
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