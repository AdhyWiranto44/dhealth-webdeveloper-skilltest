<?php

namespace App\Helpers;

class ResponseData
{
  public function __construct()
  {
    $this->response = [
      "success" => false,
      "message" => "Data tidak ditemukan.",
      "data" => []
    ];
  }

  public function getFailedResponse()
  {
    return $this->response;
  }

  public function getSuccessResponse($data)
  {
    $this->response["success"] = true;
    $this->response["message"] = "Data ditemukan.";
    $this->response["data"] = $data;

    return $this->response;
  }
}
