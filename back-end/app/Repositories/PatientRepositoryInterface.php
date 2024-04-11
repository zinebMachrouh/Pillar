<?php

namespace App\Repositories;

use App\DTO\PatientDTO;

interface PatientRepositoryInterface
{
    public function index($user);

    public function store(PatientDTO $data);

    public function show($id);

    public function search(array $data);}
