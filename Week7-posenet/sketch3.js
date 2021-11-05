// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 

let video;
let pose;
let img1, img2, img3;

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
    img1 = loadImage('images/moustache.png');
    img2 = loadImage('images/pipe.png');
    img3 = loadImage('images/hat.png');
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
    if (pose) { //adding images onto the face
        image(img1, pose.nose.x - 50, pose.nose.y, 100, 50); //pose.nose.x - 50 is repositioning the image so it matches up with the facial features
        image(img2, pose.nose.x - 100, pose.nose.y + 30, 100, 50);
        image(img3, pose.leftEye.x - 140, pose.leftEye.y - 170, 200, 150);
    }


}
