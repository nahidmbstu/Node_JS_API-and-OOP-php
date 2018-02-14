<?php

# call the API and decode the response
# in rest API ...

# If your post data is in another format (e.g. JSON or XML, you can do something like this:

# $post = file_get_contents('php://input');

#php post curl .... 

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://www.example.com/tester.phtml");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "postvar1=value1&postvar2=value2&postvar3=value3");


// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);


?>
