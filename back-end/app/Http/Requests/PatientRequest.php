<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|integer',
            'gender' => 'required|string',
            'birthday' => 'required|date',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_number' => 'required|integer',
            'insurance_provider' => 'required|string',
            'insurance_policy_number' => 'required|string',
            'last_visit' => 'required|date',
            'medical_history' => 'required|string',
            'allergies' => 'required|string',
        ];
    }}
