<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModifyDoctorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email',
            'cin' => 'required|string',
            'phone_number' => 'required|integer',
            'gender' => 'required|string',
            'address' => 'required|string',
            'speciality' => 'required|string',
            'qualifications' => 'required|string',
            'license_number' => 'required|integer',
            'hospital_affiliation' => 'required|string',
            'experience' => 'required|int',
            'working_hours' => 'required|string',
            'appointment_fee' => 'required|numeric',
            'about' => 'required|string',
        ];
    }
}
