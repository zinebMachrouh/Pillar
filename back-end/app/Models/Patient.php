<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'gender',
        'birthday',
        'address',
        'emergency_contact_name',
        'emergency_contact_number',
        'insurance_provider',
        'insurance_policy_number',
        'last_visit',
        'medical_history',
        'allergies',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function checkups()
    {
        return $this->hasMany(Checkup::class);
    }

    public function meds()
    {
        return $this->hasMany(Med::class);
    }
    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_patient');
    }
}
