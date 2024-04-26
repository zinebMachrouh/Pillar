<?php

namespace App\Repositories;

use App\DTO\DoctorDTO;

interface DoctorRepositoryInterface
{
    public function update(array $data, $id);
}
