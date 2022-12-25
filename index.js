document.addEventListener('contextmenu', event => event.preventDefault());
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

let start = 1;
stopBtn.style.display = 'none';

startBtn.addEventListener('click', ()=> {
  if(start === 1){
    start = start+1
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';
  }
})

stopBtn.addEventListener('click', ()=> {
  if(start === 2){
    start = start - 1
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
  }
})

let fr = 20; 
class Square {
  constructor(xAxis, yAxis, length, alive){
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.length = length;
    this.alive = alive;
    this.neighbor = [];
    this.nalive = 0;
  }

  draw(){
    if(this.alive === 1){
      fill(255, 255, 255);
      rect(this.xAxis, this.yAxis, this.length, this.length);
    }else{
      
      fill(100, 100, 100)
      rect(this.xAxis, this.yAxis, this.length, this.length);
    }
  }

  getNeighbor(array){
    let first = {
      nxAxis: this.xAxis - this.length,
      nyAxis: this.yAxis - this.length
    };

    let second = {
      nxAxis: this.xAxis,
      nyAxis: this.yAxis - this.length
    };

    let third = {
      nxAxis: this.xAxis + this.length,
      nyAxis: this.yAxis - this.length
    };

    let fourth = {
      nxAxis: this.xAxis + this.length,
      nyAxis: this.yAxis
    };

    let fifth = {
      nxAxis: this.xAxis + this.length,
      nyAxis: this.yAxis + this.length
    };

    let sixth = {
      nxAxis: this.xAxis,
      nyAxis: this.yAxis + this.length
    };

    let seventh = {
      nxAxis: this.xAxis - this.length,
      nyAxis: this.yAxis + this.length
    };

    let eigthth = {
      nxAxis: this.xAxis - this.length,
      nyAxis: this.yAxis
    };

    const neighbor = [first, second, third, fourth, fifth, sixth, seventh, eigthth];
    for(let i=0; i < array.length; i++){
      for(let j=0; j < neighbor.length; j++){
        if(neighbor[j].nxAxis === array[i].xAxis && neighbor[j].nyAxis === array[i].yAxis){
          this.neighbor.push(array[i]);
        }
      }
    }
  }

  getNalive(){
    let total = 0;
    for(let i = 0; i < this.neighbor.length; i++){
      if(this.neighbor[i].alive === 1){
        total = total + 1;
      }
    }
    this.nalive = total;
  }
}

var squareArray = [];
const length = 10;

function setup() {
  frameRate(fr)
  createCanvas(1000, 1000);
  background(0)
  for(x=0; x < windowWidth; x+= length){
    for(y=0; y < windowHeight; y+= length){
      let squ =  new Square(x, y, length, 0, 0);
      squ.draw();
      squareArray.push(squ)
    }
  }

  for(i=0; i < squareArray.length; i++){
    squareArray[i].getNeighbor(squareArray)
    squareArray[i].getNalive()
    squareArray[i].getNalive()
  }
}

function draw() {
  for(x=0; x < squareArray.length; x++){
    let a = squareArray[x]
    a.draw(squareArray[x].xAxis, squareArray[x].yAxis, squareArray[x].length, squareArray[x].alive)
  }

  if(start > 1){
    console.log("heelo world");
    for(x=0; x < squareArray.length; x++){ 
      squareArray[x].getNalive()
    }
    for(x=0; x < squareArray.length; x++){

      let a = squareArray[x].nalive
      
      // rulesss
      if( squareArray[x].alive ===  1 && a < 2){
        squareArray[x].alive = 0;
      }else if(squareArray[x].alive ===  0 && a === 3){
        squareArray[x].alive =  1;
      }else if(squareArray[x].alive ===  1 && a > 3 ){
        squareArray[x].alive =  0;
      }else if(squareArray[x].alive ===  1 && (a === 3 || a === 2)){
        squareArray[x].alive =  1;
      }
    }
    
  }
}

function mouseClicked() {
  
  xrem =  (Math.ceil(mouseX / length) * length) - length;
  yrem =  (Math.ceil(mouseY / length) * length) - length;

  for(x=0; x < squareArray.length; x++){
    squareArray[x].getNalive()
    if(xrem === squareArray[x].xAxis && yrem === squareArray[x].yAxis){
      if(squareArray[x].alive === 0){
        squareArray[x].alive = 1
      }else{
        squareArray[x].alive = 0
      }
    }
  }
}

function doubleClicked() {
  xrem =  (Math.ceil(mouseX / length) * length) - length;
  yrem =  (Math.ceil(mouseY / length) * length) - length;

  for(x=0; x < squareArray.length; x++){
    squareArray[x].getNalive()
    if(xrem === squareArray[x].xAxis && yrem === squareArray[x].yAxis){
      console.log(squareArray[x].nalive);
    }
  }
}

// function windowResized() {
//   //resizeCanvas(windowWidth, windowHeight)
//   background(222);
//   squareArray = [];
//   for(x=0; x < windowWidth; x+= length){
//     for(y=0; y < windowHeight; y+= length){
//       let squ =  new Square(x, y, length, 0);
//       squ.draw();
//       squareArray.push(squ)
//     }
//   }
// }