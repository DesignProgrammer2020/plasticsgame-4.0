let video;
let poseNet;
let pose = 0;
let skeleton;

function setup() {
  // console.log("I am setting up");
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('ready');
}

function draw() {

  image(video, 0, 0);

  if (pose) {

    noStroke();

    let leftEye = pose.leftEye;
    let rightEye = pose.rightEye;
    let distEye = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);

    //yellow circles for eyes
    fill(200, 170, 50);
    circle(rightEye.x, rightEye.y, 75);
    circle(leftEye.x, leftEye.y, 75);

    let N = pose.nose;

    //left whiskers
    stroke(240);
    line(N.x, N.y, N.x - 75, N.y - 25);
    line(N.x, N.y, N.x - 75, N.y);
    line(N.x, N.y, N.x - 75, N.y + 25);
    //right whiskers
    line(N.x, N.y, N.x + 75, N.y - 25);
    line(N.x, N.y, N.x + 75, N.y);
    line(N.x, N.y, N.x + 75, N.y + 25);

    //pink circle for nose
    fill(255, 150, 150);
    circle(N.x, N.y, 50);

    let leftEar = pose.leftEar;
    let rightEar = pose.rightEar;
    let distEar = dist(rightEar.x, rightEar.y, leftEar.x, leftEar.y);

    //small red circles as earrings
    fill(255, 0, 0);
    circle(rightEar.x, rightEar.y + 35, 20);
    circle(leftEar.x, leftEar.y + 35, 20);

    let lW = pose.leftWrist;
    let rW = pose.rightWrist;
    let dW = dist(rW.x, rW.y, lW.x, lW.y);

    //green ellipses for wrists
    fill(0, 100, 0);
    ellipse(rW.x, rW.y, 175, 75);
    ellipse(lW.x, lW.y, 175, 75);

    let lS = pose.leftShoulder;
    let rS = pose.rightShoulder;
    let dS = dist(rS.x, rS.y, lS.x, lS.y);

    //blue circles for shoulders
    fill(0, 80, 200);
    circle(rS.x, rS.y, 100);
    circle(lS.x, lS.y, 100);

    let leftElbow = pose.leftElbow;
    let rightElbow = pose.rightElbow;
    let distELbow = dist(rightElbow.x, rightElbow.y, leftElbow.x, leftElbow.y);

    //orange circles for elbows
    fill(255, 150, 0);
    circle(rightElbow.x, rightElbow.y, 100);
    circle(leftElbow.x, leftElbow.y, 100);

    let lH = pose.leftHip;
    let rH = pose.rightHip;
    let dH = dist(rH.x, rH.y, lH.x, lH.y);

    //purple circles for hips
    fill(100, 60, 180);
    circle(rH.x, rH.y, 150);
    circle(lH.x, lH.y, 150);

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 80, 255);
      circle(x, y, 40);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}
