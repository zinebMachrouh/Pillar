<?php

namespace App\Services;

interface AdminServiceInterface
{
    public function index();

    public function banPatient($patientId);

    public function banDoctor($doctorId);
    
    public function restorePatient($patientId);

    public function restoreDoctor($doctorId);

    public function viewStatistics();
}