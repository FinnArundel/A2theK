let markov, data1, data2, data3;
let words;
let font;
let nodes = [];

let index;
let colours = ['#FF681E', '#8B6A03', '#5888D5', '#59331D', '#A07CA5', '#D80D0D'];
let colour;

let margin;
let linespace;
let spacesize;
let charsize;

let played = [];
let poloplayed = [];
let translated = [];
let retranslated = [];
let outside = [];

let currentframe;

const synth = new Tone.Synth().toMaster();
synth.set({ volume: -25 });
const Polysynth = new Tone.PolySynth().toMaster();
Polysynth.set({ volume: -25 });

function preload () {
  aisemic = loadFont ('data/Aisemic.otf')
  mono = loadFont ('data/ChampagneSocialist.otf')

  data1 = loadStrings('data/communist.txt');
  data2 = loadStrings('data/utilitarianism.txt');
  data3 = loadStrings('data/john_locke.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight );
  textFont (aisemic);

  StartAudioContext(Tone.context).then(function(){
    //started
  })
 
  index = round (random (0, 5));
  colour = colours [index];

  markov = new RiMarkov (4);

  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));
  markov.loadText(data3.join(' '));

  fill ('#F2F2F2');
  noStroke ();

  regenerate ();

}

function draw() {
  background(colour);

  for (let i = 0; i < words.length; i++){
      nodes[i].show();
    }

  push ();
  fill ('#F2F2F2')
  textFont (mono, 22);
  text ('finn arundel. 2021 \naisemic typeface', margin, height - width/28);
  textAlign (RIGHT);
  text ('hover & click to translate\npress enter to generate new text', width - margin, height - width/28)
  pop ();


  }

class Nodepoint {
  constructor (x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
 
  show (){
    let bounds = aisemic.textBounds (words[this.r], this.x, this.y);
    let bounds2 = mono.textBounds (words[this.r], this.x, this.y);

    if (translated[this.r] === false){
      if (mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){

          textFont (mono)
          text (words[this.r], this.x, this.y);
        
          if (played[this.r] === false){
            synth.triggerAttackRelease("E4", "8n");
            played[this.r] = true;
          }

          if (mouseIsPressed && poloplayed[this.r] === false){
            translated [this.r] = true;
            Polysynth.triggerAttackRelease(["B4", "C4", "E4"], 0.5); //"B4", "C4", "E4"
            poloplayed[this.r] = true;
          }

      } else {  
        textFont (aisemic)
        text (words[this.r], this.x, this.y);
          played[this.r] = false;
          poloplayed[this.r] = false
        }
      } else {
          poloplayed[this.r] = false
          if (mouseX < bounds.x || mouseX > bounds.x+bounds.w || mouseY < bounds.y || mouseY > bounds.y + bounds.h){ // if cursor leave text bounds after translated outside is set to true
            outside [this.r] = true;
            print ('im outside')
          } 

          if (outside [this.r] === true && mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){
            fill ('#0D0D0D')
            textFont (aisemic);
            text (words[this.r], this.x, this.y);
            fill ('#F2F2F2');      
            if (played[this.r] === false){
              synth.triggerAttackRelease("C4", "8n");
              played[this.r] = true;
            }
        } else {
            fill ('#0D0D0D')
            textFont (mono);
            text (words[this.r], this.x, this.y);
            fill ('#F2F2F2')
            played[this.r] = false;
            
        }

          if (mouseIsPressed && outside [this.r] === true && mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){
            translated[this.r] = false;
            outside[this.r] = false;
            if (poloplayed[this.r] === false){
              Polysynth.triggerAttackRelease(["C4", "E4", "A4"], 0.5);
              poloplayed[this.r] = true;
            }        
          }
        }
      }
    }
  
  

function reload (){

  margin = width/35;
  charsize = width/30;
  linespace = width/30;

  textSize (charsize);
  
  spacesize = textWidth (' ') ;

  wdt = margin;
  hgt = margin/2 + linespace;
     
  wdt = margin;
  hgt = margin/2 + linespace;

  nodes = [];

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

function generate (){

  if (index < 5){
    index ++;
  } else {
    index = 0;
  }
  colour = colours[index];
  

  words = [];
  words = markov.generateTokens(75);

  translated = [];
  outside = [];
  played = [];
  poloplayed = [];

  for (let i = 0; i < words.length; i++){
    translated.push (false);
    retranslated.push (false);
    outside.push (false);
    played.push (false);
    poloplayed.push (false)
  }
}

function regenerate () {
  
  generate ();
  reload ();
  print (words);
}

function windowResized () {
  resizeCanvas (windowWidth, windowHeight);
  reload();
}


function keyPressed (){
  if (keyCode === ENTER){
    regenerate ();
  }
}
  




