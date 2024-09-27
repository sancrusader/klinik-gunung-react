<?php

namespace App\Http\Requests\Screening;

use Illuminate\Foundation\Http\FormRequest;

class OfflineRequest extends FormRequest
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
            'full_name' => 'required|string|max:255',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'contact_number' => 'required|string|max:15',
            'planned_hiking_date' => 'required|date',
            'previous_hikes_count' => 'required|integer',
        ];
    }
}
