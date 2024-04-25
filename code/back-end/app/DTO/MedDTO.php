<?php

namespace App\DTO;

class MedDTO
{
    public $name;
    public $dosage;
    public $frequency;
    public $prescription_date;
    public $patient_id;
    public $doctor_id;
    public $notes;

    public function __construct($name, $dosage, $frequency, $prescription_date, $patient_id, $doctor_id, $notes)
    {
        $this->name = $name;
        $this->dosage = $dosage;
        $this->frequency = $frequency;
        $this->prescription_date = $prescription_date;
        $this->patient_id = $patient_id;
        $this->doctor_id = $doctor_id;
        $this->notes = $notes;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['name'],
            $data['dosage'],
            $data['frequency'],
            $data['prescription_date'],
            $data['patient_id'],
            $data['doctor_id'],
            $data['notes'] ?? null
        );
    }

    public function toArray()
    {
        return [
            'name' => $this->name,
            'dosage' => $this->dosage,
            'frequency' => $this->frequency,
            'prescription_date' => $this->prescription_date,
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'notes' => $this->notes,
        ];
    }
}
