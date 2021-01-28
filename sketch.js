
var dataBase, balloon, position, balloon_img1, balloon_img2

function preload() 
{
  bg = loadImage("Hot Air Ballon-01.png")
  balloon_img1 = loadAnimation("Hot Air Ballon-02.png")
  balloon_img2 = loadAnimation("Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png","Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-02.png")

  
}

function setup() {
  createCanvas(1500,700);
  dataBase = firebase.database()
  balloon=createSprite(250, 250, 50, 50);
  balloon.addAnimation("static",balloon_img1)
  balloon.scale = 0.5

  var balloonPosition = dataBase.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError)
  
}

function draw() 
{
  background(bg); 
    
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
    balloon.addAnimation("balloon",balloon_img2)
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
    balloon.addAnimation("balloon",balloon_img2)
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("balloon",balloon_img2)
    balloon.scale = balloon.scale - 0.01
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.addAnimation("balloon",balloon_img2)
    balloon.scale = balloon.scale + 0.01
  }
  
  drawSprites();
}

function writePosition(x,y){
  dataBase.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}