function setUpLevelOne() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].expended = true;
    }
    goals.push(new Goal(width * 0.6, height * 0.7, width * 0.1, height * 0.1));
}

function levelOne() {
    if (frameCount % 100 === 0) {
        newParticle(width * 0.2, 0, 8);
    }

}