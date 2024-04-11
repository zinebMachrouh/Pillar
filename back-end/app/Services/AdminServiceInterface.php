<?php

namespace App\Services;

interface AdminServiceInterface
{
    public function banPatient($patientId);

    public function banDoctor($doctorId);

    public function viewStatistics();
}