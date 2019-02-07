<?php

include 'HelperClass.php';

class Controller {

    private $requestHandler;

    function __construct() {
        $this->requestHandler = new Helper();
    }

    public function search($title, $page = "1") {
        $responsedata["code"] = 200;
        $responsedata["result"] = [];
        $data["s"] = $title;
        $data["page"] = $page;
        $result = $this->requestHandler->httpRequest($data); //request for result
        if ($result === false) {//if curl fail to request then throw 500 error
            $responsedata = $this->status_500();
        } else {
            $output = json_decode($result, true); //decode json response to php array
            if ($output["Response"] === "False") {//check if response is valid ie true or false
                if ($output["Error"] == "Movie not found!") {
                    return $this->status_404(); //return 404 of no result found
                }
                return $this->status_500(); //return 500 in any other error
            } else {
                $responsedata["result"] = $output;
            }
        }
        return json_encode($responsedata);
    }

    public function movie($movieid) {
        $responsedata["code"] = 200;
        $responsedata["result"] = [];
        $data["i"] = $movieid;
        $result = $this->requestHandler->httpRequest($data); //request for result
        if ($result === false) {//if curl fail to request then throw 500 error
            $responsedata = $this->status_500();
        } else {
            $output = json_decode($result, true); //decode json response to php array
            if ($output["Response"] === "False") {//check if response is valid ie true or false
                if ($output["Error"] == "Incorrect OMDB ID.") {
                    return $this->status_404(); //return 404 of no result found
                }
                return $this->status_500(); //return 500 in any other error
            } else {
                $responsedata["result"] = $output;
            }
        }
        return json_encode($responsedata);
    }

    public function status_404() {
       // header("HTTP/1.0 404 Not Found");
        $result = ["code" => 404, "result" => "NO RESULT FOUND"];
        return json_encode($result);
    }

    public function status_500() {
       // header("HTTP/1.0 500 Internal Server Error");
        $result = ["code" => 500, "result" => "Internal Server Error"];
        return json_encode($result);
    }

}
