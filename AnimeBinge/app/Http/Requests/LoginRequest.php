<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool  // Return type hint indicating the method's return type
     */
    public function authorize(): bool
    {
        return true; // This method returns true, meaning all users are authorized to make this request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>  // Return type hint indicating the method's return type
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|string|exists:users,email',  // 'email' field is required, should be a valid email format, should be a string, and should exist in the 'users' table
            'password' => [                                         
                'required',                                          // 'password' field is required
            ]
        ];
    }
}
