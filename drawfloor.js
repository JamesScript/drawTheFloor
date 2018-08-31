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
    rectMode(CENTER);
    engine = Engine.create();
    world = engine.world;

    function collision(event) {
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++) {
            let labelA = pairs[i].bodyA.label;
            let labelB = pairs[i].bodyB.label;
            if (labelA === 'particle' && labelB === 'customShape' || labelB === 'particle' && labelA === 'customShape') {
                let ball = labelA === 'particle' ? pairs[i].bodyA : pairs[i].bodyB;
                let stereoPosition = map(ball.position.x, 0, width, -1, 1);
                plonks[ball.pitch].stereo(stereoPosition);
                plonks[ball.pitch].play();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    newParticle();

    // smoke[0] = new Smoke(width / 2, height / 2, color(200, 100, 100));
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
                if (i !== 2) World.remove(world, gameObjects[i][j].body);
                gameObjects[i].splice(j, 1);
                j--;
            }
        }
    }
    // menu();
}

function isOffScreen(obj, size = 50) {
    let x = obj.body.position.x;
    let y = obj.body.position.y;
    return (x < -size || x > width + size || y > height + size || y < -size);
}