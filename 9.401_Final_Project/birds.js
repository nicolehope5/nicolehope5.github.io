new p5((p) => {
    let birds = [];
    let stopFormation = false;
    let birds_feedback = "";
    let birds_replayButton;

    p.setup = function() {
        p.canvas1 = p.createCanvas(600, 400);
        p.canvas1.parent('canvas-1');
        p.playBirdAnimation();

        // Create a replay button
        // birds_replayButton = p.createButton('Replay');
        birds_replayButton = p.createButton('Replay');
        birds_replayButton.parent('canvas-1'); // Attach the button to the div
        birds_replayButton.style('position', 'absolute'); // Position it absolutely within the div
        birds_replayButton.style('bottom', '20px'); // 10px from the bottom of the div
        birds_replayButton.style('left', '50%'); // 10px from the left of the div

        // birds_replayButton.position(10, p.height - 30);
        birds_replayButton.mousePressed(p.replay);
    }

    p.draw = function() {
        p.background(173, 216, 230); // Light pale blue background

        // Draw the birds
        for (let bird of birds) {
            bird.update();
            bird.draw();
        }

        // Draw the cloud
        p.fill(200);
        p.noStroke();
        p.ellipse(p.width / 2, p.height / 2, 120, 60);

        // Display birds_feedback only after the V formation has stopped
        if (stopFormation) {
            p.fill(0);
            p.textSize(16);
            p.text(birds_feedback, 10, 20);
        }

        // Check for mouse click after the V formation has stopped and before pressing "Replay"
        if (stopFormation && p.mouseIsPressed && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            let expectedTipX = p.width / 2 + 30;
            let expectedTipY = birds[0].y; // Assuming top bird defines the tip position

            // Define the dimensions of the bounding box
            let bboxWidth = 170; // Adjust the width of the bounding box as needed
            let bboxHeight = 20; // Adjust the height of the bounding box as needed

            // Check if the click is within the bounding box of the expected tip region
            if (
                p.mouseX >= expectedTipX - bboxWidth / 2 &&
                p.mouseX <= expectedTipX + bboxWidth / 2 &&
                p.mouseY >= expectedTipY - bboxHeight / 2 &&
                p.mouseY <= expectedTipY + bboxHeight / 2
            ) {
                birds_feedback = "Correct!";
            } else {
                birds_feedback = "Incorrect. Try again.";
            }
        }
    }

    p.playBirdAnimation = function() {
        // Set up birds in a "V" formation
        let spacing = 20; // Spacing between birds

        // Starting position of the "V" formation on the left
        let startX = p.width / 2 - spacing * 2 - 100;
        let startY = p.height / 2;

        // Top row
        for (let i = 0; i < 5; i++) {
            let birdTop = new Bird(startX - i * spacing, startY - i * spacing);
            birds.push(birdTop);
        }

        // Bottom row
        for (let i = 0; i < 5; i++) {
            let birdBottom = new Bird(startX - i * spacing, startY + i * spacing);
            birds.push(birdBottom);
        }
    }

    p.replay = function() {
        // Reset variables and replay the animation
        birds = [];
        stopFormation = false;
        birds_feedback = "";
        p.playBirdAnimation();
    }

    class Bird {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speed = 2;
            this.stopX = p.width / 2 + 30; // x-coordinate to stop a little to the right of the middle of the cloud
        }

        update() {
            // Example: simple movement towards the right
            if (!stopFormation) {
                this.x += this.speed;
                if (this.x >= this.stopX) {
                    stopFormation = true; // Stop the entire formation when the stopping point is reached
                }
            }
        }

        draw() {
            p.fill(0); // Black color for the bird
            p.triangle(
                this.x, this.y,
                this.x - 10, this.y - 5,
                this.x - 10, this.y + 5
            ); // Triangle shape
        }
    }
});
