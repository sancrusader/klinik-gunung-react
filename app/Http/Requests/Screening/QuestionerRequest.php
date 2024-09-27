<?php

namespace App\Http\Requests\Screening;

use Illuminate\Foundation\Http\FormRequest;

class QuestionerRequest extends FormRequest
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
        $rules = [];

        // Loop untuk kategori 'physical_health'
        foreach (range(1, 6) as $index) {
            $rules["physical_health_q{$index}"] = 'nullable|array';
            $rules["physical_health_q{$index}.*"] = 'string';
        }

        // Loop untuk kategori 'experience_knowledge'
        foreach (range(1, 5) as $index) {
            $rules["experience_knowledge_q{$index}"] = 'nullable|array';
            $rules["experience_knowledge_q{$index}.*"] = 'string';
        }

        return $rules;
    }
}
