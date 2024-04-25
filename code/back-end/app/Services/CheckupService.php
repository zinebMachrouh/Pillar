<?php

namespace App\Services;

use App\DTO\CheckupDTO;
use App\Repositories\CheckupRepositoryInterface;
use App\Models\Checkup;
use Illuminate\Support\Collection;

class CheckupService implements CheckupServiceInterface
{
	protected $checkupRepository;

	public function __construct(CheckupRepositoryInterface $checkupRepository)
	{
		$this->checkupRepository = $checkupRepository;
	}

	public function createCheckup(CheckupDTO $dto): Checkup
	{
		return $this->checkupRepository->create($dto);
	}

	public function updateCheckup(int $id, CheckupDTO $dto): bool
	{
		return $this->checkupRepository->update($id, $dto);
	}

	public function deleteCheckup(int $id): bool
	{
		return $this->checkupRepository->delete($id);
	}

	public function findCheckupByAppointment(int $appointmentId): ?Checkup
	{
		return $this->checkupRepository->findCheckupByAppointment($appointmentId);
	}
}