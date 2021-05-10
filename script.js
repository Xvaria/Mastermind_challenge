// tries of user for each row
let tries = 0;

// Balls ids colors to check if user try to swap between them.
let balls_ids = ['ball1', 'ball2', 'ball3', 'ball4', 'ball5', 'ball6', 'ball7', 'ball8'];
// Row num to allow only drop in the correct line.
let lines = ['line1', 'line2', 'line3', 'line4', 'line5', 'line6', 'line7', 'line8'];

/*
@idx: index to select some random ball.
@secret: Array of the secret combination of colors.
@doc: html items with specific tag.
@colorr: get the random color by using getComputedStyle to retrieve an attribute.
*/
let idx;
let secret = [];
for (i = 0; i < 4; i++) {
  // Get a random num for index of balls.
  idx = Math.floor(Math.random() * balls_ids.length);
  const doc = document.querySelector("#" + balls_ids[idx]);
  var colorr = getComputedStyle(doc).backgroundColor;
  secret.push(colorr);
}

// Colors to use when user hit a color/position && color.
let white = "rgb(255, 255, 255)";
let red = "rgb(139, 0, 0)";

// Allow user where to drop the draggable item.
function allowDrop(ev){
  // Prevent from being dropped instantly.
  ev.preventDefault();
}

// Allow user to drag the item.
function drag(ev){
  // We can know which item is dragged by using dataTransfer.
  ev.dataTransfer.setData("Text",ev.target.id);
}

// Execute code when the user dropped the item in a droppable item.
function drop(ev){
  // ev.target.id show the id where to put the ball, we get parentElement.classname to know which line is it dropping.
  var line = document.getElementById(ev.target.id).parentElement.className;

  // If the variable tries doesn't match with the line where is the ball being dropped, it return the ball to the original position.
  if (lines[tries] != line) {
    return;
  }

  // Check if user is trying to drop a ball in another ball.
  for (elm of balls_ids) {
    if (ev.target.id == elm) {
      return;
    }
  }

  ev.preventDefault();
  /*
  @data: get the element being dropped (not where is it being dropped.)
  @id: concatenate "#" and the element to find the background color.
  @doc: element which contains the data.
  @colorr: color of the background of the ball being dropped
  */
  var data = ev.dataTransfer.getData("Text");
  var id = "#" + data;
  const doc = document.querySelector(id);
  var colorr = getComputedStyle(doc).backgroundColor;
  // set the background color to the rows balls to the ball being dropped there.
  document.getElementById(ev.target.id).style.background = colorr;
}

// Button check to see if the balls are in correct place and have the correct color.
function check(ev){
  check_tries()
  /*
  @id: used to put the id of the space in row. (space1-1, space1-2...space8-8.)
  @marks: clue panel (left panel) where to put the white or red ball.
  @secret_tmp: secret combination copy.
  @d0c: document tag.
  @class_name: name of the clAass point1-1, point1-2... point8-8.
  @html_class: name of the html class 
  @rgb: rgb num used to change the background color and not repeat the correct answers.
  */
  var id = "";
  var marks = 0;
  var corrects = 0;
  const secret_tmp = secret.slice();
  for (var i = 1; i < 5; i++) {
    id = "space" + (tries + 1) + "-" + i;
    const doc = document.querySelector("#" + id);
    var colorr = getComputedStyle(doc).backgroundColor;

    if (secret_tmp[i-1] == colorr) {
      // Hit position + color == 2
      // marks == ckues, each moment you give correct answer, this will add the point to the correct clue.
      marks++;
      const class_name = "point" + (tries + 1) + "-" + marks; // create string to search ID's: point(num)-(num) 
      const html_class = document.querySelector("#" + class_name); // Select the query in order to change the background
      document.getElementById(class_name).style.background = red; // Set background color to the clues points.
      secret_tmp[i-1] = ""; // Set empty string to the item where user put the correct ball.
      var rgb = parseInt(colorr.slice(0, -1).split(",")[2]) + 1; // Get the last digits of the rgb.
      document.getElementById(id).style.background = colorr.split(",").splice(0, 2) + ", " + rgb + ")"; // Increment the last digit of rgb by 1 to not be equal again.
      corrects++;
    }
  }
  // IF USER WINS:
  if (corrects == 4) {
    tries = 8;
    alert('You win! You are a real master mind.');
    for (var i = 1; i <= 4; i++) {
      const victory = "victory" + i;
      document.getElementById(victory).style.backgroundColor = secret[i - 1];
    }
    document.getElementById('secret').style.backgroundColor = '#865c2f';
    return;
  }
  for (var j = 1; j < 5; j++) {
    id = "#space" + (tries + 1) + "-" + j; // Get the hole of the line.
    const doc = document.querySelector(id); // Select this one to get the color of the hole.
    var colorr = getComputedStyle(doc).backgroundColor; // Get the color of the respective id.
    if (secret_tmp.includes(colorr)) { // Check if the color exists in the secret combination
      // Hit only color
      marks++;
      const class_name = "point" + (tries + 1) + "-" + marks; // Select the point where to put the white point
      secret_tmp[secret_tmp.indexOf(colorr)] = ""; // Set empty string where the color were found.
      const html_class = document.querySelector("#" + class_name); // Select the space where the clue space is.
      document.getElementById(class_name).style.background = white; // Put white color to it.
    }
  }
  tries++; // Increment tries when user press check buttom.
  check_tries()
}

function check_tries() { // Check if user have tried 8 times (8 checked rows).
  if (tries == 8) {
    alert('You lose, you don\'t deserve to be called a master mind')
    for (var i = 1; i <= 4; i++) {
      const victory = "victory" + i;
      document.getElementById(victory).style.backgroundColor = secret[i - 1];
    }
    document.getElementById('secret').style.backgroundColor = '#865c2f'
    return;
  }
}

function clean(ev) {
  for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 4; j++) {
      const name_space = "space" + i + "-" + j;
      const name_point = "point" + i + "-" + j;
      const victory = "victory" + j;
      // set the background color to the rows balls as the default
      document.getElementById(name_space).style.backgroundColor = '#755129';
      document.getElementById(name_point).style.backgroundColor = '#755129';
      document.getElementById(victory).style.backgroundColor = '#4d2c26';
    }
  }
  document.getElementById('secret').style.backgroundColor = '#4d2c26';
  // set tries to 0 again.
  tries = 0;
}
