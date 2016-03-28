var ghost;
var enemies;
var goals;
const color = getRandColor(5);
var SCENE_W = window.innerWidth;
var SCENE_H = window.innerHeight;

function setup() {
  init()
}

function draw() {
  move();
  background(color[0],color[1],color[2]);
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;
  enemies.draw();
  enemies.bounce(ghost, explode);
  enemies.bounce(enemies);
  goals.draw();
  goals.bounce(enemies);
  drawSprite(ghost);
  shadowGhost();
  mouseIsPressed ? camera.zoom = .4 : camera.zoom = .75;
  checkMargins();
  checkEnemies();
  checkGoals();
}

function getRandColor(brightness){
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
    return mixedrgb;
  }

function move() {
  if (keyDown("d")) {
    ghost.addSpeed(0.7, 0);
    ghost.changeAnimation("right");
  } else if (keyDown("s")) {
    ghost.addSpeed(0.7, 90);
    ghost.changeAnimation("down");
  } else if (keyDown("a")) {
    ghost.addSpeed(0.7, 180);
    ghost.changeAnimation("left");
  } else if (keyDown("w")) {
    ghost.addSpeed(0.7, 270);
    ghost.changeAnimation("up");
  } else {
    ghost.changeAnimation("still");
  }
}

function createGhost() {
  ghost = createSprite(600, 200, 50, 100);
  ghost.maxSpeed = 8;
  ghost.friction = .93;
  ghost.mass = 50;
  ghost.setCollider("circle", 0,0, 20);
}

function createEnemies() {
  enemies = new Group();

  for (var i = 0; i < 20; i++) {
    var enemy = createSprite(random(0, SCENE_W), random(0, SCENE_H));
    enemy.addAnimation("normal", "/images/asterisk_stretching0001.png","/images/asterisk_stretching0008.png");
    enemy.friction = .98;
    enemies.add(enemy);
  }
}

function explode(enemy1, ghost) {
  setTimeout(function() {
    enemy1.addAnimation("explode", "/images/asterisk_explode0001.png","/images/asterisk_explode0011.png")
    enemy1.changeAnimation("explode")
    enemy1.setCollider("circle", 0, 0, 120, 120);
  }, 1000)
}

function createAnimations() {
  ghost.addAnimation("right", "/images/ghost_walk0001.png", "/images/ghost_walk0004.png");
  ghost.addAnimation("left", "/images/ghost_walk0001left.png", "/images/ghost_walk0002left.png", "/images/ghost_walk0003left.png", "/images/ghost_walk0004left.png");
  ghost.addAnimation("up", "/images/ghost_standing0001.png", "/images/ghost_standing0007.png");
  ghost.addAnimation("down", "/images/ghost_standingdown0001.png", "/images/ghost_standingdown0007.png");
  ghost.addAnimation("still", "/images/ghost_spin0001.png", "/images/ghost_spin0003.png");
}

function shadowGhost() {
  noStroke();
  fill(0,0,0,20);
  ellipse(ghost.position.x, ghost.position.y + 90, 80, 30);
}

function checkMargins() {
  for (var i = 0; i < allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x < 0) s.position.x = 0;
    if(s.position.y < 0) s.position.y = 0;
    if(s.position.x > SCENE_W) s.position.x = SCENE_W;
    if(s.position.y > SCENE_H) s.position.y = SCENE_H;
  }
}

function createGoals() {
  goals = new Group()
  for (var i = 0; i < 2; i++) {
    goal = createSprite(random(0, SCENE_W), random(0, SCENE_H));
    goal.addAnimation("goal", "/images/bubbly0001.png", "/images/bubbly0004.png");
    goals.add(goal);
  }
}

function checkGoals() {
  if (goals.length > 0) {
    for (var i = 0; i < goals.length; i++) {
      checkGoal(goals[i]);
    }
  } else {
    victory();
  }
}

function checkGoal(goal) {
  if (goal.overlap(ghost)) goal.remove();
}

function victory() {
  //victoryMessage() //composed of platforms?
  //click to reset all sprites and run setup functions again
  for (var i = 0; i < allSprites.length; i++) {
    allSprites[i].remove()
  }
  init();
}

function checkEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    checkEnemy(enemies[i])
  }
}

function checkEnemy(enemy) {
  if (enemy.displace(ghost) && enemy.getAnimationLabel() == "explode") {
    victory();
  }
}

function init() {
  document.body.style.backgroundColor = "rgb(" + color.join(",") + ")";
  createCanvas(SCENE_W, SCENE_H);
  createGhost();
  createEnemies();
  createGoals();
  createAnimations();
}
