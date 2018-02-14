<?php

$word = new COM("word.application") or die("Unable to instantiate Word"); 

$word->Visible = 1; 

$word->Documents->Open("test.docx");

echo "Documents open";

?>
