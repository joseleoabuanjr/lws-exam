<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;  // Importing Laravel's Password rule

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool  // Return type hint indicating the method's return type
     */
    public function authorize(): bool
    {
        return true;  // This method returns true, meaning all users are authorized to make this request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>  // Return type hint indicating the method's return type
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],  // 'name' field is required and should be a string
            'email' => ['required', 'email', 'unique:users,email'],  // 'email' field is required, should be a valid email format, and should be unique in the 'users' table
            'password' => [
                'required',  // 'password' field is required
                Password::min(8)  // Password should have a minimum length of 8 characters
                    ->letters()    // Password should contain letters
                    ->numbers(),   // Password should contain numbers
                'confirmed'     // 'password' field should have a corresponding 'password_confirmation' field with the same value
            ]
        ];
    }
}
