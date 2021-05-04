class Player {
  constructor(){
    this.r = 60;
    this.x = w/2;
    this.y = height*0.2;
    this.speed = 2;
    this.direction = 'still';
  }

  display(){
    fill(0, 100, 200);
    square(this.x, this.y, this.r);
  }

  move() {

    switch (this.direction) {
      case 'still':
      //don't move anything
      break;

      case 'up':
      //decrease y position
      this.y-=this.speed;
      break;

      case 'down':
      //increase y position
      this.y+=this.speed;
      break;

      case 'left':
      //decrease x position
      this.x-=this.speed;
      break;

      case 'right':
      //increase x position
      this.x+=this.speed;
      break;

      default:
      break;
    }

  }

}
