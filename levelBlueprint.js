function Level(name, id, objective, completionCheck, coords, spawner, uponCompletion, extraConditions) {
    this.name = name;
    this.id = id;
    this.objective = objective || "Get the ball to hit the goal";
    this.completionCheck = completionCheck || function() { return goals[0].received.length > 0 };
    this.coords = coords || { goals: [width * 0.7, height * 0.8] };
    this.spawner = spawner || function() {
        if (frameCount % 100 === 0) {
            newParticle(width * 0.2, 0, 8);
        }
    };
    this.uponCompletion = uponCompletion;
    this.extraConditions = extraConditions;
}

Level.prototype.init = function() {
    let objectTypes = Object.keys(this.coords);
};