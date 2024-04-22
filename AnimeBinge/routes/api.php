<?php

use App\Http\Controllers\Api\AnimeController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Protected routes that require authentication using Sanctum
Route::middleware('auth:sanctum')->group(function() {
    
    // Route to get user details for the authenticated user
    Route::get('/home', function (Request $request) {
        return $request->user();
    });
    
    // Route to log out the authenticated user
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Public routes

// Route to get all anime entries (Note: Corrected to use AnimeController)
Route::get('/animes', [AnimeController::class, 'index']);

// RESTful API resource route for anime CRUD operations
Route::apiResource('/animes', AnimeController::class);

// Route for user login
Route::post('/login', [AuthController::class, 'login']);

// Route for user signup
Route::post('/signup', [AuthController::class, 'signup']);