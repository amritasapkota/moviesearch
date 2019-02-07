<?php

include 'ControllerClass.php';
header("Content-Type: application/json");

$controller = new Controller();
// if the user enter the name of the movie, it goes to this function
if (isset($_GET["name"])) {
    echo $controller->search($_GET["name"]);
    return;
}
// if the user enter the id of the movie, it goes to this function
if (isset($_GET["movieid"])) {
    echo $controller->movie($_GET["movieid"]);
    return;
}

echo $controller->status_500();
return;
