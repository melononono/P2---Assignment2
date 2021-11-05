// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 

let video;
let pose;

let audio;

r = 255;
g = 213;
b = 91;

let size = 30;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
    audio = createAudio('assets/song.mp3');
}

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }

}

function draw() {
    image(video, 0, 0);
    stroke(0, 0, 0); //drawing the rectangle and the text on the top of the screen
    strokeWeight(3);
    textSize(20);
    rect(15, 20, 600, 80, 10);
    text('Hover your right arm here to play music!', 160, 65);

    if (pose) {
        fill(r, g, b);
        noStroke();
        ellipse(pose.rightWrist.x, pose.rightWrist.y, size);

        if (pose.rightWrist.y < 90) { //if the right wrist is above a certain high the audio will be played
            audio.play();
            r = 93;
            g = 141;
            b = 244;
        } else {
            audio.stop(); //if the right wrist doesn't reach the height, nothing will happen
            r = 255;
            g = 213;
            b = 91;
        }
    }
}
