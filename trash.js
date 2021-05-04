class Trash {
  constructor(){
    this.r = 50;
    this.x = 0 - this.r;
    this.y = random(height*0.6, height*0.95);
  }

  display(){
    fill(200, 0, 0);
    noStroke();
    square(this.x, this.y, this.r);
  }

  move(){
    this.x++;
  }

}
