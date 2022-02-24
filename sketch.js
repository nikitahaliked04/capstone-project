var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group();
}

function draw()
{
  background(0);
  drawSprites();
  text("Score : " + score, 0, 15);
  if (gameState == "play")
   {
     if(keyDown("space") && frog.position.y>20)
     {
       frog.position.y -=5;
     }
     if(keyWentUp("space"))
     {
      frog.velocityY=0.8;
     }
     if(keyDown("left"))
     {
       frog.x-=7
     }
   
   if(keyDown("right"))
     {
       frog.x+=7
     }

     if(climbersGroup.isTouching(frog)) {
      frog.velocityY = 0;  
    }
    if(coinGroup.isTouching(frog)) 
    {
       score=score+1;
      }
     ocean.setVelocity(0,-4);
     
     spawnCoin();
     if(frog.position.y>500)
     {
      gameState = "end";
     }
     
   }
  
  if (gameState == "end"){
    text("Game Over", 150, 150);
    ocean.setVelocity(0,0);
    coinGroup.destroy();
    climbersGroup.destroy();
  }
  if(ocean.position.y<150)
  {
    ocean.position.y=300;
  }
 
}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280=== 0) {
    //make the x position of the coin and climber the same
      coin = createSprite(100,Math.round(random(10,440)),50,50);
      coin.addImage("coin",coinImg);
      coin.scale =0.1;
      coin.lifetime =160;
      coinGroup.add(coin);
      climber = createSprite(100,Math.round(random(10,440)),50,50);
      climber.addImage("climber",climberImg);
      climber.scale=.2;
      climber.lifetime=160;
      climbersGroup.add(climber);

  }
}