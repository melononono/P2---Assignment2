// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 

let video;
let pose;


r = 200;
g = 0;
b = 0;

let size = 50;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

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
    if (pose) {
        fill(r, g, b);
        noStroke();
        ellipse(pose.nose.x, pose.nose.y, size);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 40);

        if (pose.rightWrist.y < 300) { //if the right wrist appears on the screen, the nose ellipse will disappear
            r = 0;
            size = 0;
        } else { //the nose ellipse stays on the screen
            r = 200;
            size = 40;

        }


    }

}
