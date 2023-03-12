<?php

/**
 * https://www.php.net/manual/en/curl.examples-basic.php
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

// we want the get request to be handled here
// GET http://localhost:8000/php/public/index.php
if($method == 'GET') {
  $url = "https://jsonplaceholder.typicode.com/comments?postId=3";
  $response = file_get_contents($url);
  echo $response;
}
