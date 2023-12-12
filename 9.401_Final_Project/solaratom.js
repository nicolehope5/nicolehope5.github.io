new p5((p) => {
    let nucleus, electron, sun, planet;
    let solar_feedback = "";
    let submitButton;
    let solar_replayButton;
    p.setup = function() {
        p.canvas2 = p.createCanvas(800, 400);
        p.canvas2.parent('canvas-2');

        // Create draggable text elements with colors and bounding boxes
        nucleus = new p.DraggableText("nucleus", 50, 300, p.color(128, 0, 128)); // Purple
        electron = new p.DraggableText("electron", 200, 300, p.color(0, 0, 255)); // Blue
        sun = new p.DraggableText("sun", 450, 300, p.color(255, 165, 0)); // Orange
        planet = new p.DraggableText("planet", 600, 300, p.color(0, 128, 0)); // Green

        // Create submit and replay buttons
        // p.submitButton = p.createButton('Submit');
        // p.submitButton.position(10, p.height - 60);
        // p.submitButton.mousePressed(p.checkAndProvideFeedback);
        solar_submitButton = p.createButton('Submit');
        solar_submitButton.parent('canvas-2');
        solar_submitButton.position(450, 150);
        // solar_submitButton.style('bottom', '20px'); // 10px from the bottom of the div
        // solar_submitButton.style('left', '0px'); // 10px from the left of the div
        solar_submitButton.mousePressed(p.checkAndProvideFeedback);

        // solar_replayButton = p.createButton('Replay');
        // solar_replayButton.position(10, p.height - 30);
        // solar_replayButton.mousePressed(p.replay);
    }

    p.draw = function() {
        p.background(255);

        // Display draggable text elements
        nucleus.display();
        electron.display();
        sun.display();
        planet.display();

        // Display solar_feedback
        p.fill(0);
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(solar_feedback, p.width / 2, p.height - 20);
    }

    p.mousePressed = function() {
        // Check if the mouse is pressed on any of the draggable text elements
        nucleus.pickUp(p.mouseX, p.mouseY);
        electron.pickUp(p.mouseX, p.mouseY);
        sun.pickUp(p.mouseX, p.mouseY);
        planet.pickUp(p.mouseX, p.mouseY);
    }

    p.mouseDragged = function() {
        // Drag the text element if it is being dragged
        nucleus.drag();
        electron.drag();
        sun.drag();
        planet.drag();
    }

    p.mouseReleased = function() {
        // Release the currently dragged text element
        nucleus.drop();
        electron.drop();
        sun.drop();
        planet.drop();
    }

    p.checkAndProvideFeedback = function() {
        // Check matches and provide solar_feedback
        p.checkMatches();
    }

    p.checkMatches = function() {
        // Check if the text elements are in correct pairs
        let matchesCorrect =
            (sun.isNear(nucleus) && electron.isNear(planet)) ||
            (nucleus.isNear(sun) && planet.isNear(electron));

        // Provide solar_feedback based on matches
        if (matchesCorrect) {
            solar_feedback = "Correct!";
        } else {
            solar_feedback = "Incorrect. Try again.";
        }
    }

    // p.replay = function() {
    //     // Reset positions and solar_feedback
    //     nucleus.resetPosition();
    //     electron.resetPosition();
    //     sun.resetPosition();
    //     planet.resetPosition();
    //     solar_feedback = "";
    // }

    p.DraggableText = class {
        constructor(label, x, y, color) {
            this.label = label;
            this.x = x;
            this.y = y;
            this.initialX = x;
            this.initialY = y;
            this.offsetX = 0;
            this.offsetY = 0;
            this.dragging = false;
            this.color = color;
            this.boxSize = 60; // Size of the bounding box
        }

        display() {
            // Draw the bounding box
            p.noFill();
            p.stroke(0);
            p.strokeWeight(2);
            p.rectMode(p.CENTER);
            p.rect(this.x, this.y, this.boxSize, this.boxSize);

            // Draw the text at its current position with the specified color
            p.fill(this.color);
            p.noStroke();
            p.textSize(16);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.label, this.x, this.y);
        }

        pickUp(mx, my) {
            // Check if the mouse is pressed inside the bounding box
            let d = p.dist(mx, my, this.x, this.y);
            if (d < this.boxSize / 2) {
                this.dragging = true;
                this.offsetX = this.x - mx;
                this.offsetY = this.y - my;
            }
        }

        drag() {
            // Drag the text element if it is being dragged
            if (this.dragging) {
                this.x = p.mouseX + this.offsetX;
                this.y = p.mouseY + this.offsetY;
            }
        }

        drop() {
            // Release the text
            this.dragging = false;
        }

        resetPosition() {
            // Reset the position of the text to its initial position
            this.x = this.initialX;
            this.y = this.initialY;
        }

        isNear(otherText) {
            // Check if this text is near another text
            let distance = p.dist(this.x, this.y, otherText.x, otherText.y);
            return distance < 2 * this.boxSize; // Adjust the multiplier as needed
        }
    }
});