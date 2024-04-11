<?php

namespace App\Repositories;

use App\DTO\AppointmentDTO;
use App\Models\Appointment;
use Illuminate\Support\Collection;

interface AppointmentRepositoryInterface
{
    public function create(AppointmentDTO $dto);

    public function find(int $id);

    public function update(int $id, AppointmentDTO $dto): bool;

    public function delete(int $id): bool;

    public function getUpcomingAppointments($user);
}