<?php

namespace App\DTO;

class DoctorDTO extends UserDTO
{
    public $gender;
    public $address;
    public $speciality;
    public $qualifications;
    public $license_number;
    public $hospital_affiliation;
    public $experience;
    public $availability;
    public $working_hours;
    public $appointment_fee;
    public $about;
    public $user_id;

    public function __construct($name, $email,$cin, $password, $phone_number, $roleId, $gender, $address, $speciality, $qualifications, $license_number, $hospital_affiliation, $experience, $availability, $working_hours, $appointment_fee, $about, $user_id)
    {
        parent::__construct($name, $email,$cin, $password, $phone_number, $roleId);

        $this->gender = $gender;
        $this->address = $address;
        $this->speciality = $speciality;
        $this->qualifications = $qualifications;
        $this->license_number = $license_number;
        $this->hospital_affiliation = $hospital_affiliation;
        $this->experience = $experience;
        $this->availability = $availability;
        $this->working_hours = $working_hours;
        $this->appointment_fee = $appointment_fee;
        $this->about = $about;
        $this->user_id = $user_id;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['name'],
            $data['email'],
            $data['cin'],
            $data['password'],
            $data['phone_number'],
            $data['role_id'],
            $data['gender'],
            $data['address'],
            $data['speciality'],
            $data['qualifications'],
            $data['license_number'],
            $data['hospital_affiliation'],
            $data['experience'],
            $data['availability'],
            $data['working_hours'],
            $data['appointment_fee'],
            $data['about'] ?? null,
            $data['user_id']
        );
    }

    public function toArray()
    {
        $parentArray = parent::toArray();
        return array_merge($parentArray,[
            'gender' => $this->gender,
            'address' => $this->address,
            'speciality' => $this->speciality,
            'qualifications' => $this->qualifications,
            'license_number' => $this->license_number,
            'hospital_affiliation' => $this->hospital_affiliation,
            'experience' => $this->experience,
            'availability' => $this->availability,
            'working_hours' => $this->working_hours,
            'appointment_fee' => $this->appointment_fee,
            'about' => $this->about,
            'user_id' => $this->user_id,
        ]);
    }
}
