<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Med extends Model
{
    use HasFactory, SoftDeletes;
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
