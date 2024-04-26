<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModifyPatientRequest extends FormRequest
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
            'birthday' => 'required|date',
            'address' => 'required|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_number' => 'required|integer',
            'insurance_provider' => 'required|string',
            'insurance_policy_number' => 'required|integer',
            'allergies' => 'required|string',
        ];
    }
}
