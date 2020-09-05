var bananaImg, obstImg, obstGroup, bananaGroup, backg, score, ground;
var backImg, player_running
var monkey;


function preload(){
  
  backImg = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  obstImg = loadImage("stone.png");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
}


function setup(){
  
  backg = createSprite(200, 200, 20, 20);
  backg.addImage("background", backImg);
  backg.velocityX = -5;
  
  ground = createSprite(200, 395, 400, 10);
  ground.visible = false;
  
  monkey = createSprite(75, 200);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.13;
  
  obstGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
  
}





function draw(){
  background(225);
  
  if (backg.x === 0){
    backg.x = 300;
  }
  
  bananas();
  obstacles();
  
  
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(score >= 20){
   if (keyDown("space") && monkey.y >= 325) {
    monkey.velocityY = -10;
   }
  }
  
  if (score<=19){
   if (keyDown("space") && monkey.y >= 345) {
    monkey.velocityY = -10;
   }
  }
  console.log(monkey.y);
  
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if (monkey.isTouching(obstGroup)){
    obstGroup.destroyEach();
    score = 0;
  }
  
  switch(score){
      
    case 10: monkey.scale = 0.15;
      break;
    case 20: monkey.scale = 0.17;
      break;
    case 30: monkey.scale = 0.19;
      break;
    case 40: monkey.scale = 0.21;
      break;
    default: break;
  }
  
  monkey.collide(ground);
  drawSprites();
  
  
  fill("white");
  text("Score: " + score, 20, 20);
}

function bananas(){
  if (World.frameCount % 120 === 0){
    var banana = createSprite(400, Math.round(random(250, 315)));
    banana.addAnimation("Banana", bananaImg);
    banana.velocityX = backg.velocityX;
    banana.scale = 0.05;
    banana.lifetime = 400/3;
    bananaGroup.add(banana);
    banana.setCollider("rectangle", 0, 0, 1000, 500);
  }
}

function obstacles(){
  if (World.frameCount % 140 === 0){
    var obstacle = createSprite(400, 380);
    obstacle.velocityX = backg.velocityX;
    obstacle.addAnimation("Stone", obstImg);
    obstacle.scale = 0.1;
    obstGroup.add(obstacle);
  }
}