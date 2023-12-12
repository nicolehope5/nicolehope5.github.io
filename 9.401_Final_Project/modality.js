let lineLength = 0;
let lineSlider;
let lineTitle;

let lightIntensity = 0;
let lightSlider;
let lightTitle;

let soundFrequency = 440;
let soundSlider;
let soundTitle;

let volumeSlider;
let volumeTitle;

let oscillator;

function setup() {
createCanvas(800, 400);

  // Create a slider for controlling the line appearance
  lineSlider = createSlider(0, 200, 0);  // Adjusted the range to make the line shorter
lineSlider.position(10, height + 10);
lineTitle = createDiv('Linear Increase');
lineTitle.position(10, height + 30);

  // Create a slider for controlling light intensity
lightSlider = createSlider(0, 255, 0);
lightSlider.position(250, height + 10);
lightTitle = createDiv('Light (linear increase)');
lightTitle.position(250, height + 30);

  // Create a slider for controlling sound frequency
soundSlider = createSlider(20, 2000, 440);
soundSlider.position(490, height + 10);
soundTitle = createDiv('Sound Frequency (linear increase)');
soundTitle.position(490, height + 30);

  // Create a volume slider
volumeSlider = createSlider(0, 1, 0.5, 0.01);
volumeSlider.position(730, height + 10);
volumeTitle = createDiv('Volume');
volumeTitle.position(730, height + 30);

  // Initialize the oscillator for sound
oscillator = new p5.Oscillator('sine');
  oscillator.amp(0); // Set the initial volume to 0
oscillator.freq(soundFrequency);
oscillator.start();
}

function draw() {
background(255);

  // Set the stroke color to orange for the line
  stroke(255, 165, 0); // RGB values for orange

  // Draw the line starting from the bottom left corner
let x1 = 0;
let y1 = height;
  let x2 = lineSlider.value(); // Use the slider value directly for the line length
  let y2 = height - x2 / 2; // Adjust this line to control the slope
line(x1, y1, x2, y2);

  // Draw the light source
fill(255, 255, 0, lightIntensity);
ellipse(width / 2, height / 2, 100, 100);

  // Draw the sound visualization
fill(0, 0, 255);
ellipse(width - 100, height - 100, soundFrequency / 10, soundFrequency / 10);

  // Update values based on sliders
lightIntensity = lightSlider.value();
soundFrequency = soundSlider.value();

  // Update the sound frequency
oscillator.freq(soundFrequency);

  // Update the volume based on the volume slider
let volume = volumeSlider.value();
  oscillator.amp(volume, 0.05); // Set a small ramp time to avoid clicks

  // Draw the sound frequency slider
drawSoundSlider();
}

function drawSoundSlider() {
fill(0, 0, 255);
rect(490, height + 40, soundSlider.width, 20);
fill(255);
rect(490, height + 40, map(soundSlider.value(), soundSlider.elt.min, soundSlider.elt.max, 0, soundSlider.width), 20);
}