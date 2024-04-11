<?php

namespace App\Services;

use App\DTO\CheckupDTO;
use App\Models\Checkup;
use Illuminate\Support\Collection;

interface CheckupServiceInterface
{
    public function createCheckup(CheckupDTO $dto): Checkup;

    public function updateCheckup(int $id, CheckupDTO $dto): bool;

    public function deleteCheckup(int $id): bool;

    public function findCheckupByAppointment(int $appointmentId): ?Checkup;
}