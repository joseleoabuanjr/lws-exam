<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimeResource extends JsonResource
{
    public static $wrap = false; // Disabling data wrapping for this resource

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>       // Return type hint indicating the method's return type
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,           // Anime ID
            'name' => $this->name,       // Anime name
            'rating' => $this->rating,   // Anime rating
            'category' => $this->category, // Anime category
            'description' => $this->description, // Anime description
            'image' => $this->image,     // Anime image URL or path
        ];
    }
}
