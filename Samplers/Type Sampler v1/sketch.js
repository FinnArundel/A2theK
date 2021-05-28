let para = 'Call me Ishmael. Some years agonever mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off then, I account it high time tozz get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.';
let words = para.split (' ');
let font;

let margin;
let linespace;
let spacesize;
let charsize;
let type;

function preload () {
  font = loadFont ('data/Asemic2.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas (0,0)
  background(220);

  margin = width/12;
  // linespace = cha;
  charsize = height/30;
  linespace = charsize;

  textFont ('Helvetica');
  textSize (charsize);
  fill (0);
  stroke (0);
  strokeWeight (0.5);

}

function draw() {
  background(220);

  wdt = margin;
  hgt = height/12 + linespace;

  let spacesize = textWidth (' ');

  for (let i = 0; i < words.length; i++){
    if (wdt + textWidth(words[i]) <= width - (2*margin)){
      type [i] = new Nodepoint (wdt, hgt, i)
      type [i].display();
      wdt = wdt + textWidth(words[i]) + spacesize;
    }
     else {
      hgt = hgt + charsize;
      wdt = margin;
     }
  }
}

class Nodepoint {
  constructor (x, y, count){
    this.x = x;
    this.y = y;
    this.count = count;
  }
 
  display (){
    text (words[this.count], this.x, this.y);
  }
}