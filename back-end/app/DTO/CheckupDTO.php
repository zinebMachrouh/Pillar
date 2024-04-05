<?php

namespace App\DTO;

class CheckupDTO
{
    public $patient_id;
    public $doctor_id;
    public $symptoms;
    public $diagnosis;
    public $treatment_plan;
    public $follow_up_date;
    public $notes;

    public function __construct($patient_id, $doctor_id, $symptoms, $diagnosis, $treatment_plan, $follow_up_date, $notes)
    {
        $this->patient_id = $patient_id;
        $this->doctor_id = $doctor_id;
        $this->symptoms = $symptoms;
        $this->diagnosis = $diagnosis;
        $this->treatment_plan = $treatment_plan;
        $this->follow_up_date = $follow_up_date;
        $this->notes = $notes;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['patient_id'],
            $data['doctor_id'],
            $data['symptoms'],
            $data['diagnosis'],
            $data['treatment_plan'],
            $data['follow_up_date'],
            $data['notes'] ?? null
        );
    }

    public function toArray()
    {
        return [
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'symptoms' => $this->symptoms,
            'diagnosis' => $this->diagnosis,
            'treatment_plan' => $this->treatment_plan,
            'follow_up_date' => $this->follow_up_date,
            'notes' => $this->notes,
        ];
    }
}
