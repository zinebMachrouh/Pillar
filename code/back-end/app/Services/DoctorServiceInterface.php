<?php

namespace App\Services;

use App\DTO\DoctorDTO;

interface DoctorServiceInterface
{
    public function update(array $data, $id);
}
