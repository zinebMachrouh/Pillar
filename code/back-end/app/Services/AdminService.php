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

	public function index()
	{
		return $this->adminRepository->index();
	}

	public function banPatient($patientId)
	{
		return $this->adminRepository->banPatient($patientId);
	}

	public function banDoctor($doctorId)
	{
		return $this->adminRepository->banDoctor($doctorId);
	}
	public function restorePatient($patientId)
	{
		return $this->adminRepository->restorePatient($patientId);
	}

	public function restoreDoctor($doctorId)
	{
		return $this->adminRepository->restoreDoctor($doctorId);
	}

	public function viewStatistics()
	{
		return $this->adminRepository->viewStatistics();
	}
}

