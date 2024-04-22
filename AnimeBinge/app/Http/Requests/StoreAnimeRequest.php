<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnimeRequest extends FormRequest
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
            'name' => 'required',         // 'name' field is required
            'rating' => 'required',       // 'rating' field is required
            'category' => 'required',     // 'category' field is required
            'description' => 'required',  // 'description' field is required
            'image' => 'nullable|mimes:png,jpg,jpeg' // 'image' field is optional, but if provided, should be a PNG, JPG, or JPEG file
        ];
    }
}