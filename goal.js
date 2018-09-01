function Goal(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.received = [];
}

Goal.prototype.show = function() {
    noStroke();
    fill(80, 100, 100, 50);
    rect(this.x, this.y, this.w, this.h);
};