// original l-system comes from zac garby! 

const rules = {
  //base growth and flowers
  "F": [
    { rule: "Y[++G][--G][G]",  prob: 0.5 },
    // fewer limbs
    { rule: "Y[++G][G]",  prob: 0.05 },
    { rule: "Y[--G][G]",  prob: 0.05 },
    // extra rotatio n
    { rule: "Y[+G][][G]", prob: 0.1 },
    { rule: "Y[][-G][G]", prob: 0.1 }, 
    
    { rule: "Y[++G][-G][G]", prob: 0.1 },
    { rule: "Y[+G][--G][G]", prob: 0.1 }, 
  ],
  "G": [
    {rule: "XX[++G][--G][G]", prob: 1}
  ],// G is the flowers

  //leave shoot timing
  "X": [
    {rule: "XX", prob: 0.85},
    {rule: "XXX", prob: 0.05},
    {rule: "X", prob: 0.1}
  ],
  "Y": "YZ",
  "Z": "[++++L]X[----L]X",

  //leaves
  "L": "MM[+++L][---L]L",
  "M": [
    {rule: "MMM", prob: 0.85},
    {rule: "M", prob: 0.05},
    {rule: "MM", prob: 0.1}
  ]
    }

let word = "F";
const angle = 18;
const len = 4;
const numGens = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawRules = {
    "X": () => {
    //draw line forward, reorients at the end of the line
    //growingStem();
    strokeWeight(1.5);
    stroke("#966919");
    //stroke("#228B22");
    xPos = random(-0.75,0.75);
    line(0,0,xPos,-len);
    translate(xPos, -len);
  },
    "L": () => { //leaves
    //draw line forward, reorients at the end of the line
    //growingStem();
    stroke("#966919");
    xPos = random(-2,2);
    line(0,0,xPos,-len);
    translate(xPos, -len);
  },
    "M": () => { //leaf branches
    //draw line forward, reorients at the end of the line
    //growingStem();
    stroke("#966919");
    //stroke("#228B22");
    xPos = random(-0.75,0.75);
    line(0,0,xPos,-len);
    translate(xPos, -len);
  },
    "G": () => { // L draws fruit on leaves
      // draw fruit at current location
      noStroke();
      //fill("#E5CEDC");
       fill("#F4C430");
      //fill(255;)
      circle(0, 0, len);
    },
    "+": () => {
      rotate(PI/180 * -angle);
    },
    "-": () => {
      rotate(PI/180 * angle);
    },
    "[": push, // save current location
    "]": () => {
    //noStroke();
    //fill(218, 247, 166);
    //ellipse(0,0,2, 5);
    pop(); // restore last location
  }
  }
  noLoop();
}

function draw(){
  background(28);
  
  word = "F"; //resets
  //strokeWeight(2);
  
  for (let i = 0; i < numGens; i++){
    word = generate();
    //console.log(word);
  }
  
  // draws plant (l-system)
  push();
  translate(width/2, height);
  //rotate(PI/180*ang);
  for (let i = 0; i<word.length; i++){
    let c = word[i];
    if(c in drawRules) {
      drawRules[c]();
    }
  }
  pop();
}

function mouseReleased(){
  //word = generate();
  draw();
}

function generate(){
  let next = ""
  
  for(let i = 0; i < word.length; i ++) {
    let c = word[i];
    if(c in rules) {
      let rule = rules[c];
      if(Array.isArray(rule)){
        next += chooseOne(rule);
      }
      next += rules[c];
    } else {
      next += c;
    }
  }
  
  return next;
}

function chooseOne(ruleSet) {
  let n = random();
  let t = 0;
  for (let i = 0; i < ruleSet.length; i++){
    t += ruleSet[i].prob;
    if (t>n){
      return ruleSet[i].rule;
    }
    
  }
  return "";
}

function growingStem(){
  //circle(0,0,10);
  x = 0;
  y = 0;
  stroke("#966919");
  noFill();
  stemAngle = random(PI*2);
  stemLength = width*0.001
  beginShape();
  //for (i=0;i<20;i++){
    newX = cos(stemAngle)*stemLength+x;
    newY = sin(stemAngle)*stemLength+y;
    line(x,y,newX,newY);
    curveVertex(newX,newY);
    x = newX;
    y = newY;
    stemAngle+=random(-PI*0.1,PI*0.1);
    translate(0,-len);
  //}
  endShape();
}