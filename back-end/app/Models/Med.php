<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Med extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'dosage',
        'frequency',
        'prescription_date',
        'patient_id',
        'doctor_id',
        'notes',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
