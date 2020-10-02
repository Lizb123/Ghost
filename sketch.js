var towerImg, tower; var doorImg, door, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlocksGroup;
var gameState = "play"
function preload(){ 
  towerImg = loadImage("tower.png"); 
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
} 
function setup(){ 
  createCanvas(600,600);
  tower = createSprite(300,300); 
  tower.addImage("tower",towerImg); 
  tower.velocityY = 1; 
  ghost = createSprite (260, 300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlocksGroup = new Group()

} 
function draw()
{ 
  background(0); 
  if (gameState === "play"){
  if (keyDown ("left_arrow")){
    ghost.x = ghost.x -3
  }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x +3
    }
  if(tower.y>400) {
  tower.y = tower.width/2
  }
  spawnDoors();
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if (invisibleBlocksGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }
  
 drawSprites();
              } 
  if(gameState === "end"){
    text("game over", 230, 250)
  }
}
function spawnDoors() 
{ 
  //write code here to spawn the doors in the tower 
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50); 
    var climber = createSprite(200,10); 
    var invisibleBlock = createSprite(200, 15, 50 , 30)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.x = Math.round(random (120, 400))
        climber.x = door.x
    invisibleBlock.x = door.x
    door.addImage(doorImg)
    door.velocityY = 3
    climber.addImage(climberImg)
    climber.velocityY = 3
    invisibleBlock.velocityY = 3
    ghost.depth = door.depth
    ghost.depth = ghost.depth +1
    door.lifetime = 200
    climber.lifetime = 200
    invisibleBlock.lifetime = 200
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlocksGroup.add(invisibleBlock)
    invisibleBlock.debug = true
    
  } 
}