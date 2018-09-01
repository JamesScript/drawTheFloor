// Atempted to use decomp to help make convex shapes. Didn't go as planned

function CustomShape(vertices) {
    const options = {
        restitution: 0.5,
        friction: 0.1,
        density: 0.05,
        isStatic: drawStatic
    };
    const thickness = 30;
    // const size = {
    //     x: dist(Math.min(...vertices.map(v => v[0])), 0, Math.max(...vertices.map(v => v[0])), 0),
    //     y: dist(Math.min(...vertices.map(v => v[1])), 0, Math.max(...vertices.map(v => v[1])), 0)
    // };
    // If drawing right to left, size becomes its negative equivalent. Same for bottom to top.
    // if (vertices[vertices.length-1][0] < vertices[0][0]) size.x *= -1;
    // if (vertices[vertices.length-1][1] < vertices[0][1]) size.y *= -1;
    // this.vertices = [...vertices, ...vertices.map(v => [v[0], v[1] + thickness]).reverse()];
    this.vertices = vertices;
    // decomp.makeCCW(this.vertices);
    this.convexVertices = decomp.quickDecomp(this.vertices);
    this.matterVectors = this.vertices.map(v => Matter.Vector.create(v[0], v[1]));
    // this.matterConvexVectors = this.convexVertices.map(v => Matter.Vector.create(v[0], v[1]));
    this.expended = false;
    this.body = [];
    for (let i = 0; i < this.convexVertices.length; i++) {
        // console.log(this.convexVertices[i]);
        let mVectors = this.convexVertices[i].map(v => Matter.Vector.create(v[0], v[1]));
        let size = {
            x: dist(Math.min(...mVectors.map(v => v.x)), 0, Math.max(...mVectors.map(v => v.x)), 0),
            y: dist(Math.min(...mVectors.map(v => v.y)), 0, Math.max(...mVectors.map(v => v.y)), 0)
        };
        if (vertices[vertices.length-1][0] < vertices[0][0]) size.x *= -1;
        if (vertices[vertices.length-1][1] < vertices[0][1]) size.y *= -1;
        // console.log(mVectors[0]);
        this.body.push(Bodies.fromVertices(mVectors[0].x + size.x / 2, mVectors[0].y + size.y / 2 + thickness / 2, mVectors, options));
    }
    // this.body = Bodies.fromVertices(vertices[0][0] + size.x / 2, vertices[0][1] + size.y / 2 + thickness / 2, this.matterVectors, options);
    this.body.label = "customShape";
    World.add(world, this.body);
}

CustomShape.prototype.show = function() {
    fill(200);
    stroke(255);
    beginShape();
    for (let j = 0; j < this.body.length; j++) {
        for (let i = 0; i < this.body[j].vertices.length; i++) {
            vertex(this.body[j].vertices[i].x, this.body[j].vertices[i].y)
        }
    }
    endShape(CLOSE);
};