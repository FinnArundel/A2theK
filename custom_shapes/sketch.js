function setup() {
  createCanvas(400, 400);
  //background(220);
  frameRate(5);
}

function draw() {
  noFill();
  background(220);
  stroke(0);

  beginShape();
  curveVertex (100, 100);
  curveVertex (100, 100);
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (300, 100);
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (100, 300);
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (random (100,width-100), random (100,height-100));
  curveVertex (300, 300);
  curveVertex (300, 300);
  endShape();

}