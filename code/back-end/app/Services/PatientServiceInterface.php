<?php

namespace App\Services;

use App\DTO\PatientDTO;

interface PatientServiceInterface
{
    public function index();
    public function getData();

    public function store(PatientDTO $data);

    public function show($id, $doctor);

    public function search(array $data);

    public function update(array $data, $id);
}
