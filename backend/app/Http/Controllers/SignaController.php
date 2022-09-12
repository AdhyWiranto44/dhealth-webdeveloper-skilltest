<?php

namespace App\Http\Controllers;

use App\Models\Signa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\ResponseData;

class SignaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $signa = DB::table("signa_m")->get()->all();
    $response = new ResponseData();

    if (sizeof($signa) < 1) {
      $response->getFailedResponse();
      return response()->json($response->response, 404);
    }

    $response->getSuccessResponse($signa);
    return response()->json($response->response, 200);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Signa  $signa
   * @return \Illuminate\Http\Response
   */
  public function show(Signa $signa)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Signa  $signa
   * @return \Illuminate\Http\Response
   */
  public function edit(Signa $signa)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Signa  $signa
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Signa $signa)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Signa  $signa
   * @return \Illuminate\Http\Response
   */
  public function destroy(Signa $signa)
  {
    //
  }
}
