var gameState=0;
var homepage, gameGarden;
var playBtn, playBtnImage;
var textBubble;
var peter,peterImage;
var emma,emmaImage;
var Gender;
var count=0;
var forestImg,forest;
var checkgameState3=false;
var flowerImg, fruitImg, FlowerGroup,FruitGroup;
var fruitCount=0, flowerCount=0;
var invisibleGround;


function preload(){
  homepage= loadImage("images/homepagegarden.png");
  playBtnImage= loadImage("images/play.png");
  textBubble= loadImage("images/text_bubble.png");
  gameGarden= loadImage("images/gamegardenstage1.jpg");
  peterImage= loadImage("images/peter1.png");
  emmaImage=loadImage("images/emma1.png");
  forestImg= loadImage("images/forest.jpg");
  fruitImg= loadImage("images/fruit.png");
  flowerImg= loadImage("images/flower.png");
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  playBtn= createSprite(displayWidth/2,displayHeight-400);
  playBtn.addImage(playBtnImage);
  FruitGroup= new Group();
  FlowerGroup= new Group();
  
}

function draw() {
  
  if(gameState===0){
    background(homepage);
    image(textBubble,displayWidth/11, displayHeight/6);
    fill("green");
    textSize(28);
    textStyle(BOLD);
    text("WELCOME TO",displayWidth/11+130,displayHeight/4+40);
    text("GARDENIA ESCAPADES",displayWidth/11+80,displayHeight/4+120);
    if(mousePressedOver(playBtn)){
      //SELECT CHARACTER
      playBtn.x= displayWidth+300;
      gameState=1;
    }
  }
  if (gameState===1 && count===0){
   
    background(gameGarden)
    image(textBubble,displayWidth/6,displayHeight/5,400,300);
    fill("white");
    textStyle(BOLD);
    textFont("arial")
    textSize(20);
    text("SELECT YOUR CHARACTER",displayWidth/6+70,displayHeight/3-40);
      peter= createSprite(displayWidth/6+70,displayHeight/3+110)
      peter.addImage(peterImage);
      emma= createSprite(displayWidth/6+250,displayHeight/3+110);
      count++;
  
      emma.addImage(emmaImage)
    
      
  }
  
  if(mousePressedOver(peter) && count >0){
    gameState=2;
    Gender= "P";
    emma.x= displayWidth+500;
  
    console.log(emma.visible);
} else if(mousePressedOver(emma) && count >0){
  gameState=2;
  Gender= "E";
  peter.x= displayWidth+500;
  
}
  
if (gameState===2){
  background(gameGarden);
 
  if (Gender==="E"){
    emma.y= displayHeight-225;
    emma.x= displayWidth/4-150;
    emma.scale=1.5;
    
  }
  else if(Gender==="P"){
    peter.y= displayHeight-225;
    peter.x= displayWidth/4-150;
    peter.scale=1.5;
    
  }
  textSize(28);
  fill("white");
  textStyle(BOLD);
  text("PRESS 'S' TO START!",480,30);
}

if(keyDown("S") && gameState===2){
  background(255);
  forest= createSprite(displayWidth/2,displayHeight/2,displayWidth*4, displayHeight);
  forest.scale=1.3;
  forest.addImage(forestImg);
  forest.x= forest.width/2;
  invisibleGround= createSprite(displayWidth/2,displayHeight-100,displayWidth,20);
  invisibleGround.visible=false;

  if (Gender==="E"){
      emma.depth= forest.depth+1;
    }
  else if(Gender==="P"){
        peter.depth= forest.depth+1;
   }  
     gameState=3;
}
if(gameState===3 && keyDown(32)){ 
  checkgameState3=true;
 }
   if(gameState===3 && checkgameState3===true){ 
    background(255); 
    forest.velocityX= -2;
     if(forest.x < displayWidth/3){
        forest.x= forest.width/2;
       } 
       emma.collide(invisibleGround);
       peter.collide(invisibleGround);
  
    
       spawnFlower();
       spawnFruit();
       if(keyDown(UP_ARROW) && Gender==="E"){
          emma.velocityY= -10;
       }
       emma.velocityY+=0.7;

       if(keyDown(UP_ARROW) && Gender==="P"){
        peter.velocityY= -10;
     }
     peter.velocityY+=0.7;


       for(var i=0; i<FruitGroup.length;i++){
         if(FruitGroup.get(i)){
            FruitGroup.get(i).destroy;
            fruitCount++;
         }
       }
   } 

   
  drawSprites();

  if(gameState===3){
    textSize(28);
    fill("white");
    textStyle(BOLD);
    text("PRESS SPACE TO COLLECT FLOWERS AND FRUITS!",390,60);
  
  }
}

function spawnFruit(){
  if (frameCount%85===0){
    var fruit= createSprite(displayWidth+20,random(displayHeight-700,displayHeight-100));
    fruit.addImage(fruitImg);
    fruit.scale= 0.2;
    FruitGroup.add(fruit);
    fruit.velocityX= -3;
    fruit.lifetime= 800;

  }
}

function spawnFlower(){
  if (frameCount%120===0){
    var flower= createSprite(displayWidth+20,random(displayHeight-700,displayHeight-100));
    flower.addImage(flowerImg);
    flower.scale= 0.2;
    FlowerGroup.add(flower);
    flower.velocityX= -3;
    flower.lifetime= 800;

  }
}
