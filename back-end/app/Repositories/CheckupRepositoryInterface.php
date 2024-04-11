<?php

namespace App\Repositories;

use App\DTO\CheckupDTO;
use App\Models\Checkup;
use Illuminate\Support\Collection;

interface CheckupRepositoryInterface
{
    public function create(CheckupDTO $dto): Checkup;

    public function find(int $id): ?Checkup;

    public function update(int $id, CheckupDTO $dto): bool;

    public function delete(int $id): bool;

    public function findCheckupByAppointment(int $appointmentId): ?Checkup;

}