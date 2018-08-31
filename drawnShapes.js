function CustomShape(vertices) {
    const options = {
        restitution: 0.5,
        friction: 0.1,
        density: 0.05,
        isStatic: drawStatic
    };
    const thickness = 20;
    const size = {
        x: dist(Math.min(...vertices.map(v => v[0])), 0, Math.max(...vertices.map(v => v[0])), 0),
        y: dist(Math.min(...vertices.map(v => v[1])), 0, Math.max(...vertices.map(v => v[1])), 0)
    };
    // If drawing right to left, size becomes its negative equivalent. Same for bottom to top.
    if (vertices[vertices.length-1][0] < vertices[0][0]) size.x *= -1;
    if (vertices[vertices.length-1][1] < vertices[0][1]) size.y *= -1;
    this.vertices = [...vertices, ...vertices.map(v => [v[0], v[1] + thickness]).reverse()];
    this.matterVectors = this.vertices.map(v => Matter.Vector.create(v[0], v[1]));
    this.expended = false;
    this.body = Bodies.fromVertices(vertices[0][0] + size.x / 2, vertices[0][1] + size.y / 2 + thickness / 2, this.matterVectors, options);
    this.body.label = "customShape";
    World.add(world, this.body);
}

CustomShape.prototype.show = function() {
    fill(200);
    stroke(255);
    beginShape();
    for (let i = 0; i < this.body.vertices.length; i++) {
        vertex(this.body.vertices[i].x, this.body.vertices[i].y)
        // vertex(this.vertices[i][0], this.vertices[i][1]);
    }
    endShape(CLOSE);
};