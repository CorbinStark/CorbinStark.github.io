/*
 *  Author: Corbin Stark
 *  Date: 8/23/19
 *  Description: A Game Designed to teach variables
 */

//IDEAS
//Tower defence game where you create defences by creating variables.
//Aka to make a cannon you would have to type:
// Cannon charlie;
//
//and that would create an Cannon named charlie;
//expand on the idea.

function element(id) {
    return document.getElementById(id);
}

function draw_texture(tex) {
    context.drawImage(tex.img, tex.x, tex.y);
}

function random_int(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function key_down(e) {
    if(key && key[e] == true)
        return true;
    return false;
}

function start_cutscene(dialogues) {
    display1 = "";
    display2 = "";
    line1 = dialogues[0].line1;
    line2 = dialogues[0].line2;
    cutscene = dialogues;
    currentChar = 0;
    currentDialogue = 0;
    state = STATE_CUTSCENE;
}

//
//CONSTS
//

const STATE_IDLE = 0;
const STATE_CUTSCENE = 1;
const STATE_PROGRAMMING = 2;

//
//VARIABLES
//

var canvas;
var context;
var key;

var space_bg =          {img: new Image(), x: 0, y: 0};
var space_big_planet =  {img: new Image(), x: 544, y: 0};
var space_far_planets = {img: new Image(), x: 544, y: 0};
var space_ring_planet = {img: new Image(), x: 544, y: 0};
var space_stars =       {img: new Image(), x: 50, y: 0};

var ship =              {img: new Image(), x: 40, y: 85};
var space_portrait =    {img: new Image(), x: 30, y: 0};

var line1 = "Our engines seem to have broken down, Captain.";
var line2 = "If we don't fix them soon, we will crash!  ";
var display1 = "";
var display2 = "";
var timer = 0;
var currentChar = 0;

var state = STATE_CUTSCENE;
var prevState = STATE_IDLE;

var cutscene = [
    {line1: "Our engines seem to have broken down, Captain.", line2:"If we don't fix them soon, we will crash!          "},
    {line1: "You need to reprogram the repair bots to fix",     line2: "the engines one by one.          "},
    {line1: "To start programming the repair bots, ",           line2: "type system(); into the terminal to your right.                    "},
    {line1: "Then, click the \"Run Code\" button to the",       line2: "bottom of this window.                             "}
];
var currentDialogue = 0;

//
//INITIALIZE
//

window.onload = function() {
    //CREATE CANVAS
    canvas = document.createElement("canvas");
    canvas.width = 544;
    canvas.height = 320;
    context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[4]);

    //TEXTURES
    space_bg.img.src = "data/space-bg.png";
    space_big_planet.img.src = "data/space-big-planet.png";
    space_far_planets.img.src = "data/space-far-planets.png";
    space_ring_planet.img.src = "data/space-ring-planet.png";
    space_stars.img.src = "data/space-stars.png";

    ship.img.src = "data/ship.png";
    space_portrait.img.src = "data/space-portrait.png";

    //GAME LOOP INTERVAL
    var interval = setInterval(update_game, 20);

    //KEY LISTENERS
    window.addEventListener('keydown', function(e) {
        key = (key || []);
        key[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
        key[e.keyCode] = false;
    });

    element("run_code").onclick = function() {
        var code = element("code").value;
        if(code.trim() == "system();") {
            state = STATE_PROGRAMMING;
            prevState = STATE_PROGRAMMING;
            element("code").value="";
            start_cutscene([
                {line1: ".............", line2: "Access granted to repair bot internal systems.      "},
                {line1: "You're in, Captain.     ", line2: "Allow me to remind you of the basics of programming.            "},
                {line1: "When working with computers, we need to store ", line2: "information. To do this, we can make a \"variable\".      "},
                {line1: "A variable is a bit of information that can be ", line2: "set and changed. It requires two things to make:          "},
                {line1: "a type and a name. For example, I could make a", line2: "variable called \"michael\" and set it to 5.         "},
                {line1: "The code would look like this: ", line2: "int michael = 5;           "},
                {line1: "The \"int\" is the type of the variable. ", line2: "It is short for \"integer\".       "},
                {line1: "An integer is the fancy math way of saying ", line2: "a normal number like the ones you would count.         "},
                {line1: "Like 0, 1, 2, 3, 4, -1, -2, and similar numbers. A ", line2: "number with a decimal like 0.5 is not included.         "},
                {line1: "For that you would use a different type of variable ", line2: "called a \"float\", common types of variables will be shown below.            "}
            ]);
        }
        if(code.trim() == "system()") {
            start_cutscene([
                {line1: "Statements in programming must end with a ;", line2: "This is called a semi-colon."},
                {line1: "When the computer converts your code into 0s and 1s", line2: "The semi-colon is how the computer knows to stop.         "}
            ]);
        }
        if(code.trim() == "system;" || code.trim() == "system") {
            start_cutscene([
                {line1: "To run a function, in this case the system function, ", line2: "you must use parenthesis () to finish the statement."},
                {line1: "The parameters (variables that go into the function) ", line2: "are put inside the parenthesis.       "},
                {line1: "The system function has no parameters, so the", line2: "parenthesis are empty. Try typing system();                    "}
            ]);
        }
    }
}

//
//GAME LOOP
//

function update_game() {
    timer++;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    space_big_planet.x -= 1;
    space_far_planets.x -= 0.2;
    space_ring_planet.x -= 0.5;
    space_stars.x -= 0.1;

    if(space_big_planet.x < -200) {
        space_big_planet.x = 544;
        space_big_planet.y = random_int(0, 280);
    }
    if(space_far_planets.x < -200) {
        space_far_planets.x = 544;
        space_far_planets.y = random_int(0, 280);
    }
    if(space_ring_planet.x < -200) {
        space_ring_planet.x = 544;
        space_ring_planet.y = random_int(0, 280);
    }
    if(space_stars.x < -544)
        space_stars.x = 544;

    draw_texture(space_bg);
    draw_texture(space_stars);
    draw_texture(space_far_planets);
    draw_texture(space_ring_planet);
    draw_texture(space_big_planet);

    draw_texture(ship);

    if(state == STATE_CUTSCENE) {
        draw_texture(space_portrait);

        context.font = "12px Courier New";
        if(timer % 3 == 0) {
            if(currentChar < line1.length) {
                display1 = display1 + line1.charAt(currentChar);
                currentChar++;
            } else {
                display2 = display2 + line2.charAt(currentChar - line1.length);
                currentChar++;
                if(currentChar >= line1.length + line2.length) {
                    if(currentDialogue == cutscene.length-1)
                        state = prevState;
                    else {
                        currentDialogue++;
                        display1 = "";
                        display2 = "";
                        line1 = cutscene[currentDialogue].line1;
                        line2 = cutscene[currentDialogue].line2;
                        currentChar = 0;
                    }
                }
            }
        }
        context.fillText(display1, 100, 20);
        context.fillText(display2, 100, 50);
    }
}
