var bg,bridge;
var mc,boy;
var car1,car2,car3,c1,c2,c3;
var car;
var coinG;
var score = 0;
var life = 5;
var gameOver,gameOverImg;
var gameoverSound,coinSound;

function preload(){
  
  bg=loadImage("bridge.jpg");
  mc=loadAnimation("boy.gif");
  c1=loadImage("redc.png");
  c2=loadImage("blueC.png");
  c3=loadImage("greenC.png");
  coinG=loadAnimation("coin.gif");
  gameOverImg=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3")
  coinSound= loadSound("knifeSwoosh.mp3")
  
  
}


function setup(){
  createCanvas(600,400);
  
  bridge = createSprite(400,65,1000,400);
  bridge.addImage("background",bg);
  bridge.scale=2;
  bridge.velocityX=-4;
  
  boy = createSprite(170,300,20,20);
  boy.addAnimation("Mc",mc);
  boy.scale=0.3;
 //boy.debug=true;
  boy.setCollider("rectangle",0,0,50,350)
  
  invisibleGround=createSprite(40,380,400,10);
  invisibleGround.visible=false;
  
  /*car2=createSprite(300,300,20,20);
  car2.addImage("red",c2);
  car2.scale=0.1;*/
  
  
  
  coinsGroup = new Group();
  carsGroup = new Group();
  
}

function draw(){
  background("black");
  
  
  
  if(bridge.x<0){
    bridge.x=bridge.width/2;
    
  }
  
  if(keyDown("space")&& boy.y>=150){
    boy.velocityY=-10;
  }
  
  boy.velocityY+=1;
  boy.collide(invisibleGround);
  
  
  
  Cars();
  Coins();
  
  if(boy.isTouching(coinsGroup)){
    coinsGroup.destroyEach()
    score = score +1;
    coinSound.play();
  }
  
  if(boy.isTouching(carsGroup)){
    carsGroup.destroyEach();
    life = life -1; 
    gameoverSound.play();
  }
  
  if(life===0){
    carsGroup.destroyEach();
    coinsGroup.destroyEach();
    bridge.velocityX=0;
    boy.destroy();
    gameOver= createSprite(300,200,50,50);
    gameOver.addImage("a",gameOverImg);
  }
  
  
  
  drawSprites();
  
  fill("black");
  text("SCORE = "+score,500,50);
  
  fill("black");
  text("LIFE = "+life,20,50);
  
  
}

function Cars() {
  
  if(frameCount%200 === 0){
    car = createSprite(600,300,40,20);
    car.velocityX=-6;
    var rand=Math.round(random(1,3))
    if(rand===1){
      car.addImage(c1);      
    }
    else if(rand===2){
      car.addImage(c2);      
    }
    else 
    {car.addImage(c3)
    }
    
    car.scale=0.3;
    
    carsGroup.add(car);
    
  }
   
  
  
}

function Coins() {
  
  if(frameCount%200 === 0){
    coin=createSprite(600,100,20,20);
    coin.velocityX = -3;
    coin.y=Math.round(random(100,150))
    coin.addAnimation("coin",coinG);
    coin.scale=0.15;
    coinsGroup.add(coin);
    
    
    
    
    
  }
  
  
}