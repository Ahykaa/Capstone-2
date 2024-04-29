<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'required|string|min:3',
            'username' => 'required|string|min:3|unique:users',
            'department_id' => 'required|exists:departments,id',
            'position' => 'nullable|string',
            'role' => 'required|string|in:staff,admin,subadmin,subadmin1,subadmin2,subadmin3,subadmin4,superadmin,headadmin',
        ];
    }
}
