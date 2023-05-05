export class Sun {
  constructor() {
    this.radius = 150;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 140;
    this.y = this.radius + 20; //sun의 높이
  }

  draw(ctx, t) {
    ctx.fillStyle = "#FFB200";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
