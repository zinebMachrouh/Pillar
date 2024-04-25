<?php

namespace App\Repositories;

interface AdminRepositoryInterface
{
    public function index();

    public function banPatient($patientId);

    public function banDoctor($doctorId);

    public function restorePatient($patientId);

    public function restoreDoctor($doctorId);

    public function viewStatistics();
}