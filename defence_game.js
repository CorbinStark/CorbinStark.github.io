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

var defence_bg       =    {img: new Image(), x: 0, y: 0};
var defence_portrait =    {img: new Image(), x: 30, y: 0};
var defence_tower    =    {img: new Image(), x: 485, y: 150};

var line1 = "Commander, the monsters are moving towards the fort!";
var line2 = "We have to set up defences quickly!                ";
var display1 = "";
var display2 = "";
var timer = 0;
var currentChar = 0;

var state = STATE_CUTSCENE;
var prevState = STATE_IDLE;

var cutscene = [
    {line1: "Commander, the monsters are moving towards the fort!", line2:"We have to set up defences quickly!          "},
    {line1: "We must go to the mages tower to access the holy", line2: "\"computer\", whatever that is. With it, we can summon    "},
    {line1: "an army capable of defeating the monsters!", line2: "The mage has given me a guidebook on how to use it.                    "},
    {line1: "Alright........", line2: "It says here that you can summon a defensive turret      "},
    {line1: "by making a \"variable\"....  ", line2: "To create a \"variable\" you need a type and a name.       "},
    {line1: "You create a variable like this: ", line2: "IceTower firstTower;                           "},
    {line1: "This creates a defensive tower capable of using ", line2: "ice magic. It is named firstTower.                 "},
    {line1: "Try making an IceTower variable yourself", line2: "on the terminal to your right.              "},
    {line1: "After making the variable, press the \"run code\"", line2: "button to the bottom of this window."}
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
    defence_bg.img.src = "data/defence-bg.png";
    defence_tower.img.src = "data/defence-tower.png";
    defence_portrait.img.src = "data/defence-portrait.png";

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

        var lines = code.split("\n");
        for(var i = 0; i < lines.length; i++) {
            var tokens = lines[i].split(" ");
            if(tokens.length > 2) {
                start_cutscene([
                    {line1: "There are too many parts to your variable!", line2: "Variables are created like this: Type Name;                  "},
                    {line1: "The type and the name cannot have spaces. ", line2: "If you want to make spaces, use underscores instead           "},
                    {line1: "like this: ", line2: "IceTower two_parts;                     "}
                ]);
            }
            if(tokens.length == 1) {
                start_cutscene([
                    {line1: "Variables need two things: a type and a name.", line2: "They are created like this: Type Name;                "}
                ]);
            }
            if(tokens.length == 2 && tokens[1].endsWith(";") == false) {
                start_cutscene([
                    {line1: "When creating variables, the line must end with a ;", line2: "This is called a semi-colon.                 "}
                ]);
            }
            if(tokens[0] == "IceTower" && tokens.length == 2 && tokens[1].endsWith(";")) {
                start_cutscene([
                    {line1: "An Ice Tower has appeared! We are saved!", line2: "         "}
                ]);
            }
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

    draw_texture(defence_bg);
    draw_texture(defence_tower);

    if(state == STATE_CUTSCENE) {
        draw_texture(defence_portrait);

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
