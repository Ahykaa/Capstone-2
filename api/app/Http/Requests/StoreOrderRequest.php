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
            'quantity' => 'required|integer',
            'unit_id' => 'required|exists:units,id',
            'description' => 'required|string',
            'uniCost' => 'required|numeric',
            'amount' => 'required|numeric',
            'remarks' => 'nullable|string',
            'order_at' => 'nullable|date',
            'date_needed' => 'required|date',
        ];
    }
}
