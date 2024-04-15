<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'gender',
        'birthday',
        'address',
        'speciality',
        'qualifications',
        'license_number',
        'hospital_affiliation',
        'experience',
        'availability',
        'working_hours',
        'appointment_fee',
        'about',
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
    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'doctor_patient');
    }
}
