<?php

namespace App\Http\Requests\Appointment;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'is_scheduled' => 'required|boolean',
            'scheduled_at' => 'required_if:is_scheduled,1|nullable|date',
            'unscheduled_reason' => 'required_if:is_scheduled,0|nullable|string',
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ];
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'scheduled_at.required_if' => 'Tanggal dan waktu harus diisi jika appointment terjadwal.',
            'unscheduled_reason.required_if' => 'Alasan harus diisi jika appointment tidak terjadwal.',
        ];
    }
}
