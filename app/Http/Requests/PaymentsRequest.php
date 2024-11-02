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
            'payment_method' => 'required|string|in:qris,cash,transfer',
            'amount_paid' => 'required|numeric|min:0',
            'quantity_product' => 'nullable|integer|min:0',
            'price_product' => 'nullable|numeric|min:0',
            'payment_proof' => $this->payment_method === 'qris' || $this->payment_method === 'transfer'
                ? 'required|file|mimes:jpg,jpeg,png|max:2048'
                : 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
