<?php

namespace App\Services;

use App\DTO\AppointmentDTO;
use App\Models\Appointment;
use Illuminate\Support\Collection;
use App\Repositories\AppointmentRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AppointmentService implements AppointmentServiceInterface
{
	protected $appointmentRepository;

	public function __construct(AppointmentRepositoryInterface $appointmentRepository)
	{
		$this->appointmentRepository = $appointmentRepository;
	}

	public function createAppointment(AppointmentDTO $dto)
	{
		return $this->appointmentRepository->create($dto);
	}
	public function findAppointment(int $id)
	{
		return $this->appointmentRepository->find($id);
	}

	public function updateAppointment(int $id, AppointmentDTO $dto): bool
	{
		return $this->appointmentRepository->update($id, $dto);
	}

	public function deleteAppointment(int $id): bool
	{
		return $this->appointmentRepository->delete($id);
	}
	public function getUpcomingAppointments()
	{
		$user = Auth::user();
		return $this->appointmentRepository->getUpcomingAppointments($user);
	}
}
