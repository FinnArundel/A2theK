let x_cords = [100, 300, 100, 300];
let y_cords = [100, 100, 300, 300];

function setup() {
  createCanvas(400, 400, SVG);
  //background (220);
  frameRate (10);
}

function draw() {
  //background(220);
  fill (0);
  noFill ();
  stroke (0);
  strokeWeight (4);

  
 
  let new_x_cords = shuffle (x_cords);
  let new_y_cords = shuffle (y_cords); // shuffles the array to create random set

  test_x_cords = join(new_x_cords, '');
  test_y_cords = join(new_y_cords, '');
 

  if ((join(new_x_cords, '') === join (new_y_cords, '')) || ( test_x_cords === '100300100300' && test_y_cords === '300100300100') || ( test_x_cords === '300100300100' && test_y_cords === '100300100300') || ( test_x_cords === '300100100300' && test_y_cords === '100300300100') || ( test_x_cords === '100300300100' && test_y_cords === '300100100300') || ( test_x_cords === '100100300300' && test_y_cords === '300300100100') || ( test_x_cords === '300300100100' && test_y_cords === '100100300300')){

     new_x_cords = shuffle (x_cords);
     new_y_cords = shuffle (y_cords); 

  }

  else {

    beginShape ();
    curveVertex (new_x_cords[0], new_y_cords[0]);
    curveVertex (new_x_cords[0], new_y_cords[0]);

    curveVertex (random (100,width-100), random (100,height-100));

    curveVertex (new_x_cords[1], new_y_cords[1]);

    curveVertex (random (100,width-100), random (100,height-100));

    curveVertex (new_x_cords[2], new_y_cords[2]);

    curveVertex (random (100,width-100), random (100,height-100));

    curveVertex (new_x_cords[3], new_y_cords[3]);
    curveVertex (new_x_cords[3], new_y_cords[3]);

    endShape ();
    
    save ();
    
    clear ();
    
  }

//  save ('glyph.svg');

}

function keyPressed (){
  if (keyCode === ENTER){
    noLoop ();
    save ();
  }
}
