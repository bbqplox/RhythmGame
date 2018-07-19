class Note {
    constructor(id, mt, x, y) {
      this.id = id;
      this.movetime = mt;
      this.x = x;
      this.y = y;
    }
}

var song = document.getElementById("song");
// console.log(x.duration); shit doesn't work here

var t = 180;
var b = 4;
var tm;
var m;

var lines;
var notes = []
var spawnedNotes = []

jQuery.get('/input.txt', function(data){
  lines = data.split(/,|\n/);
  lines = lines.filter(function(element) {return element !== ""; });
  spawnedNotes = Array(lines.length).fill(0);
  // console.log(lines);
});

function start() {
      console.log(song.duration); // in seconds?

      tm = (song.duration*(t/60))/4;
      console.log(tm);
      song.play();
}

var canvas = document.getElementsByTagName("canvas")[0]; //get the canvas dom object
var ctx = canvas.getContext("2d"); //get the context

var redraw = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  for (i = 0; i < notes.length; i++){
    ctx.beginPath();  //draw the object c
    ctx.rect(notes[i].x,notes[i].y,25,25);
    ctx.closePath();
    ctx.fill();
  }
  requestAnimationFrame(function(){redraw()});
}

function spawnNote(location){
  notes.push(new Note(0,0,location,canvas.height));
}

var state = 0;

function move(){
  // Math.random() // this returns a float between 0.0 and 1.0
  // console.log(notes[0].y);
  //m = (song.currentTime*(t/60))/4; // current measure
  // console.log(m);

  moveamnt = canvas.height/8

  for (i = 0; i < notes.length; i++){
    notes[i].y = notes[i].y - moveamnt;
    if(notes[i].y < 30){
      notes.splice(0,1);
    }
  }


  // console.log(notes.length);

}

function noteTime(){
  // only works for 1/4 notes
  // console.log(lines[parseInt(song.currentTime*(t/60))]);
  // console.log(parseInt(song.currentTime*(t/60)));
  currMeasure = parseInt(song.currentTime*(t/60));



  for (i = 0; i < lines[currMeasure].length; i++){
    if(lines[currMeasure][i] != '0' && spawnedNotes[currMeasure] != 0){
      // console.log(lines[parseInt(song.currentTime*(t/60))][0]);
      spawnNote(i*30 + 20);
    }
  }

  console.log(lines[currMeasure])
  spawnedNotes[currMeasure] = 1;
}


redraw();
setInterval(function(){move()}, 187.5);
setInterval(function(){noteTime()}, 50);
