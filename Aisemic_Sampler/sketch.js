/* 
Finn Arundel, 2021
for A to the K studio, RMIT, lead by Andy Simionato and Karen ann Donnachie
Completed with inspiration / help by Karen ann Donnachie, Tiger Dingsun, and Daniel Shiffman

Typefaces used:
Aisemic by Finn Arundel
Champagne Socialist by Fergus Arundel

Libraries used:
p5.js
RiTa.js
Tone.js

Text for Markov chain:
The Communist Manifesto, by Karl Marx and Friedrich Engels
Utilitarianism, by John Stuart Mill
An Essay Concerning Humane Understanding, Volume 1, by John Locke
*/

let markov, data1, data2, data3;
let words;
let font;
let nodes = [];

let index;
let colours = ['#FF681E', '#8B6A03', '#5888D5', '#59331D', '#A07CA5', '#D80D0D']; // background colours
let colour;
let cnv;

let margin;
let linespace;
let spacesize;
let charsize;

let played = [];
let poloplayed = [];
let translated = [];
let outside = [];

let currentframe;

StartAudioContext(Tone.context).then(function(){
	//started
})

const synth = new Tone.Synth().toMaster(); // creates new synths and sets volume
synth.set({ volume: -25 });
const Polysynth = new Tone.PolySynth().toMaster();
Polysynth.set({ volume: -25 });

function preload () {
  aisemic = loadFont ('data/Aisemic.otf') // load in fonts
  mono = loadFont ('data/ChampagneSocialist.otf')

  data1 = loadStrings('data/communist.txt'); // load in text files for markov
  data2 = loadStrings('data/utilitarianism.txt');
  data3 = loadStrings('data/john_locke.txt');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight );
  textFont (aisemic);

  index = round (random (0, 5)); // selects random colour from set 
  colour = colours [index];

  markov = new RiMarkov (4);

  markov.loadText(data1.join(' '));
  markov.loadText(data2.join(' '));
  markov.loadText(data3.join(' '));

  fill ('#F2F2F2');
  noStroke ();

  regenerate (); // runs the regenerate function below
}

function draw() {
  background(colour);

  cnv.mouseMoved (userStartAudio);
  
  for (let i = 0; i < words.length; i++){
      nodes[i].show(); // displays text
    }

  push ();
  fill ('#F2F2F2')
  textFont (mono, width/80);
  text ('finn arundel. 2021 \naisemic typeface', margin, height - width/28);
  textAlign (RIGHT);
  text ('hover & click to translate\npress enter to generate new text', width - margin, height - width/28)
  pop (); // name and info displayed to screen

  }

class Nodepoint {
  constructor (x, y, r){
    this.x = x; 
    this.y = y;
    this.r = r;
  }
 
  show (){
    let bounds = aisemic.textBounds (words[this.r], this.x, this.y); // function creates box around each word

    if (translated[this.r] === false){ // if word hasn't been translated yet (default is no) then run this
      if (mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){ // when mouse goes over specifc word, done with help from Karen ann Donnachie
          textFont (mono)
          text (words[this.r], this.x, this.y);
        
          if (played[this.r] === false){ // when played once value is set to true to stop repeating sound
            synth.triggerAttackRelease("E4", "8n");
            played[this.r] = true;
          }

          if (mouseIsPressed && poloplayed[this.r] === false){ // if word is clicked, set translated to true
            translated [this.r] = true;
            Polysynth.triggerAttackRelease(["B4", "C4", "E4"], 0.5); //"B4", "C4", "E4"
            poloplayed[this.r] = true;
          }

      } else { // if mouse not inside text bound set font to aisemic (default) and reset sounds
        textFont (aisemic)
        text (words[this.r], this.x, this.y);
          played[this.r] = false;
          poloplayed[this.r] = false
        }
      } else { // if text has been translated, run this
          poloplayed[this.r] = false
          if (mouseX < bounds.x || mouseX > bounds.x+bounds.w || mouseY < bounds.y || mouseY > bounds.y + bounds.h){ // if cursor leave text bounds after translated, outside is set to true
            outside [this.r] = true;
          } 

          if (outside [this.r] === true && mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){ // only runs after outside true 
            push ();
            fill ('#0D0D0D')
            textFont (aisemic);
            text (words[this.r], this.x, this.y);
            pop ();     
            if (played[this.r] === false){
              synth.triggerAttackRelease("C4", "8n");
              played[this.r] = true;
            }
        } else {
            push ();
            fill ('#0D0D0D')
            textFont (mono);
            text (words[this.r], this.x, this.y);
            pop ();
            played[this.r] = false;
            
        }

          if (mouseIsPressed && outside [this.r] === true && mouseX > bounds.x && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h){ // untranslates text 
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

  margin = width/35; // all values dependant on width of canvas
  charsize = width/30;
  linespace = width/30;

  textSize (charsize);
  
  spacesize = textWidth (' ') ; // space seperator charactor

  wdt = margin;
  hgt = margin/2 + linespace;
     
  wdt = margin;
  hgt = margin/2 + linespace;

  nodes = [];

  for (let i = 0; i < words.length; i++){
    
    if (wdt + textWidth(words[i]) <= width - (margin)){ // if it fits the page, done with help from Karen ann Donnachie
      nodes[i] = new Nodepoint (wdt, hgt, i); 
      wdt = wdt + textWidth(words[i]) + spacesize; // space between words
    } else { // when word doesn't fit, go down line and reset wdt
      hgt = hgt + linespace; 
      wdt = margin;
      i = i - 1;
     }  
    }
  }

function generate (){

  if (index < 5){ // cycles through colours
    index ++;
  } else {
    index = 0;
  }
  colour = colours[index];
  
  words = [];
  words = markov.generateTokens(75); // creates markov chain of 75 words

  translated = []; // resets all arrays to empty before they are refiled
  outside = [];
  played = [];
  poloplayed = [];

  for (let i = 0; i < words.length; i++){ // for words length create corresponding value of false
    translated.push (false);
    outside.push (false);
    played.push (false);
    poloplayed.push (false)
  }
}

function regenerate () {
  generate ();
  reload ();
}

function windowResized () {
  resizeCanvas (windowWidth, windowHeight); // resizing without regenerating text
  reload();
}

function keyPressed (){ // when enter is pressed, generate new text and reload
  if (keyCode === ENTER){
    regenerate ();
  }
}




