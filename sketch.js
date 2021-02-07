var gameState = "FORM";
var bg, backgroundImg;
var form;
var human, human_walking;

  function preload(){
  human_walking = loadAnimation("../images/walking/man_walking1.png", "../images/walking/man_walking2.png", "../images/walking/man_walking3.png", "../images/walking/man_walking4.gif", "../images/walking/man_walking5.gif", "../images/walking/man_walking6.png", "../images/walking/man_walking7.png", "../images/walking/man_walking8.png");

    getBackgroundImg();
  }

function setup() {
  createCanvas(displayWidth,displayHeight);
 
  if(gameState === "FORM"){
    form = new Form();
  }

  localStorage.setItem("name", document.getElementById("play").value); 
}

function draw() {
  if(backgroundImg)
  background(backgroundImg);

  if(gameState === "PLAY"){
    text(localStorage.getItem("name"), 100,100);
  }

   if(gameState === "INSTRUCTIONS"){
    var crossButton = createButton("X");
    crossButton.position(displayWidth - 40,displayHeight / 2 - 380);
    crossButton.style("background-color:transparent; font-weight:bold;");
    crossButton.style("border:none; outline:none; color:red;");
    crossButton.style("font-size:40px; cursor:pointer; user-select:none;");
    crossButton.mousePressed(() => {
      crossButton.hide();
      instructions.hide();
      form.input.show();
      form.button.show();
      form.label.show();
      form.title.show();
      form.instructionButton.show();
      gameState = "FORM";
    });

    var instructions = createElement("h5");
    instructions.html("dhfkla;sdjfl;aksdf");
    instructions.position(200,200);

  } 

  form.display();

  drawSprites();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  if(hour >= 06 && hour <= 19){
    bg = "images/background/daytime.PNG";
  }
  else{ 
    bg = "images/background/nighttime.PNG";
    form.title.style("color", "white");
    form.label.style("color", "white");
    form.input.style("background-color", "#999");
    form.input.style("color", "black");
  }

  backgroundImg = loadImage(bg);
}