<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DoctorStoreRequest extends FormRequest
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
            'gender' => 'required|string',
            'address' => 'nullable|string',
            'speciality' => 'required|string',
            'qualifications' => 'required|string',
            'license_number' => 'required|string',
            'hospital_affiliation' => 'required|string',
            'experience' => 'required|integer',
            'working_hours' => 'required|string',
            'appointment_fee' => 'required|integer',
            'about' => 'nullable|string',
        ];
    }
}
