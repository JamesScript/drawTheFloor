function menu() {
    /* Stages
    *  0 - the beginning, press start
    *  1 - the button mophs into the menu
    *  2 - full menu is shown
    */
    if (stage === 0) {
        const startButton = {
            x: width / 2,
            y: height / 2,
            w: width * 0.3,
            h: height * 0.2
        };
        strokeWeight(5);
        let buttonStroke = color(0, 0, 50);
        let buttonFill = color(0, 0, 80);
        let textFill = color(0, 0, 0);
        if (
            rectIntersect(startButton, {x: mouseX, y: mouseY, w: 1, h: 1})
            // mouseX > startButton.x - startButton.w / 2
            // && mouseX < startButton.x + startButton.w / 2
            // && mouseY > startButton.y - startButton.h / 2
            // && mouseY < startButton.y + startButton.h / 2
        ) {
            buttonStroke = color(140, 10, 100);
            buttonFill = color(80, 10, 50);
            textFill = color(51, 100, 100);
            cursor(HAND);
            if (mouseIsPressed) {
                stage = 1;
                setUpLevelOne();
            }
        }
        stroke(buttonStroke);
        fill(buttonFill);
        rect(startButton.x, startButton.y, startButton.w, startButton.h, 50);
        fill(textFill);
        textSize(30);
        text("START", width / 2, height / 2);
    } else if (stage === 1) {

    }
}