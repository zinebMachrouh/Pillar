<?php

namespace App\Services;

use App\DTO\AppointmentDTO;
use App\Models\Appointment;
use Illuminate\Support\Collection;

interface AppointmentServiceInterface
{
    public function createAppointment(AppointmentDTO $dto);

    public function updateAppointment(int $id, AppointmentDTO $dto): bool;

    public function deleteAppointment(int $id): bool;
    public function findAppointment(int $id);

    public function getUpcomingAppointments();
}
