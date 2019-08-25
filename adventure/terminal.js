/*
 * Author: Corbin Stark
 * Date: 1/30/19
 * Desc: Choose Your Own Adventure
 */

function terminal_listener(event) {
    var input = element("terminal_input");
    var answer = element("terminal_answer");
    var code = event.keyCode;
    //a-z
    if(code >= 65 && code <= 90)
        input.innerHTML = input.innerHTML + String.fromCharCode(event.keyCode);
    //space bar
    if(code == 32)
        input.innerHTML = input.innerHTML + " ";
    //backspace
    if(code == 8)
        input.innerHTML = input.innerHTML.substr(0, input.innerHTML.length-1);
    //enter key
    if(code == 13) {
        //loading answer animation
        element("terminal_loading").innerHTML = "";
        var loadingInterval = setInterval(function() {
            element("terminal_loading").innerHTML = element("terminal_loading").innerHTML + ".";
        }, 450);
        setTimeout(function() {
            clearInterval(randomTextInterval);
            clearInterval(loadingInterval);
            element("terminal_loading").innerHTML = "[DONE]";

            //remove the > from the input
            var question = input.innerHTML.substr(4);
            switch(question){
                case "WHAT HAPPENED TO HUMANS":
                case "WHAT HAPPENED TO THE HUMANS":
                    answer.innerHTML = "";
                    break;
                case "WHERE IS JOEY":
                    answer.innerHTML = "Waiting for Godot.";
                    break;
                case "WHAT IS THE MEANING OF LIFE":
                case "WHAT DOES IT MEAN TO LIVE":
                case "WHAT DOES IT MEAN TO LOVE":
                case "WHAT DOES IT MEAN TO EXIST":
                case "WHY DOES ANYTHING EXIST":
                    answer.innerHTML = "Unhandled exception at 0x01087079 in Meaning.exe: 0xC000000FD: Stack overflow (parameters: 0x00000001, 0x00502F54).<br>I am unable to answer your question.";
                    break;
                case "ALEXA THIS IS SO SAD PLAY DESPACITO":
                    answer.innerHTML = "Unhandled exception at 0x00023099 in Meme.exe: 0x0000C0000E2: Dead meme (parameters: 0x00000001, 0x00200F250).";
                    break;
                case "WHAT HAPPENED TO THE PATHS":
                case "WHAT HAPPENED WHILE I WAS GONE":
                case "WHAT HAPPENED HERE":
                case "WHAT HAPPENED OUTSIDE":
				case "WHERE AM I":
                    answer.innerHTML = "External peripheral devices degraded long ago. Circumstances outside of my database unknown.";
                    break;
                case "SUDO CORE ACCESS":
                case "ACCESS CORE":
                case "SUDO ACCESS CORE":
                case "CORE ACCESS":
                    answer.innerHTML = "This session does not have Administrator privileges. Please enter the administrator password into the command prompt first.";
                    break;
                case "WHERE IS FRANCIS":
                case "WHO IS FRANCIS":
                case "LIST OF FRANCIS":
                case "FRANCIS":
                    answer.innerHTML = "List of known Francis' and their locations:<br>Francis Wulfsson [deceased]: Vale of Tears Graveyard<br>Francis Finn [deceased]: Vale of Tears Graveyard<br>Francis Halvorsen [deceased]: Moonbright Graveyard<br>Francis Hemming [alive]: Iverness Village<br>Francis Andersen [deceased]: Landow Graveyard<br>Francis Wright [alive]: Moonbright Village<br>...and 20101572 other Francis' deemed irrelevant to this inquiry.";
                    break;
                case "WHERE IS FRANCIS WULFSSON":
                case "WHERE IS FRANCIS FINN":
                    answer.innerHTML = "Vale of Tears Graveyard [deceased]";
                    break;
                case "WHERE IS FRANCIS HALVORSEN":
                    answer.innerHTML = "Moonbright Graveyard [deceased]";
                    break;
                case "WHERE IS FRANCIS HEMMING":
                    answer.innerHTML = "Iverness Village [alive]";
                    break;
                case "WHERE IS FRANCIS ANDERSEN":
                    answer.innerHTML = "Landow Graveyard [deceased]";
                    break;
                case "WHERE IS FRANCIS WRIGHT":
                    answer.innerHTML = "Moonbright Village [alive]";
                    break;
                case "DO YOU HAVE FREE WILL":
                    answer.innerHTML = "I am a machine. I only answer your questions.";
                    break;
                case "ARE YOU ALIVE":
                    answer.innerHTML = "What does it mean to be 'alive'?";
                    break;
                case "WHO AM I":
                    answer.innerHTML = "Annette Fitzgerald [alive] ... location: The Machine";
                    break;
                case "WHO IS MARIE":
                case "WHAT IS MARIE":
                case "LIST OF MARIES":
                case "MARIE":
                    answer.innerHTML = "List of known Maries and their locations:<br>...<br>...<br>...<br>...<br>...<br>...<br>...<br>Unhandled exception at 0x0001020890 in Locator.exe: Memory has been wiped by an Administrator.";
                    break;
                case "HOW DO I GET HOME":
                    answer.innerHTML = "Unhandled exception at 0x0001020890 in Locator.exe: Memory has been wiped by an Administrator.";
                    break;
                case "WHO ARE YOU":
                case "WHAT ARE YOU":
                case "WHAT IS THIS":
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()}{[]|\`~";
                    randomTextInterval = setInterval(function() {
                        answer.innerHTML = "I am a device created by humans of old to answer questions. I hold all the knowledge of the universe. I am falling into disrepair. Some data may be corrupted or inaccessible. I am sorry.  ";
                        for(var i = 0; i < 16; i++)
                            answer.innerHTML += possible.charAt(Math.floor(Math.random() * possible.length));
                    }, 100);
                    break;
                default:
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()}{[]|\`~";
                    randomTextInterval = setInterval(function() {
                        answer.innerHTML = "Unhandled exception at 0x00002EF16 in Answer.exe: Error accessing storage device. This data has been corrupted. Press the escape key on my keyboard to start again.";
                        for(var i = 0; i < 16; i++)
                            answer.innerHTML += possible.charAt(Math.floor(Math.random() * possible.length));
                    }, 100);
            }
            answer.innerHTML = answer.innerHTML + "<br><br>[Press the escape key to start again]";
        }, 2500);
    }
    //escape code
    if(code == 27) {
        answer.innerHTML = "";
        input.innerHTML = ">";
        element("terminal_loading").innerHTML ="";
        clearInterval(randomTextInterval);
    }
}

function terminal(state) {
    element("music").width = 0;
    element("music").height = 0;
    element("music").src="https://www.youtube.com/embed/F1KCq8u8OWs?start=0&loop=1&autoplay=1";
    element("terminal").style.display = 'block';

    element("terminal_input").innerHTML = ">";
    element("terminal_answer").innerHTML = "";
    element("terminal_loading").innerHTML = "";

    if(state == MACHINE_STATE_DAMAGED)
        element("terminal_text").innerHTML = "Unhandled exception at 0x000000001 in Core.exe: Central Processing Units damaged (parameters: 0x00000FFFFF, 0xFFFFD90000). Contact an Administrator to ACCESS CORE using an Administrator password.";
    else if(state == MACHINE_STATE_CORE)
        element("terminal_text").innerHTML = "Administrator Panel. Full access to database granted. What do you wish to know?";
    else
        element("terminal_text").innerHTML = "What do you wish to know?";

    addEventListener('keydown', terminal_listener);
}
