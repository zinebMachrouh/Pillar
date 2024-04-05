<?php

namespace App\DTO;

class PatientDTO
{
    public $gender;
    public $birthday;
    public $address;
    public $emergency_contact_name;
    public $emergency_contact_number;
    public $insurance_provider;
    public $insurance_policy_number;
    public $last_visit;
    public $medical_history;
    public $allergies;
    public $user_id;

    public function __construct($gender, $birthday, $address, $emergency_contact_name, $emergency_contact_number, $insurance_provider, $insurance_policy_number, $last_visit, $medical_history, $allergies, $user_id)
    {
        $this->gender = $gender;
        $this->birthday = $birthday;
        $this->address = $address;
        $this->emergency_contact_name = $emergency_contact_name;
        $this->emergency_contact_number = $emergency_contact_number;
        $this->insurance_provider = $insurance_provider;
        $this->insurance_policy_number = $insurance_policy_number;
        $this->last_visit = $last_visit;
        $this->medical_history = $medical_history;
        $this->allergies = $allergies;
        $this->user_id = $user_id;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['gender'],
            $data['birthday'],
            $data['address'],
            $data['emergency_contact_name'],
            $data['emergency_contact_number'],
            $data['insurance_provider'],
            $data['insurance_policy_number'],
            $data['last_visit'],
            $data['medical_history'] ?? null,
            $data['allergies'] ?? null,
            $data['user_id']
        );
    }

    public function toArray()
    {
        return [
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'address' => $this->address,
            'emergency_contact_name' => $this->emergency_contact_name,
            'emergency_contact_number' => $this->emergency_contact_number,
            'insurance_provider' => $this->insurance_provider,
            'insurance_policy_number' => $this->insurance_policy_number,
            'last_visit' => $this->last_visit,
            'medical_history' => $this->medical_history,
            'allergies' => $this->allergies,
            'user_id' => $this->user_id,
        ];
    }
}
