<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Http\Requests\StoreAnimeRequest;    // Importing StoreAnimeRequest form request
use App\Http\Requests\UpdateAnimeRequest;    // Importing UpdateAnimeRequest form request
use App\Http\Resources\AnimeResource;        // Importing AnimeResource for resource transformation

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // Fetch all anime and return as a collection of resources
        return AnimeResource::collection(Anime::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreAnimeRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAnimeRequest $request)
    {
        $data = $request->validated();  // Validate the incoming request data

        // Create a new anime record with the validated data
        $anime = Anime::create($data);

        // Return the newly created anime resource with a 201 status code
        return response(new AnimeResource($anime), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Anime $anime
     * @return \Illuminate\Http\Response
     */
    public function show(Anime $anime)
    {
        // Return the specified anime resource
        return new AnimeResource($anime);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateAnimeRequest $request
     * @param \App\Models\Anime $anime
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAnimeRequest $request, Anime $anime)
    {
        $data = $request->validated();  // Validate the incoming request data

        // Update the anime record with the validated data
        $anime->update($data);

        // Return the updated anime resource
        return new AnimeResource($anime);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Anime $anime
     * @return \Illuminate\Http\Response
     */
    public function destroy(Anime $anime)
    {
        // Delete the specified anime record
        $anime->delete();

        // Return a 204 No Content response
        return response("", 204);
    }
}