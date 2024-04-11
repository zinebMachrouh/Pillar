<?php

namespace App\Repositories;

interface AdminRepositoryInterface
{
    public function banPatient($patientId);

    public function banDoctor($doctorId);

    public function viewStatistics();
}