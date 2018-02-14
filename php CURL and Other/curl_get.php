<?php

# call the API and decode the response


#php get curl .... 

$url = "https://rallycoding.herokuapp.com/api/music_albums";

$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$rsp = curl_exec($ch); 
curl_close($ch);


echo '<pre>';
print_r($rsp);
echo '</pre>';
?>
