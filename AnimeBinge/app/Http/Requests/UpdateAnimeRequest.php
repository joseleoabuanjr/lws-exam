<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimeRequest extends FormRequest
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
            'name' => 'required|string',         // 'name' field is required and should be a string
            'rating' => 'required|numeric|min:0|max:5',  // 'rating' field is required, should be numeric, and should be between 0 and 5
            'category' => 'required|string|json', // 'category' field is required, should be a string, and should be a valid JSON string
            'description' => 'required|string',   // 'description' field is required and should be a string
            'image' => 'nullable|mimes:png,jpg,jpeg' // 'image' field is optional, but if provided, should be a PNG, JPG, or JPEG file
        ];
    }
}
