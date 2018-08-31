function Block(x, y, w, h, a = 0, options = {isStatic: true}, label = "block") {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.angle = a;
    this.expended = false;
    World.add(world, this.body);
}

Block.prototype.show = function() {
    fill(255);
    stroke(255);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};