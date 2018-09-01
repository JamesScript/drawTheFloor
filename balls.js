function particle(x, y, r) {
    const options = {
        restitution: 0.8,
        friction: 0.01,
        density: 0.05
    };
    return new Ball(x, y, r, options, "particle");
}

function Ball(x, y, r, options = {}, label) {
    this.col = color(random(360), 100, 100);
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = label;
    this.body.pitch = floor(random(plonks.length));
    this.r = r;
    this.expended = false; // to be deleted
    this.logged = false; // has been logged by a goal as received
    this.age = 0;
    this.lifeSpan = 600;
    World.add(world, this.body);
}

Ball.prototype.show = function() {
    fill(this.col);
    noStroke();
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
    this.age++;
    if (isOffScreen(this) || this.age > this.lifeSpan) {
        this.expended = true;
        if (this.age > this.lifeSpan) G.smoke.push(new Smoke(pos.x, pos.y, this.col));
    }
    for (let i = 0; i < G.goals.length; i++) {
        if (rectIntersect({x: pos.x, y: pos.y, w: this.r, h: this.r}, G.goals[i]) && !this.logged) {
            G.goals[i].received.push(`${this.body.label} -- Color: ${this.col}`);
            this.logged = true;
            G.smoke.push(new Smoke(pos.x, pos.y, this.col));
            fireworks(pos.x, pos.y, this.col);
        }
    }
};