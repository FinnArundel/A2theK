let array_text = [];
let gen_text;
let display_text;
let edit_array;
let seperator = ' ';

let words = [];
let font;
let nodes = [];

let margin;
let linespace;
let spacesize;
let charsize;

function preload () {
  aisemic = loadFont ('data/Aisemic.otf');
  mono = loadFont ('data/Mono.otf');
  
}

function setup (){
  createCanvas(windowWidth, windowHeight * 4);
  background('#F2F2E9');

  deepai.setApiKey('a2551a63-3ecb-4af3-9234-7539c32e55ff');
}

(async function() {
  var resp = await deepai.callStandardApi("text-generator", {
          text: "I first met Dean not long after my wife and I split up. I had just gotten over a serious illness that I won't bother to talk about, except it had something to do with the miserably weary split-up and my feeling that everything was dead.",
  });
  gen_text = str (resp.output);
  array_text = gen_text.split (' ');
  words = array_text.slice (46, array_text.length);
  start ();
})()

function start() {

  margin = width/8;

  charsize = width/25;
  linespace = width/24 ;
  
  textSize (charsize);
  noStroke ();
  textFont (aisemic);
  cursor ('auto');

  wdt = margin;
  hgt = margin/2 + linespace;

  spacesize = textWidth (' ');

  for (let i = 0; i < words.length; i++){
    
    if (wdt + textWidth(words[i]) <= width - (margin)){ // if it fits the page
      
      nodes[i] = new Nodepoint (wdt, hgt, i); 
      wdt = wdt + textWidth(words[i]) + spacesize;
      
    } else {
      
      hgt = hgt + linespace;
      wdt = margin;
      i = i - 1;
     }
     
  }
}


function draw() {
  background('#F2F2E9');

  stroke ('#0D0D0D');
  fill ('#0D0D0D');
  strokeWeight (1);
  
  
  for (let i = 0; i < words.length; i++){
      nodes[i].show();
    }

  }

class Nodepoint {

  constructor (x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
 
  show (){
    let bounds = aisemic.textBounds (words[this.r], this.x, this.y);
    if (mouseX > bounds.x -10 && mouseX < bounds.x+bounds.w +10 && mouseY > bounds.y -10 && mouseY< bounds.y + bounds.h +10){
      textFont (mono)
      text (words[this.r], this.x, this.y);
    }
    else {  
      textFont (aisemic)
      text (words[this.r], this.x, this.y);
      
    }
  }
}

