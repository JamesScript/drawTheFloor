const Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

let plonks = [];

let engine;
let world;
let particles = [];
let drawnShapes = [];
let touchedVertices = [];
let smoke = [];
let drawStatic = true;

function setup() {
    for (let i = 0; i < 16; i++) {
        plonks.push(
            new Howl({
                src: ["plonk.wav"],
                rate: 1 + i / 10
            })
        );
    }
    createCanvas(1000, 800);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;

    function collision(event) {
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++) {
            let labelA = pairs[i].bodyA.label;
            let labelB = pairs[i].bodyB.label;
            if (labelA === 'particle' && labelB === 'customShape' || labelB === 'particle' && labelA === 'customShape') {
                console.log(pairs[i]);
                let ball = labelA === 'particle' ? pairs[i].bodyA : pairs[i].bodyB;
                let stereoPosition = map(ball.position.x, 0, width, -1, 1);
                plonks[ball.pitch].stereo(stereoPosition);
                plonks[ball.pitch].play();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    newParticle();
}

function newParticle() {
    let p = particle(random(10, width - 10), 0, 10);
    particles.push(p);
}

function draw() {
    background(0, 0, 0);
    if (Math.random() > 0.8) {
        newParticle();
    }
    // if (frameCount % 10 === 0) {
    //     plonks[8].stereo(soundPos);
    //     plonks[8].play();
    //     soundPos += 0.1;
    //     console.log(soundPos);
    // }
    if (mouseIsPressed) {
        touchedVertices.push([Math.round(mouseX), Math.round(mouseY)]);
        noFill();
        stroke(255);
        beginShape();
        for (let i = 0; i < touchedVertices.length; i++) {
            vertex(touchedVertices[i][0], touchedVertices[i][1]);
        }
        endShape();
    } else {
        if (touchedVertices.length > 0) {
            drawnShapes.push(new CustomShape(touchedVertices));
            touchedVertices = [];
        }
    }
    Engine.update(engine, 1000 / 30);

    const gameObjects = [particles, drawnShapes, smoke];
    for (let i = 0; i < gameObjects.length; i++) {
        for (let j = 0; j < gameObjects[i].length; j++) {
            gameObjects[i][j].show();
            if (gameObjects[i][j].expended) {
                World.remove(world, gameObjects[i][j].body);
                gameObjects[i].splice(j, 1);
                j--;
            }
        }
    }
}

function isOffScreen(obj, size = 50) {
    let x = obj.body.position.x;
    let y = obj.body.position.y;
    return (x < -size || x > width + size || y > height + size || y < -size);
}

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