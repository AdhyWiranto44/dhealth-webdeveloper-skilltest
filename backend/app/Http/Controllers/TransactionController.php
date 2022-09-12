<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $transaction = DB::table('obat_resep')
      ->join('obatalkes_m', 'obat_resep.obatalkes_id', '=', 'obatalkes_m.obatalkes_id')
      ->join('signa_m', 'obat_resep.signa_id', '=', 'signa_m.signa_id')
      ->join('resep', 'obat_resep.resep_id', '=', 'resep.resep_id')
      ->leftjoin('racikan', 'obat_resep.racikan_id', '=', 'racikan.racikan_id')
      ->select("resep.resep_kode as resep_kode", "racikan.racikan_nama as racikan_nama", "obat_resep.racikan_id as racikan_id", "obatalkes_m.obatalkes_nama as obatalkes_nama", "signa_m.signa_nama as signa_nama", "obat_resep.qty as qty")
      ->get();

    $response = new ResponseData();

    if (sizeof($transaction) < 1) {
      $response->getFailedResponse();
      return response()->json($response->response, 404);
    }

    $response->getSuccessResponse($transaction);
    return response()->json($response->response, 200);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $transaction = json_decode(json_encode($request->all()));

    // create new resep
    $lastResep = DB::table("resep")->orderBy("resep_id", "desc")->limit(1)->get();

    if (sizeof($lastResep) > 0) {
      $lastResepId = $lastResep[0]->resep_id;
      $lastResepId += 1;
      DB::table("resep")->insert([
        "resep_kode" => "RES$lastResepId"
      ]);
    } else {
      DB::table("resep")->insert([
        "resep_kode" => "RES1"
      ]);
    }
    $lastResepData = DB::table("resep")->orderBy("resep_id", "desc")->limit(1)->get()[0];

    foreach ($transaction as $trans) {
      if (key($trans) == "racikan") {
        $isRacikanFound = DB::table("racikan")->where("racikan_nama", $trans->racikan->nama_racikan)->get();
        if (sizeof($isRacikanFound) < 1) {
          DB::table("racikan")->insert(["racikan_nama" => $trans->racikan->nama_racikan]);
        }
        $lastRacikanData = DB::table("racikan")->orderBy("racikan_id", "desc")->limit(1)->get()[0];

        foreach ($trans->racikan->obatalkes as $obatRacikan) {
          $racikan = [
            "resep_id" => $lastResepData->resep_id,
            "racikan_id" => $lastRacikanData->racikan_id,
            "obatalkes_id" => $obatRacikan->obatalkes_id,
            "signa_id" => $obatRacikan->signa_id,
            "qty" => $obatRacikan->qty
          ];
          DB::table("obat_resep")->insert($racikan);
        }
      } else if (key($trans) == "non_racikan") {
        $nonRacikan = [
          "resep_id" => $lastResepData->resep_id,
          "racikan_id" => 0,
          "obatalkes_id" => $trans->non_racikan->obatalkes_id,
          "signa_id" => $trans->non_racikan->signa_id,
          "qty" => $trans->non_racikan->qty
        ];
        DB::table("obat_resep")->insert($nonRacikan);
      }
    }

    return response()->json([
      "success" => true,
      "message" => "Sukses menambahkan data."
    ], 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
