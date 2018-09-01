function setUpLevelOne() {
    removeAllObjects();
    const goalCoords = [width * 0.6, height * 0.7, width * 0.1, height * 0.1];
    G.goals.push(new Goal(...goalCoords));
    G.blocks.push(new Block(goalCoords[0], goalCoords[1] + goalCoords[3], goalCoords[2], goalCoords[3]));

}

function levelOne() {
    if (frameCount % 100 === 0) {
        newParticle(width * 0.2, 0, 8);
    }
    if (G.goals.length > 0 && G.goals[0].received.length > 0) {
        removeAllObjects();
    }
}

function setUpLevelTwo() {

}