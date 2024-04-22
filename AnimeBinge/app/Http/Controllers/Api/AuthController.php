<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;    // Importing LoginRequest form request
use App\Http\Requests\SignupRequest;   // Importing SignupRequest form request
use App\Models\User;                   // Importing User model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;    // Importing Auth facade for authentication

class AuthController extends Controller
{
    /**
     * Handle user signup.
     *
     * @param  \App\Http\Requests\SignupRequest  $request  // Injecting SignupRequest form request
     * @return \Illuminate\Http\Response
     */
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();  // Validate the incoming request data

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],      // Assigning name from request data
            'email' => $data['email'],    // Assigning email from request data
            'password' => bcrypt($data['password']),  // Hashing the password
        ]);

        $token = $user->createToken('main')->plainTextToken;  // Creating a new token for the user

        return response(compact('user', 'token'));  // Returning user and token in response
    }

    /**
     * Handle user login.
     *
     * @param  \App\Http\Requests\LoginRequest  $request  // Injecting LoginRequest form request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();  // Validate the incoming request data

        if (!Auth::attempt($credentials)) {  // Attempt to authenticate user
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();  // Retrieve authenticated user
        $token = $user->createToken('main')->plainTextToken;  // Creating a new token for the user

        return response(compact('user', 'token'));  // Returning user and token in response
    }

    /**
     * Handle user logout.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = $request->user();  // Retrieve authenticated user
        $user->currentAccessToken()->delete();  // Delete the current access token

        return response('', 204);  // Return 204 (No Content) response
    }
}