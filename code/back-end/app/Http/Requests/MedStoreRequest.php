<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MedStoreRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'dosage' => 'required|string|max:255',
            'frequency' => 'required|string|max:255',
            'prescription_date' => 'required|date',
            'notes' => 'nullable|string',
        ];
    }
}
