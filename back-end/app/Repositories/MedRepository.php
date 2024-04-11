<?php

namespace App\Repositories;

use App\DTO\MedDTO;
use App\Models\Med;
use Illuminate\Support\Collection;

class EloquentMedRepository implements MedRepositoryInterface
{
	public function create(MedDTO $dto, int $patientId)
	{
		$data = $dto->toArray();
		$data['patient_id'] = $patientId;
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