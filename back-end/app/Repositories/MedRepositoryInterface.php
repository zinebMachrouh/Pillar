<?php

namespace App\Repositories;

use App\DTO\MedDTO;
use Illuminate\Support\Collection;

interface MedRepositoryInterface
{
    public function create(MedDTO $dto);

    public function update(MedDTO $dto, int $id);

    public function delete(int $id);

    public function getByPatient(int $patientId): Collection;
}