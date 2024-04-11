<?php

namespace App\Services;

use App\Repositories\AdminRepositoryInterface;
use App\Services\AdminServiceInterface;

class AdminService implements AdminServiceInterface
{
	protected $adminRepository;

	public function __construct(AdminRepositoryInterface $adminRepository)
	{
		$this->adminRepository = $adminRepository;
	}

	public function banPatient($patientId)
	{
		return $this->adminRepository->banPatient($patientId);
	}

	public function banDoctor($doctorId)
	{
		return $this->adminRepository->banDoctor($doctorId);
	}

	public function viewStatistics()
	{
		return $this->adminRepository->viewStatistics();
	}
}

