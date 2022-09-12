<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseData;
use App\Models\Obatalkes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObatalkesController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $obatalkes = DB::table("obatalkes_m")->get()->all();
    $response = new ResponseData();

    if (sizeof($obatalkes) < 1) {
      $response->getFailedResponse();
      return response()->json($response->response, 404);
    }

    $response->getSuccessResponse($obatalkes);
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
   * @param  \App\Models\Obatalkes  $obatalkes
   * @return \Illuminate\Http\Response
   */
  public function show(Obatalkes $obatalkes)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Obatalkes  $obatalkes
   * @return \Illuminate\Http\Response
   */
  public function edit(Obatalkes $obatalkes)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Obatalkes  $obatalkes
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Obatalkes $obatalkes)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Obatalkes  $obatalkes
   * @return \Illuminate\Http\Response
   */
  public function destroy(Obatalkes $obatalkes)
  {
    //
  }
}
