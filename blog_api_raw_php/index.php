<?php
    
    $con = mysqli_connect("localhost","root","","test");

    if(!$con){ die;}

    else {

    if ($_SERVER["REQUEST_METHOD"] == "GET"){

    $request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

        // Route it up!
        switch ($request_uri[0]) {
            // Home page
            case '/':
                require './home.php';
                break;
            // About page
            case '/about':
                require './about.php';
                break;
            // Everything else
            default:
                header('HTTP/1.0 404 Not Found');
                require './404.php';
                break;

        }
      }

      if ($_SERVER["REQUEST_METHOD"] == "POST"){

        header('Content-Type: application/json');
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);

        $id =  $obj["id"];
        $title =  $obj["title"];
        $body =  $obj["body"];
        $author_id =  $obj["author_id"];
        $category =  $obj["category"];

        $sql = "INSERT INTO post ( id, title , body, author_id, category) VALUES ( '$id', '$title' ,'$body' ,'$author_id', '$category')";

        if ($con->query($sql) === TRUE) {
            
            echo "New record created successfully";

        } else {

            echo "Error: " . $sql . "<br>" . $con->error;
        }

       }



       if ($_SERVER["REQUEST_METHOD"] == "PUT"){

        header('Content-Type: application/json');
        $json = file_get_contents('php://input');
        echo "PUT REQUEST";

       }

       if ($_SERVER["REQUEST_METHOD"] == "DELETE"){

        header('Content-Type: application/json');
        $json = file_get_contents('php://input');
        echo "DELETE REQUEST";
        
       }

     }

?>
