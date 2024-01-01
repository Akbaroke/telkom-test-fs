<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class HistoryController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $history = History::all();
        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Show all data successfully.',
            'data' => $history
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $history = History::create([
            'id_user' => $user->id,
            'title' => $request->title,
        ]);
        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Create successfully.',
            'data' => $history
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\History  $history
     * @return \Illuminate\Http\Response
     */
    public function show(History $history)
    {

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Show one data successfully.',
            'data' => $history
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\History  $history
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, History $history)
    {
        $history->id_user = $request->id_user;
        $history->title = $request->title;

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Update data successfully.',
            'data' => $history
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\History  $history
     * @return \Illuminate\Http\Response
     */
    public function destroy(History $history)
    {
        $history->delete();
        return response()->json([
            'message' => 'History deleted successfully'
        ], 204);
    }
}
