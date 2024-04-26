<?php

namespace App\Services;

use App\DTO\DoctorDTO;
use App\Repositories\DoctorRepositoryInterface;

class DoctorService implements DoctorServiceInterface
{
	private $doctorRepository;
	public function __construct(DoctorRepositoryInterface $doctorRepository)
	{
		$this->doctorRepository = $doctorRepository;
	}
	
	public function update(array $data, $id)
	{
		return $this->doctorRepository->update($data, $id);
	}
}
