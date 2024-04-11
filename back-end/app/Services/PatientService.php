<?php

namespace App\Services;

use Exception;
use App\DTO\PatientDTO;
use Illuminate\Support\Facades\Auth;
use App\Services\PatientServiceInterface;
use App\Repositories\PatientRepositoryInterface;

class PatientService implements PatientServiceInterface
{
	protected $patientRepository;

	public function __construct(PatientRepositoryInterface $patientRepository)
	{
		$this->patientRepository = $patientRepository;
	}

	public function index()
	{
		try {
			$user = Auth::user();
			return $this->patientRepository->index($user);
		} catch (Exception $error) {
			return ['error' => $error->getMessage()];
		}
	}

	public function store(PatientDTO $data)
	{
		return $this->patientRepository->store($data);
	}

	public function show($id)
	{
		return $this->patientRepository->show($id);
	}

	public function search(array $data)
	{
		return $this->patientRepository->search($data);
	}
}