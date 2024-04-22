<?php

namespace App\Services;

use App\DTO\MedDTO;
use Illuminate\Support\Collection;

interface MedServiceInterface
{
    public function createMedication(MedDTO $dto);

    public function updateMedication(MedDTO $dto, int $id);

    public function deleteMedication(int $id);

    public function getMedsByPatient(int $patientId): Collection;
}