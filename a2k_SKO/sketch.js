let menu_sentence = 'contextualisation, design systems, ai & ml, accessible software, collaboration, future application';
let items = menu_sentence.split (',');
let node = [];
let paragraph = document.querySelector('p');
let initial_width, initial_height;
let new_x, new_y;
let over_word = [];
let clicked_word = [];
let dragging;

const synth = new Tone.DuoSynth().toMaster();
synth.set({ volume: -15});
const synthNotes = ["C2", "E2", "G2", "A2",
			"C3", "D3", "E3", "G3", "A3", "B3",
			"C4", "D4", "E4", "G4", "A4", "B4", "C5"];

function preload (){
  mono = loadFont ('data/ChampagneSocialist-Mono.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initial_width = width;
  initial_height = height
  textFont (mono);
  textAlign (CENTER);
  noStroke ();
  dragging = false;
  for (let i = 0; i < items.length; i++){
    over_word.push (false);
    clicked_word.push (false)
    wdt = random (width/12,width - width/12);
    hgt = random (height/12,height - height/12);
    node[i] = new Nodepoint(wdt, hgt, i)
  }
  clicked_word[0] = true;
}

function draw() {
  clear ();
  textSize (width/52);
  new_x = width/initial_width;
  new_y = height/initial_height;
  for (let i = 0; i < items.length; i++){
    node[i].connect ();
  }
  for (let i = 0; i < items.length; i++){
    node[i].show(); 
  }
}

class Nodepoint {
  constructor (x, y, r) { 
    this.x = x;
    this.y = y; 
    this.r = r;
  }

  connect (){
    push ()
    noFill ();
    stroke ('#F2F2F2');
    strokeWeight (width/1150);
    beginShape ();
    curveVertex (node[0].x * new_x, node[0].y * new_y);
      for (let i = 0; i < items.length; i++){
        curveVertex (node[i].x * new_x, node[i].y * new_y);
      }
    curveVertex (node[items.length -1].x * new_x, node[items.length -1].y * new_y);
    endShape();
    pop ()
  }

  show () {
    let bounds = mono.textBounds (items[this.r], this.x * new_x, this.y * new_y); // function creates box around each word
    if (mouseX > bounds.x  && mouseX < bounds.x+bounds.w && mouseY > bounds.y && mouseY< bounds.y + bounds.h & dragging == false){  // when mouse goes over specifc word, done with help from Karen ann Donnachie
      fill ("#F3FF1F");
      text (items[this.r], this.x * new_x, this.y * new_y);
      over_word[this.r] = true; 
    } else {
      if (clicked_word[this.r] == true){
        fill (243,244,31);
      } else {
        fill (242,242,242);
      }
      text (items[this.r], this.x * new_x, this.y * new_y);
    }
    if ((mouseX < bounds.x || mouseX > bounds.x+bounds.w || mouseY < bounds.y || mouseY > bounds.y + bounds.h) & mouseIsPressed == false){ 
      over_word[this.r] = false;
      dragging = false;
      synth.triggerRelease();
    }
    let note = synthNotes[round (map(mouseY, height, 0, 0, synthNotes.length))]
    synth.setNote(note);
    if (over_word[this.r] == true & mouseIsPressed){
      this.x = mouseX/new_x;
      this.y = mouseY/new_y;
      dragging = true;
      clicked_word = [];
      for (let i = 0; i < items.length; i++){
        clicked_word.push (false) 
      }
      clicked_word[this.r] = true;
      synth.triggerAttack(note);
      if (this.r == 0){
        paragraph.innerText = 'The A to the K Computational Typography studio is an introduction into the world of typography and code. The combination of these design fields aims to give the designer the ability to engage with their audience through immersive and interactive experiences with type through the browser and other mediums.\n\nThe studio highlights approaches to modern typography such as variable typography and the innovation it brings to design, particular for interactive experiences. A type design agency like ABC Dinamo creates typefaces that are able to dynamically change weight and other variables to adjust for any context.\n\nA personal approach I took to this studio was exploring the relationship between the computer and designers. During the course of the semester I became interested in how the computer is able to take over as well as assist in creative work through approaches such as programmable design systems and the use of Artificial Intelligence.\n\nThe studio consisted of both in person and online learning, often exploring coding in our Tuesday classes and typography on Thursday. Throughout the semester we would share case studies to help with our research, learn different coding techniques, as well as learn typographical fundamentals. The studio was a collaborative space which encouraged sharing of ideas and progress of our final assignments. ';
      }
      if (this.r == 1){
        paragraph.innerText = 'During my work in the studio I came to realise the possibility of creating rules based design systems to assist in the creative process. Inspired by the instructional artworks of Sol LeWitt I have gained an understanding of how some designs are able to be broken down into programmable systems. This style of working has the possibility of benefitting artists and designers by making the most of computers ability to do repetitive tasks extremely quickly and precisely, while freeing the artist up pursue more creative tasks.\n\nSol LeWitt focused on the application of systems mainly in conceptual and installation art, however I am curious about how these same systems are able to be applied to graphic design and typography. Rune Madsen’s free digital book Programming Design Systems explores this possibility. He breaks down how these systems are able to be used in shape, colour and layout, with more topics soon to be covered.\n\nDuring the course of the semester I was heavily inspired by Jannis Marosheck’s book, Shape Grammars. In the book he utilises this style of working through programming several design systems he uses to produce around 150,000 unique shapes. My own rules based asemic typeface follows a similar method.\n\nComputers have already revolutionised all fields of production, including graphic design. This style of creative production applying modern technology is only another step in relationship between designer and computer. I hope to apply this new style of working in my future design practice.';
      }
      if (this.r == 2){
        paragraph.innerText = 'Another theme that follows on from this understanding of design systems is the possibility of utilising Artificial Intelligence and Machine Learning in the creative process. Similar to the application of design systems, AI and ML have the possibility of completely revolutionising the designer’s relationship with the computer.\n\nI’m very interested in seeing the methods of these technologies being applied in creative ways from artists such as Refik Anadol. Although I might not have an complete understanding about how to create and utilise these technologies I hope to learn more about this field in the future.\n\nThe fields of AI and ML are very interesting however do pose some important ethical questions. Will this technology end the need for the designer? How do these algorithms do what they do? What datasets are these algorithms based on? And how are these datasets created? How might this technology be exploited in a capitalistic society? These questions should be asked when working with these technologies.';
      }
      if (this.r == 3){
        paragraph.innerText = 'Through working with FontForge and Processing / p5.js, I have gained an understanding and appreciation for free software and its ability to permit designers to be creative without the need for paid software from virtually monopolistic businesses such as Adobe.\n\nAlthough I understand that we should pay for services that we benefit from, free services offer the ability to particular under-funded individuals such as students to experiment, without the need for expensive programs.\n\nApart from these free stand-alone software, I have also gained an appreciation for open-source libraries. Being a bit more experienced with code allowed me to experiment more with different libraries for my type-sampler. The variety of different JavaScript libraries I researched really showed me the amazing sharing spirit of the coding community. ';
      }
      if (this.r == 4){
        paragraph.innerText = 'We were lucky to be able hold some in person studio classes throughout the semester. These classes helped reminded me how much I enjoyed working in a collaborative environment. In the studio class when we discussed the layout/design of the whole class website I thought it was really interesting how the final idea came together from input from lots of different students.\n\nThe variety of work done by the students in the studio also showed me how collaboration is able to bring together ideas that you would never think of working as an individual. In the future I really hope to collaborate more, not just with designers but with professionals in different fields such as AI.';
      }
      if (this.r == 5){
        paragraph.innerText = 'In my future design practice I feel I will continue a exploration into how technology can be used in a creative ways. The use of technology whether programmable design systems or Artificial Intelligence shows huge potential to revolutionise the way designers interact and work with the computer.\n\nI have come to the understanding that these technologies are able to be used in collaboration with the creatives and do not necessarily mean that computers are going to end the need for designers. Thoughtful application of technology while also leaving room for a human touch and creatively could be a workflow I adopt in my future practice.\n\nI hope to further my knowledge of code and technology through experimentation and maybe some online courses. I want to focus on experimenting with GANs to create graphics as well as working with lighting and visuals for audio performances.';
      }
    } 
  }  
}

function windowResized () {
  resizeCanvas (windowWidth, windowHeight);
}