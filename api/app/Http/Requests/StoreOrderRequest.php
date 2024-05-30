<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'from' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'request_fors_id' => 'required|exists:request_fors,id',
            'notes' => 'nullable|string',
            'status_id' => 'required|exists:statuses,id',
            'total_amount' => 'nullable|numeric',
            'order_at' => 'nullable|date',
            'date_needed' => 'required|date',
            'entries' => 'required|array', // Ensure entries is an array

            // Validation rules for each order entry
            'entries.*.quantity' => 'required|integer',
            'entries.*.unit_id' => 'required|exists:units,id',
            'entries.*.description' => 'required|string',
            'entries.*.uniCost' => 'required|numeric',
            'entries.*.amount' => 'required|numeric',
            'entries.*.remarks' => 'nullable|string',
        ];
    }
}
