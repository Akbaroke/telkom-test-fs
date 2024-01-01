<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|min:3', // Name should be at least 3 characters
            'email' => 'required|email|unique:users', // Email should be a valid format and unique
            'password' => 'required|min:8', // Password should be at least 8 characters
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $validationMessage = '';

            foreach ($errors->all() as $error) {
                $validationMessage .= $error . ' ';
            }

            return response()->json([
                'code' => 422,
                'error' => true,
                'message' => 'Validation failed. ' . $validationMessage,
            ], 422);
        }

        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password')),
        ]);

        if (!$user) {
            return response()->json([
                'code' => 500,
                'error' => true,
                'message' => 'Failed to register. Please try again later.',
            ], 500);
        }

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Registered successfully.',
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->first();
            $isEmailCorrect = $user ? true : false;
            $isPasswordCorrect = $user && Hash::check($credentials['password'], $user->password);

            $errorMessage = '';
            if (!$isEmailCorrect) {
                $errorMessage .= 'Invalid email.';
            } elseif (!$isPasswordCorrect) {
                $errorMessage .= 'Invalid password.';
            } else {
                $errorMessage .= 'Invalid email or password.';
            }

            return response()->json([
                'code' => 401,
                'success' => false,
                'message' => 'Login failed, ' . $errorMessage,
            ], 401);
        }

        $tokenData = $this->respondWithToken($token);
        $user = User::where('email', $credentials['email'])->first();
        $expiresIn = $tokenData->original['expires_in'];
        $expirationTime = now()->addSeconds($expiresIn);

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Login success.',
            'data' => [
                'name' => $user['name'],
                'email' => $user['email'],
                'token' => $tokenData->original['access_token'],
                'expired_token' => $expirationTime,
            ],
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'code' => 401,
                'error' => true,
                'message' => 'Unauthorized: User not authenticated.',
            ], 401);
        }

        return response()->json([
            'code' => 200,
            'error' => false,
            'message' => 'User details retrieved successfully.',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Successfully logged out.'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $refreshData = $this->respondWithToken(auth()->refresh());
        $expiresIn = $refreshData->original['expires_in'];
        $expirationTime = now()->addSeconds($expiresIn);

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Refresh success.',
            'data' => [
                'token' => $refreshData->original['access_token'],
                'expired_token' => $expirationTime,
            ],
        ]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
