<?php
  $dir = new DirectoryIterator("./sounds");
  foreach ($dir as $sound){
    if(!$sound->isDot()){
      $file = $sound->getFileName();
      $fileStr = "\"".$file."\"";
      echo "<audio id='" . $file .  "'src='./sounds/" . $file . "'></audio>
            <button class='button' onclick='play(". $fileStr . ")'>". substr($file ,0, -4) ."</button>";
    }
  };
?>
