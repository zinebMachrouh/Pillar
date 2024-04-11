<?php

namespace App\Services;

use App\DTO\MedDTO;
use App\Repositories\MedRepositoryInterface;
use Illuminate\Support\Collection;

class MedService implements MedServiceInterface
{
	protected $medRepository;

	public function __construct(MedRepositoryInterface $medRepository)
	{
		$this->medRepository = $medRepository;
	}

	public function createMedication(MedDTO $dto, int $patientId)
	{
		return $this->medRepository->create($dto, $patientId);
	}

	public function updateMedication(MedDTO $dto, int $id)
	{
		$this->medRepository->update($dto, $id);
	}

	public function deleteMedication(int $id)
	{
		$this->medRepository->delete($id);
	}

	public function getMedsByPatient(int $patientId): Collection
	{
		return $this->medRepository->getByPatient($patientId);
	}
}