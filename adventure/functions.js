/*
 * Author: Corbin Stark
 * Date: 1/30/19
 * Desc: Choose Your Own Adventure
 */


function element(id) {
    return document.getElementById(id);
}

function action_cooldown() {
    element("attack").style.display = 'none';
    element("ability").style.display = 'none';
    element("item").style.display = 'none';

    setTimeout(function(){
        canAttack=true;
        if(inCombat) {
            element("attack").style.display = 'block';
            element("ability").style.display = 'block';
            element("item").style.display = 'block';
        }
    }, 8000);
}

function set_room(title, desc, buttons) {
    hide_buttons();
    clearInterval(randomTextInterval);
    element("title").innerHTML = title;
    element("desc").innerHTML = desc;
    //display all buttons in this room
    var buttonsId = buttons.split(' ');
    for(var i = 0; i < buttonsId.length; i++) {
        element(buttonsId[i]).style.display = 'block';
    }
    //check for [#] and if so, display the glitched text
    var tokens = desc.split("[#]");
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()}{[]|\`~";
    if(tokens.length > 1) {
        randomTextInterval = setInterval(function() {
            element("desc").innerHTML = tokens[0];
            for(var i = 0; i < 16; i++)
                element("desc").innerHTML = element("desc").innerHTML + possible.charAt(Math.floor(Math.random() * possible.length));
            element("desc").innerHTML = element("desc").innerHTML + tokens[1];
        }, 100);
    }
}

function set_room_slowscroll(title, desc, buttons) {
    hide_buttons();
    clearInterval(randomTextInterval);
    var buttonsId = buttons.split(' ');
    for(var i = 0; i < buttonsId.length; i++) {
        element(buttonsId[i]).style.display = 'block';
    }
    element("title").innerHTML = title;
    element("desc").innerHTML = "";

    var next = 0;
    var intID = setInterval(function() {
        if(next < desc.length) {
            element("desc").innerHTML = element("desc").innerHTML + desc[next];
            next++;
        }
    }, 150);

    //checks every 15 seconds if the text has reached the end, then clears the interval. If not, it repeats itself.
    setTimeout(checkTextDoneScrolling(next, intID), 15000);
}

function checkTextDoneScrolling(next, intID) {
    if(next >= length)
        clearInterval(intID);
    else
        setTimeout(clearIntervalTest(next, intID), 15000);
}

function show_warning(msg) {
    element("warning").style.display='block';
    element("warning").innerHTML = msg;
    setTimeout(function() { element("warning").style.display='none'; }, 2200);
}

function show_info(msg) {
    element("info").style.display='block';
    element("info").innerHTML = msg;
    setTimeout(function() { element("info").style.display='none'; }, 2200);
}

function hide_buttons() {
    var buttons = element("choices").children;
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
    }
}

function set_health(name, health) {
    var tokens = element(name).innerHTML.split(' ');
    element(name).innerHTML = tokens[0] + ' ' + health;
}

function get_health(name) {
    var tokens = element(name).innerHTML.split(' ');
    return Number(tokens[1]);
}

function shake_screen(numShakes) {
    var shakeTick = true;
    var maxShakes = numShakes;
    var count = 0;

    var intID = setInterval(function() {
        if(count < maxShakes) {
            if(shakeTick) {
                element("page").style.margin="30px";
                shakeTick = false;
            } else {
                element("page").style.margin="0px";
                shakeTick = true;
            }
            count++;
        }
    }, 100);

    //interval ends after 10 seconds, so cant shake screen for longer than that.
    setTimeout(function() { clearInterval(intID);}, 10000);
}

function start_combat(enemyHealth, attackSpeed, attackDamage, name, desc, buttons) {
    shake_screen(13);
    inCombat = true;
    hide_buttons();
    clearInterval(randomTextInterval);

    show_warning(name + " has engaged you in combat");

    set_health("enemyHealth", enemyHealth);
    var enemyHealth = element("enemyHealth");
    var attackButton = element("attack");
    var abilityButton = element("ability");
    var itemButton = element("item");

    element("title").innerHTML = name;
    element("desc").innerHTML = desc;
    enemyHealth.style.display = 'block';
    attackButton.style.display = 'block';
    abilityButton.style.display = 'block';
    itemButton.style.display = 'block';

    enemyAttackInterval = setInterval(function() {
        set_health("health", get_health("health") - attackDamage);
        shake_screen(9);
        show_warning("You were attacked for "+ attackDamage+" damage");
        if(get_health("enemyHealth") <= 0) {
            inCombat = false;
            clearInterval(enemyAttackInterval);
            hide_buttons();
            enemyHealth.style.display = 'none';
            var buttonsId = buttons.split(' ');
            for(var i = 0; i < buttonsId.length; i++) {
                element(buttonsId[i]).style.display = 'block';
            }
            show_info(name + " was defeated");
        }
    }, attackSpeed);

}
