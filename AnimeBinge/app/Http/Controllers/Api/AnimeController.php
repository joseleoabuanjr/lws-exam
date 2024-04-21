<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Http\Requests\StoreAnimeRequest;
use App\Http\Requests\UpdateAnimeRequest;
use App\Http\Resources\AnimeResource;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
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
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $anime = Anime::create($data);

        return response(new AnimeResource($anime) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Anime $anime
     * @return \Illuminate\Http\Response
     */
    public function show(Anime $anime)
    {
        return new AnimeResource($anime);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\Anime $anime
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAnimeRequest $request, Anime $anime)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $anime->update($data);

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
        $anime->delete();

        return response("", 204);
    }
}
