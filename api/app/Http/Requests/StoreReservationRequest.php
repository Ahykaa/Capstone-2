<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'facilities' => 'required|string',
            'reserv_at' => 'nullable|date',
            'time_at' => 'nullable|date_format:H:i:s',
            'company_name' => 'required|string',
            'representative' => 'required|string',
            'address' => 'required|string',
            'activity' => 'required|string',
            'no_participants' => 'required|numeric',
            'event_date' => 'required|date',
            'event_time' => 'nullable|date_format:H:i:s',
            'ownItems' => 'nullable|string',
            'entries' => 'required|array', // Ensure entries is an array

            // Validation rules for each reservation entry
            'entries.*.particulars' => 'required|string',
            'entries.*.quantity' => 'required|integer',
            'entries.*.rate' => 'required|numeric',
            'entries.*.amount' => 'required|numeric',
        ];
    }
}
