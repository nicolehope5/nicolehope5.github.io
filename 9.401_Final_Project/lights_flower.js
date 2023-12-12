new p5((p) => {
    let playLinearButton;
    let playQuadraticButton;
    let playFlowerButton;
    let selectLinearButton;
    let selectQuadraticButton;
    let lightsResetButton;

    let linearLightBrightness = 0;
    let quadraticLightBrightness = 0;
    let flowerRadius = 0;
    let petalLength = 0;
    let feedback = "";
    let selectedLight = null;
    let animationStartTime = 0;

    p.setup = function() {
        p.canvas3 = p.createCanvas(800, 400);
        p.canvas3.parent('canvas-3')

        playLinearButton = p.createButton('Play Linear Light');
        playLinearButton.parent('canvas-3');
        playLinearButton.position(50, p.height - 60);
        // playLinearButton.style('position', 'absolute');
        // playLinearButton.style('top', '70%');
        // playLinearButton.style('left', '0%');
        playLinearButton.mousePressed(() => p.playLight('linear'));

        playQuadraticButton = p.createButton('Play Quadratic Light');
        playQuadraticButton.parent('canvas-3');
        playQuadraticButton.position(p.width / 3, p.height - 60);
        // playQuadraticButton.style('position', 'absolute');
        // playQuadraticButton.style('top', '80%');
        // playQuadraticButton.style('left', '0%');
        playQuadraticButton.mousePressed(() => p.playLight('quadratic'));

        playFlowerButton = p.createButton('Play Flower');
        playFlowerButton.parent('canvas-3');
        // playFlowerButton.style('position', 'absolute');
        // playFlowerButton.style('top', '60%');
        // playFlowerButton.style('left', '0%');
        playFlowerButton.position(p.width / 1.5, p.height - 60);
        playFlowerButton.mousePressed(() => p.playLight('flower'));

        selectLinearButton = p.createButton('Select Linear Light');
        selectLinearButton.parent('canvas-3');
        // selectLinearButton.style('position', 'absolute');
        // selectLinearButton.style('top', '70%');
        // selectLinearButton.style('left', '50%');
        selectLinearButton.position(50, p.height - 90);
        selectLinearButton.mousePressed(() => p.selectLight('linear'));

        selectQuadraticButton = p.createButton('Select Quadratic Light');
        selectQuadraticButton.parent('canvas-3');
        // selectQuadraticButton.style('position', 'absolute');
        // selectQuadraticButton.style('top', '80%');
        // selectQuadraticButton.style('left', '50%');
        selectQuadraticButton.position(p.width / 3, p.height - 90);
        selectQuadraticButton.mousePressed(() => p.selectLight('quadratic'));

        lightsResetButton = p.createButton('Reset');
        lightsResetButton.parent('canvas-3');

        // lightsResetButton.style('position', 'absolute');
        // lightsResetButton.style('top', '30%');
        // lightsResetButton.style('left', '50%');
        lightsResetButton.position(p.width - 70, p.height - 30);
        lightsResetButton.mousePressed(p.replay);
    }

    p.draw = function() {
        p.background(255);

        // Display feedback
        p.fill(0);
        p.textSize(16);
        p.text(feedback, p.width / 2 - 50, 20);

        // Linear light
        p.fill(0, 255, 0, linearLightBrightness);
        p.ellipse(100, 100, 50, 50);

        // Quadratic light (flashing three times)
        if (selectedLight === 'quadratic') {
            let elapsedTime = p.millis() - animationStartTime;
            let period = 5000 / 6; // 3 flashes in 5 seconds
            let flashNumber = p.floor(elapsedTime / period);
            if (flashNumber < 3) {
                quadraticLightBrightness = flashNumber % 2 === 0 ? 255 : 0;
            } else {
                quadraticLightBrightness = 0;
            }
        } else {
            quadraticLightBrightness = 0;
        }

        p.fill(0, 255, 0, quadraticLightBrightness);
        p.ellipse(p.width / 3, 100, 50, 50);

        // Flower
        p.drawFlower(p.width - 100, p.height - 100, flowerRadius, petalLength);

        // Update values only when the respective light is playing
        if (selectedLight === 'linear' && p.millis() - animationStartTime < 10000) {
            linearLightBrightness = p.min(linearLightBrightness + 255 / (10 * p.frameRate()), 255);
        }

        if (selectedLight === 'flower' && p.millis() - animationStartTime < 5000) {
            flowerRadius = p.min(flowerRadius + 50 / (5 * p.frameRate()), 50);
            petalLength = p.min(petalLength + 20 / (5 * p.frameRate()), 20);
        }
    }

    p.playLight = function(lightType) {
        if (lightType === 'linear') {
            linearLightBrightness = 0;
        } else if (lightType === 'quadratic') {
            quadraticLightBrightness = 0;
        } else if (lightType === 'flower') {
            flowerRadius = 0;
            petalLength = 0;
        }

        feedback = '';
        selectedLight = lightType;
        animationStartTime = p.millis();
    }

    p.selectLight = function(lightType) {
        selectedLight = lightType;
        feedback = p.checkFeedback();
    }

    p.replay = function() {
        linearLightBrightness = 0;
        quadraticLightBrightness = 0;
        flowerRadius = 0;
        petalLength = 0;
        feedback = '';
        selectedLight = null;
    }

    p.drawFlower = function(x, y, radius, petalLength) {
        p.fill(255, 0, 0);
        p.ellipse(x, y, p.radius * 2, p.radius * 2);

        p.fill(255, 255, 0);
        for (let angle = 0; angle < 360; angle += 10) {
            let petalX = x + p.cos(p.radians(angle)) * radius;
            let petalY = y + p.sin(p.radians(angle)) * radius;
            let endX = petalX + p.cos(p.radians(angle)) * petalLength;
            let endY = petalY + p.sin(p.radians(angle)) * petalLength;
            p.ellipse(petalX, petalY, 10, 20);
            p.line(petalX, petalY, endX, endY);
        }
    }

    p.checkFeedback = function() {
        if (selectedLight === 'linear') {
            return 'Correct!';
        } else if (selectedLight === 'quadratic') {
            return 'Incorrect!';
        } else {
            return '';
        }
    }
})