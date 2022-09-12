<?php

use App\Http\Controllers\ObatalkesController;
use App\Http\Controllers\SignaController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/obatalkes", [ObatalkesController::class, "index"]);
Route::get("/signa", [SignaController::class, "index"]);
Route::get("/transaction", [TransactionController::class, "index"]);
Route::post("/transaction", [TransactionController::class, "store"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
