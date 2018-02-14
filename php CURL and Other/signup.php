<?php 
$to = "nahid.mbstu.ict@gmail.com";
$email =  "nahid.mbstu.ict@gmail.com" ; 
$hash = md5(rand(0,1000));

$subject = 'Signup | Verification'; // Give the email a subject 
$message = '
 
Thanks for signing up!
Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.
 
------------------------

------------------------
 
Please click this link to activate your account:
http://localhost/email/verify.php?email='.$email.'&hash='.$hash.'
 
'; // Our message above including the link
                     
$headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
if(mail($to, $subject, $message, $headers))
{
  echo "success";
}

// Send our email
?>

 
