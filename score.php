<?php
  $q = $_REQUEST["q"];
  $score = fopen("./score.txt","w") or die("Unable to Open File");
  fwrite($score,$q);
  fclose($score);
 ?>
