<?php


class Helper {
// using the omdbapi here
    const api_url = "http://www.omdbapi.com/?apikey=2320d249";

    public function httpRequest($data) {
        $request = self::api_url;
        foreach ($data as $key => $da) {
            $request .= "&$key=$da";
        }
        $flag = FALSE;
        $ch = curl_init(); //initilizing curl
        curl_setopt($ch, CURLOPT_URL, $request); //setting request url to curl
        curl_setopt($ch, CURLOPT_HEADER, false); //setting header option false; no specific header option is required
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //require return result to further process
        $contents = curl_exec($ch); //executing the request
        if (!curl_errno($ch)) {//checkinh for curl error
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); //checking http status code
            if ($httpCode == 200) {//return result only on success
                if ($contents) {
                    $flag = TRUE;
                }
            }
        }
        curl_close($ch); //close curl
        if ($flag) {
            return $contents; //return content of request
        }
        return FALSE; //default return false of any other error
    }

}
