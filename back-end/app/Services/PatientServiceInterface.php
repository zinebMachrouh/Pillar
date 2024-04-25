<?php

namespace App\Services;

use App\DTO\PatientDTO;

interface PatientServiceInterface
{
    public function index();
    public function getData();

    public function store(PatientDTO $data);

    public function show($id);

    public function search(array $data);
}
