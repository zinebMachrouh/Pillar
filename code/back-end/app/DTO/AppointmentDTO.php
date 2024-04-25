<?php

namespace App\DTO;

class AppointmentDTO
{
    public $patient_id;
    public $doctor_id;
    public $date;
    public $status;
    public $notes;

    public function __construct($patient_id, $doctor_id, $date, $status, $notes)
    {
        $this->patient_id = $patient_id;
        $this->doctor_id = $doctor_id;
        $this->date = $date;
        $this->status = $status;
        $this->notes = $notes;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['patient_id'],
            $data['doctor_id'],
            $data['date'],
            $data['status'],
            $data['notes'] ?? null
        );
    }

    public function toArray()
    {
        return [
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'date' => $this->date,
            'status' => $this->status,
            'notes' => $this->notes,
        ];
    }
}
