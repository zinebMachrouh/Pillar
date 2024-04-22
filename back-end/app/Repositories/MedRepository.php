<?php

namespace App\Repositories;

use App\DTO\MedDTO;
use App\Models\Med;
use Illuminate\Support\Collection;

class MedRepository implements MedRepositoryInterface
{
	public function create(MedDTO $dto)
	{
		$data = $dto->toArray();
		return Med::create($data);
	}

	public function update(MedDTO $dto, int $id)
	{
		$med = Med::findOrFail($id);
		$med->update($dto->toArray());
	}

	public function delete(int $id)
	{
		$med = Med::findOrFail($id);
		$med->delete();
	}

	public function getByPatient(int $patientId): Collection
	{
		return Med::where('patient_id', $patientId)->get();
	}
}