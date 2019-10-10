<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="https://nr391.infusionsoft.com/app/webTracking/getTrackingCode"></script>

  <script defer src="soundboard.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div class="header">
    <h1 class="pageTitle">Guwcy Soundz</h1>
  </div>
  <div class="board">
  <?php include 'board.php'; ?>
  </div>
  <?php $score = fopen("./score.txt","r") or die("Unable to Open File");
        $scoreboard = fread($score,filesize("./score.txt"));
        fclose($score);
  ?>
  <p id="scoreboard" style="display:none"><?php echo $scoreboard; ?></p>
  <canvas id="plush" width="1000" height="500">Your Browser Sucks</canvas>
</body>
</html>
