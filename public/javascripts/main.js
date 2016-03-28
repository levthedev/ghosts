var ghost;
var bg;
const color = getRandColor(5);
var SCENE_W = window.innerWidth * 2;
var SCENE_H = window.innerHeight * 2;
var MARGIN = 20;

function setup() {
  document.body.style.backgroundColor = "rgb(" + color.join(",") + ")";
  createCanvas(window.innerWidth, window.innerHeight);
  createGhost();
  createAnimations();
  createEnemies();
}

function draw() {
  move();
  background(color[0],color[1],color[2]);
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;
  bg.draw();
  bg.bounce(bg, explode);
  drawSprite(ghost);
  ghost.bounce(bg);
  shadowGhost();
  mouseIsPressed ? camera.zoom = .25 : camera.zoom = .5;
  checkMargins();
}

function getRandColor(brightness){
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
    return mixedrgb;
  }

function move() {
  if(keyDown(RIGHT_ARROW)) {
    ghost.addSpeed(0.7, 0);
    ghost.changeAnimation("right");
  }

  if(keyDown(DOWN_ARROW)) {
    ghost.addSpeed(0.7, 90);
    ghost.changeAnimation("down");
  }

  if(keyDown(LEFT_ARROW)) {
    ghost.addSpeed(0.7, 180);
    ghost.changeAnimation("left");
  }

  if(keyDown(UP_ARROW)) {
    ghost.addSpeed(0.7, 270);
    ghost.changeAnimation("up");
  }

  if (!keyDown(UP_ARROW) && !keyDown(DOWN_ARROW) && !keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW)) {
    ghost.changeAnimation("still");
  }
}

function createGhost() {
  ghost = createSprite(600, 200, 50, 100);
  ghost.maxSpeed = 8;
  ghost.friction = .93;
  ghost.setCollider("circle", 0,0, 20);
}

function createEnemies() {
  bg = new Group();

  for(var i=0; i<20; i++) {
    var enemy = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    enemy.addAnimation("normal", "/images/asterisk_stretching0001.png","/images/asterisk_stretching0008.png");
    enemy.friction = .98;
    bg.add(enemy);
  }
}

function explode(enemy1, enemy2) {
  setTimeout(function() {
    enemy1.remove();
    enemy2.remove();
  }, 700);
  enemy1.addAnimation("explode", "/images/asterisk_explode0001.png","/images/asterisk_explode0011.png");
  enemy2.addAnimation("explode", "/images/asterisk_explode0001.png","/images/asterisk_explode0011.png");
}

function createAnimations() {
  ghost.addAnimation("right", "/images/ghost_walk0001.png", "/images/ghost_walk0004.png")
  ghost.addAnimation("left", "/images/ghost_walk0001left.png", "/images/ghost_walk0002left.png", "/images/ghost_walk0003left.png", "/images/ghost_walk0004left.png")
  ghost.addAnimation("up", "/images/ghost_standing0001.png", "/images/ghost_standing0007.png")
  ghost.addAnimation("down", "/images/ghost_standingdown0001.png", "/images/ghost_standingdown0007.png")
  ghost.addAnimation("still", "/images/ghost_spin0001.png", "/images/ghost_spin0003.png")
}

function shadowGhost() {
  noStroke();
  fill(0,0,0,20);
  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);
}

function checkMargins() {
  for(var i = 0; i < allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x < -MARGIN) s.position.x = width + MARGIN;
    if(s.position.x > width + MARGIN) s.position.x = -MARGIN;
    if(s.position.y < -MARGIN) s.position.y = height + MARGIN;
    if(s.position.y > height + MARGIN) s.position.y = -MARGIN;
  }
}
