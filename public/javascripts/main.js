var ghost;
var bg;
const color = getRandColor(5);
var SCENE_W = window.innerWidth * 4;
var SCENE_H = window.innerHeight * 4;

function setup() {
  document.body.style.backgroundColor = "rgb(" + color.join(",") + ")";
  createCanvas(window.innerWidth, window.innerHeight);
  ghost = createSprite(600, 200, 50, 100);
  var ghostAnimation = ghost.addAnimation("thrust", "/images/ghost_standing0001.png", "/images/ghost_standing0007.png");
  ghost.maxSpeed = 6;
  ghost.friction = .98;
  ghost.setCollider("circle", 0,0, 20);
  bg = new Group();

  for(var i=0; i<80; i++) {
    var enemy = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    enemy.addAnimation("normal", "/images/asterisk_explode0001.png","/images/asterisk_explode0011.png");
    enemy.friction = .98
    bg.add(enemy);
  }
}

function draw() {
  move();
  background(color[0],color[1],color[2]);
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;
  checkMargins()
  bg.draw();
  noStroke();
  fill(0,0,0,20);
  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);
  drawSprite(ghost);
  ghost.bounce(bg)
}

function getRandColor(brightness){
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return mixedrgb;
  }

function move() {
  if(keyDown(LEFT_ARROW)) ghost.rotation -= 4;
  if(keyDown(RIGHT_ARROW)) ghost.rotation += 4;
  if(keyDown(UP_ARROW)) {
    ghost.addSpeed(.5, ghost.rotation - 90);
    ghost.changeAnimation("thrust");
  } else {
    ghost.changeAnimation("normal");
  }
}

function checkMargins() {
  if(ghost.position.x < 0)
    ghost.position.x = 0;
  if(ghost.position.y < 0)
    ghost.position.y = 0;
  if(ghost.position.x > SCENE_W)
    ghost.position.x = SCENE_W;
  if(ghost.position.y > SCENE_H)
    ghost.position.y = SCENE_H;
}
