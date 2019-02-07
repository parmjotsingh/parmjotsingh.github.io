let poleNumber=0;
var remove =0;
let pos=[];
let ballVelocity=0;
var bird;
var scoreIncrement=0;

var score;

function setup() {
  createCanvas(600,400);
  // if((width % 200) >100 ){
  //   remove=1;
  // }
  ballVelocity=height/2;
  poleNumber=width/200;
  for(i=0;i<poleNumber;i++){
    pos[i]=new pole(i);
  }
  bird=new Bird();
  score=document.getElementById('scoreResult');
   // frameRate(5);
}

let position=300;

let x=100,diff=200;
let wide=40;
let wait=0;
let change=02;
let velocityDrop=0;
let j=0;
function draw() {
  background(100);
  for(let i=0 ; i<poleNumber ; i++){
    pos[i].position=pos[i].position-change;
    if(bird.x >= (pos[i].position+wide) && pos[i].pass == false){
        scoreIncrement++;
        score.innerHTML=scoreIncrement;
        pos[i].pass=true;
        // j++;
        // if(j==2){
        //   j=0;
        // }
    }
    if(pos[i].hits(bird,pos[i].position)){
      console.log("Hits");
      scoreIncrement=0;
      frameRate(0);
      document.getElementById("gameover").style.opacity=1;
    }
    // else {
    //   scoreIncrement++;
    //   score.innerHTML=scoreIncrement+"px";
    // }
    if(pos[i].highlight==true){
      fill(255,0,80);
    }else {
        fill(0,255,80);
    }

    if(pos[i].position <= -1){
      pos[i].position=width+1;
      pos[i].poleHeight=random(1,300);
      pos[i].pass=false;
    }
    rect(pos[i].position,height,wide,-pos[i].poleHeight);
    rect(pos[i].position,0,wide,height-pos[i].poleHeight-diff);
  }

  bird.show();
  bird.update();
}

function keyPressed(){
  if(key == ' '){
      bird.up();
  }
  if(key == 's'){
    start();
  }
}
function Bird(){


    this.y=height/2;
    this.x=100;
    this.size=30;
    this.gravity=0.6;
    this.lift=-15;
    this.velocity=0;


  this.show =function(){
      fill(255,255,80);
      ellipse(this.x,this.y,this.size,this.size);
  }

  this.up =function(){
      this.velocity +=this.lift;
      this.y +=this.velocity;
  }

  this.update= function(){
    this.velocity += this.gravity;
    this.velocity*=0.9;
    this.y += this.velocity;

    if(this.y > height-15){
      this.y=height-15;
      this.velocity=0;
    }
    if(this.y < 15){
      this.y=15;
      this.velocity=0;
    }
  }
}
class pole{
  constructor(x){
    this.position=200+(200*x);
    this.poleHeight=random(1,300);
    this.highlight=false;
    this.pass= false;
  }
  hits(bird,Xposition){
    if((bird.y >= (height-this.poleHeight-15) || ( bird.y <= (height-this.poleHeight-diff+15) ) )){
      if(bird.x >= (Xposition-15) && bird.x <=(Xposition+wide+15)){
        console.log(bird.y +"   " +(height-this.poleHeight-15)+"  "+(height-this.poleHeight-diff+15));
        this.highlight=true;
        return true;
      }
    }
    this.highlight=false;
    return false;
  }
}

function start(){
  document.getElementById("gameover").style.opacity=0;
  console.log("start");
  for(i=0;i<poleNumber;i++){
    pos[i]=new pole(i);
    score.innerHTML=0;
    bird=new Bird();
    frameRate(80);
  }
}
// position=position-change;
// if(position <= -1){
//   position=401;
//   x=random(1,300);
// }
// rect(position,height,wide,-x);
// rect(position,0,wide,height-x-diff);

// for(let i=wide;i<width-wide;i+=wide*2){
//   x=random(1,300);
//   rect(i,height,10,-x);
//   rect(i,0,10,height-x-diff);
// }
