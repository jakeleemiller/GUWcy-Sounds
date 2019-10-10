var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("scoreboard").innerHTML = xhttp.responseText;
    };
}

xhttp.open("GET", "./score.txt", true);
xhttp.send();

function updateScore(scor) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

            }
        };
        xmlhttp.open("GET", "score.php?q=" + scor, true);
        xmlhttp.send();
    }

function play(x){
  var sound = document.getElementById(x).cloneNode(true);
  sound.load();
  sound.play();
}

var canvas = document.getElementById('plush');
var gc = canvas.getContext('2d');
gc.font = "24px arial";
var frame = [];
var frameRev = [];
var x = 0;
var y = 250;
var vx = 0;
var vy = 0;
var left = false;
var right = false;
var jump = false;
var up = 0;
var dir = false;
var tag = false;
var fnum = 0;
var js = 0;
var pFrame = new Image();
var bArray = [];
var bImage = new Image();
bImage.src = "./bubble/bubble.png";
var s = document.getElementById("scoreboard");
var score = s.innerHTML;
var bubInt;
var i = 0;

document.onload = gameLoop();


function gameLoop(){
  loadFrames();
  draw();
};

function makeBubbles(){
  var bubInt = setInterval(function(){var b = new Bubble((Math.random()*canvas.width),400,(Math.random()*10));bArray.push(b);}, 2000);
}

function stopBubbles(){
  clearInterval(bubInt);
}

window.addEventListener("focus",makeBubbles(),true);
window.addEventListener("blur",stopBubbles(),true);

function loadFrames(){
  for(var i = 0; i <= 22 ; i++){
    var image = new Image();
    if ( i < 10 ){
      image.src = "./plushSide/plushSide_0" + i + ".png";
    } else {
      image.src = "./plushSide/plushSide_" + i + ".png";
    };
    frame.push(image);
  }

  for(var i = 0; i <= 22 ; i++){
    var image = new Image();
    if ( i < 10 ){
      image.src = "./plushSideRev/plushSide_0" + i + ".png";
    } else {
      image.src = "./plushSideRev/plushSide_" + i + ".png";
    };
    frameRev.push(image);
  }
};

function Bubble(x,y,z){
  this.xStart = x;
  this.yStart = y;
  this.speed = z;
  this.collision = false;
  i++;
  console.log(i);
}

Bubble.prototype.checkCollision = function(){
  if (this.xStart >= x && this.xStart + 25 <= x + 92 && this.yStart >= y && this.yStart + 25 <= y + 196 ) {
      this.collision = true;
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  switch(e.keyCode){
    case 37:
      left = true;
      break;
    case 39:
      right = true;
      break;
    case 32:
      jump = true;
      e.preventDefault();
      break;
  };
};

function keyUpHandler(e){
  fnum = 0;
  vx = 0 ;
  switch(e.keyCode){
    case 37:
      left = false;
      break;
    case 39:
     right = false;
     break;
  }
};

function addVel(){
  x += vx * 2;
  y = 200 - js;
}

function jumpCalc(){
  if (dir == false){
    pFrame = frameRev[22];
  } else if (dir == true) {
    pFrame = frame[22];
  }
  if (tag == false){
    js += 10;
  } else if (tag == true) {
    js -= 10;
  }
  if ( js == 0){
    jump = false;
  }
}

function draw(){

  vx = 0;

  if (left == true && x > 0){
    vx = -7;
    dir = true;
    right = false;
      if (fnum < 21){
        fnum += 1;
      } else {
        fnum = 0;
      };
  };

  if (right == true && x < (1000 - 87)){
    vx = 7;
    dir = false;
    left = false;
      if (fnum < 21){
        fnum += 1;
      } else {
        fnum = 0;
      };
  };

  if (dir == false && vx != 0){
    pFrame = frame[fnum];
  } else if (dir == true && vx != 0) {
    pFrame = frameRev[fnum];
  } else {
    if (dir == false){
      pFrame = frame[0];
    } else {
      pFrame = frameRev[0];
    }
  };

  if (jump == true) {
    jumpCalc();
  }

  if (js == 150){
    tag = true;
  } else if (js == 0){
    tag = false;
  };


  addVel();
  gc.clearRect(0,0,1000,500);
  gc.drawImage(pFrame,x,y);
  for (var i = 0; i < bArray.length; i ++){
    if (bArray[i].collision == false){
      bArray[i].yStart -= bArray[i].speed ;
      gc.drawImage(bImage, bArray[i].xStart, bArray[i].yStart);
    }
  }
  for (var i = 0; i < bArray.length; i ++){
    bArray[i].checkCollision();
    if (bArray[i].collision == true){
      bArray.splice(i,1);
      var t = parseInt(score) + 1 ;
      score = t;
    } else if(bArray[i].yStart < 0){
     bArray.splice(i,1);
   }
  }
  s.innerHTML = score;
  gc.fillText(score, canvas.width - 100, canvas.height/5);
  window.requestAnimationFrame(draw);
  var t = new Date().getTime();
  if(t % 5 == 0){
    updateScore(score);
  }
}
