function menu() {
    const startButton = {
        x: width / 2,
        y: height / 2,
        w: width * 0.3,
        h: height * 0.2
    };
    strokeWeight(5);
    stroke(0, 0, 50);
    fill(0, 0, 80);
    if (
        mouseX > startButton.x - startButton.w / 2
        && mouseX < startButton.x + startButton.w / 2
        && mouseY > startButton.y - startButton.h / 2
        && mouseY < startButton.y + startButton.h / 2
    ) {
        stroke(140, 10, 100);
        fill(80, 10, 50);
    }
    rect(startButton.x, startButton.y, startButton.w, startButton.h, 50);
}