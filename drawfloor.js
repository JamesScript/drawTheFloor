const Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
const mouseObj = {x: 0, y: 0, w: 1, h: 1};
const worldObjectCategories = 3;
const G = {
    // Game Objects - shortened to G to be referred to quicker
    particles: [],
    drawnShapes: [],
    smoke: [],
    goals: [],
    blocks: []
};

let plonks = [];

let engine;
let world;
// let particles = [];
// let drawnShapes = [];
let touchedVertices = [];
// let smoke = [];
// let goals = [];
// let blocks = [];
let canDraw = true;
let drawStatic = true;
let stage = 0;

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
    textAlign(CENTER);
    engine = Engine.create();
    world = engine.world;

    function collision(event) {
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++) {
            let labelA = pairs[i].bodyA.label;
            let labelB = pairs[i].bodyB.label;
            const collides = (a, b) => labelA === a && labelB === b || labelB === a && labelA === b;
            if (collides('particle', 'customShape')) {
                let ball = labelA === 'particle' ? pairs[i].bodyA : pairs[i].bodyB;
                let stereoPosition = map(ball.position.x, 0, width, -1, 1);
                plonks[ball.pitch].stereo(stereoPosition);
                plonks[ball.pitch].play();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    newParticle(random(10, width - 10), 0, 10);

    // smoke[0] = new Smoke(width / 2, height / 2, color(200, 100, 100));
}

function draw() {
    background(0, 0, 0);
    cursor(ARROW);
    mouseObj.x = mouseX;
    mouseObj.y = mouseY;
    if (stage === 0) {
        if (Math.random() > 0.8) {
            newParticle(random(10, width - 10), 0, 10);
        }
    } else {
        levelOne();
    }
    fundamentals();
}

function fundamentals() {
    if (mouseIsPressed && canDraw) {
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
            G.drawnShapes.push(new CustomShape(touchedVertices));
            touchedVertices = [];
        }
    }
    const gameObjects = [G.particles, G.drawnShapes, G.blocks, G.smoke, G.goals];
    for (let i = 0; i < gameObjects.length; i++) {
        for (let j = 0; j < gameObjects[i].length; j++) {
            gameObjects[i][j].show();
            if (gameObjects[i][j].expended) {
                // Put non-world objects (stuff unrecognised by Matter framework) towards end of array, change if statement below accordingly
                if (i < worldObjectCategories) World.remove(world, gameObjects[i][j].body);
                gameObjects[i].splice(j, 1);
                j--;
            }
        }
    }
    menu();
    Engine.update(engine, 1000 / 30);
}

function isOffScreen(obj, size = 50) {
    let x = obj.body.position.x;
    let y = obj.body.position.y;
    return (x < -size || x > width + size || y > height + size || y < -size);
}

function newParticle(x, y, r) {
    G.particles.push(particle(x, y, r));
}

function rectIntersect(a, b) {
    // For rectangular objects where the x and y coordinates are the center
    return (
        a.x - a.w / 2 <= b.x + b.w / 2
        && a.x + a.w / 2 >= b.x - b.w / 2
        && a.y - a.h / 2 <= b.y + b.h / 2
        && a.y + a.h / 2 >= b.y - b.h / 2
    )
}

function removeAllObjects(addSmoke = true) {
    const gameObjects = [G.particles, G.drawnShapes, G.blocks, G.goals];
    for (let i = 0; i < gameObjects.length; i++) {
        for (let j = 0; j < gameObjects[i].length; j++) {
            if (i === 0 && addSmoke) {
                G.smoke.push(new Smoke(gameObjects[i][j].body.position.x, gameObjects[i][j].body.position.y, gameObjects[i][j].col))
            }
            // Put non-world objects (stuff unrecognised by Matter framework) towards end of array, change if statement below accordingly
            if (i < worldObjectCategories) World.remove(world, gameObjects[i][j].body);
            gameObjects[i].splice(j, 1);
            j--;
        }
    }
}

function fireworks(x, y) {
    const range = 140;
    for (let i = 0; i < 40; i++) {
        G.smoke.push(new Smoke(x + random(-range, range), y + random(-range, range), color(random(360), 100, 100)));
    }
}