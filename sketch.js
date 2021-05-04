'use strict';

let state = 'title';
let cnv;
let points = 0;

let w = 600;
let h = 600;

let trash;
let player;

let yoff = 0.0; // 2nd dimension of perlin noise

function setup() {
  cnv = createCanvas(w,h);
  textFont('monospace');

  player = new Player();
  player.display();

  trash = new Trash();
  trash.display();

}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;

    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;

    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;

    default:
      break;
  }
}

function drawRiver() {
 //blue background for sky
  background(0, 200, 245);

  //cyan waves for water
  fill(170, 295, 330);
  noStroke();

  //make the waves move
  //draw a polygon with wave points
  beginShape();

  let xoff = 0;

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map

    //2D Noise
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.1;
  }

  // increment y dimension for noise
  yoff += 0.1;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW){
    player.direction = 'left';
  }else if (keyCode == RIGHT_ARROW){
    player.direction = 'right';
  }else if (keyCode == UP_ARROW){
    player.direction = 'up';
  }else if (keyCode == DOWN_ARROW){
    player.direction = 'down';
  }else if (key = ' '){
    player.direction = 'still';
  }
}


function title() {

  background(0, 150, 0);

  fill(0);
  textSize(36);
  textAlign(CENTER);
  text('Collect the Trash', width/2, height/5);

  textSize(24);
  text('to help keep the river clean', width/2, height/2);

}

function titleMouseClicked() {
  state = 'level 1';
}

function level1() {
  // background(200, 200, 0);
  drawRiver();

  trash.display();
  trash.move();

  player.display();
  player.move();

  textSize(36);
  fill(0);
  noStroke();
  //check for collision; if there is one, increase points
  if(dist(player.x, player.y, trash.x, trash.y) <= (player.r+trash.r)/2){
    points++;
  }
  text(`points: ${points}`, width/4, height*0.15);

  if (points >= 50) {
  state = 'you win';
  }
}

function level1MouseClicked() {
}

function youWin() {
  background(230, 210, 80);

  noStroke();
  fill(180, 150, 60);
  square(random(0, width), random(0, height), random(25, 75));
  fill(150);
  square(random(0, width), random(0, height), random(25, 75));

  textSize(36);
  fill(150, 120, 40);
  text('Winner!', width/2, height * 0.3);
  textSize(24);
  text('Thank you for picking up litter.', width/2, height * 0.4);
}

function youWinMouseClicked() {
  state = 'title';
  points = 0;
}
