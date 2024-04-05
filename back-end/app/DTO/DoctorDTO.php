<?php

namespace App\DTO;

class DoctorDTO
{
    public $gender;
    public $birthday;
    public $address;
    public $speciality;
    public $qualifications;
    public $license_Number;
    public $hospital_affiliation;
    public $experience;
    public $availability;
    public $working_hours;
    public $appointment_fee;
    public $about;
    public $user_id;

    public function __construct($gender, $birthday, $address, $speciality, $qualifications, $license_Number, $hospital_affiliation, $experience, $availability, $working_hours, $appointment_fee, $about, $user_id)
    {
        $this->gender = $gender;
        $this->birthday = $birthday;
        $this->address = $address;
        $this->speciality = $speciality;
        $this->qualifications = $qualifications;
        $this->license_Number = $license_Number;
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
            $data['gender'],
            $data['birthday'],
            $data['address'],
            $data['speciality'],
            $data['qualifications'],
            $data['license_Number'],
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
        return [
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'address' => $this->address,
            'speciality' => $this->speciality,
            'qualifications' => $this->qualifications,
            'license_Number' => $this->license_Number,
            'hospital_affiliation' => $this->hospital_affiliation,
            'experience' => $this->experience,
            'availability' => $this->availability,
            'working_hours' => $this->working_hours,
            'appointment_fee' => $this->appointment_fee,
            'about' => $this->about,
            'user_id' => $this->user_id,
        ];
    }
}
