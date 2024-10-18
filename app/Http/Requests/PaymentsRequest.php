<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentsRequest extends FormRequest
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
            'amount_paid' => 'required|numeric',
            'quantity_product' => 'nullable|integer',
            'price_product' => 'nullable|numeric',
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi gambar
        ];
    }
}
