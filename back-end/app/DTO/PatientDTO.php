<?php

namespace App\DTO;

use App\Models\Patient;
use Illuminate\Support\Facades\Hash;

class PatientDTO extends UserDTO
{
    public $gender;
    public $birthday;
    public $address;
    public $emergencyContactName;
    public $emergencyContactNumber;
    public $insuranceProvider;
    public $insurancePolicyNumber;
    public $lastVisit;
    public $medicalHistory;
    public $allergies;

    public function __construct($name, $email,$cin, $password, $phone_number, $role_id, $gender, $birthday, $address, $emergencyContactName, $emergencyContactNumber, $insuranceProvider, $insurancePolicyNumber, $lastVisit, $medicalHistory, $allergies)
    {
        parent::__construct($name, $email,$cin, $password, $phone_number, $role_id);

        $this->gender = $gender;
        $this->birthday = $birthday;
        $this->address = $address;
        $this->emergencyContactName = $emergencyContactName;
        $this->emergencyContactNumber = $emergencyContactNumber;
        $this->insuranceProvider = $insuranceProvider;
        $this->insurancePolicyNumber = $insurancePolicyNumber;
        $this->lastVisit = $lastVisit;
        $this->medicalHistory = $medicalHistory;
        $this->allergies = $allergies;
    }

    public static function fromRequest(array $data)
    {
        $password = self::generateRandomPassword();
        return new self(
            $data['name'],
            $data['email'],
            $data['cin'],
            $password,
            $data['phone_number'],
            3,
            $data['gender'],
            $data['birthday'],
            $data['address'],
            $data['emergency_contact_name'],
            $data['emergency_contact_number'],
            $data['insurance_provider'],
            $data['insurance_policy_number'],
            $data['last_visit'],
            $data['medical_history'],
            $data['allergies'],
        );
    }

    public function toArray()
    {
        $parentArray = parent::toArray();

        return array_merge($parentArray, [
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'address' => $this->address,
            'emergency_contact_name' => $this->emergencyContactName,
            'emergency_contact_number' => $this->emergencyContactNumber,
            'insurance_provider' => $this->insuranceProvider,
            'insurance_policy_number' => $this->insurancePolicyNumber,
            'last_visit' => $this->lastVisit,
            'medical_history' => $this->medicalHistory,
            'allergies' => $this->allergies,
        ]);
    }

    private static function generateRandomPassword()
    {
        $password = rand(10000000, 99999999);
        return [
            'hashed' => Hash::make($password),
            'plain' => $password
        ];
    }

}

