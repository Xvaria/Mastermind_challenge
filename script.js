let tries = 0

let balls_ids = ['ball1', 'ball2', 'ball3', 'ball4', 'ball5', 'ball6', 'ball7', 'ball8']
let lines = ['line1', 'line2', 'line3', 'line4', 'line5', 'line6', 'line7', 'line8']
let idx
let secret = []
for (i = 0; i < 4; i++) {
  idx = Math.floor(Math.random() * balls_ids.length)
  const doc = document.querySelector("#" + balls_ids[idx])
  var colorr = getComputedStyle(doc).backgroundColor
  secret.push(colorr)
}

// Colors to use when user hit a color/position && color.
let white = "rgb(255, 255, 255)"
let red = "rgb(139, 0, 0)"

function allowDrop(ev){
  ev.preventDefault();
}

function drag(ev){
  ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
  // ev.target.id show the id where to put the ball
  var line = document.getElementById(ev.target.id).parentElement.className
  if (lines[tries] != line) {
    return;
  }
  for (elm of balls_ids) {
    if (ev.target.id == elm) {
      return;
    }
  }
  ev.preventDefault();
  var datos = ev.dataTransfer.getData("Text");
  var id = "#" + datos
  const doc = document.querySelector(id)
  var colorr = getComputedStyle(doc).backgroundColor
  document.getElementById(ev.target.id).style.background = colorr;
}

function check(ev){
  var id = ""
  var marks = 0
  const secret_tmp = secret.slice()
  for (var i = 1; i < 5; i++) {
    id = "#space" + (tries + 1) + "-" + i
    const doc = document.querySelector(id)
    var colorr = getComputedStyle(doc).backgroundColor
    if (secret_tmp[i-1] == colorr) {
      // Hit position + color == 2
      marks++;
      const class_name = "point" + (tries + 1) + "-" + marks // create string to search ID's: point(num)-(num)
      const html_class = document.querySelector("." + class_name)
      document.getElementById(class_name).style.background = red; // Set background color to the clues points.
      secret_tmp[i-1] = ""
    }
    else if (secret_tmp.includes(colorr)) {
      // Hit only color
      console.log(colorr)
      secret_tmp[secret_tmp.indexOf(colorr)] = ""
      marks++;
      const class_name = "point" + (tries + 1) + "-" + marks
      const html_class = document.querySelector("." + class_name)
      document.getElementById(class_name).style.background = white;
    }
    else {
      continue
    }
  }
  console.log(secret_tmp)
  tries++;
}
