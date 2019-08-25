/*
 * Author: Corbin Stark
 * Date: 1/30/19
 * Desc: Choose her Own Adventure
 */

//these have to be global so the intervals can be cleared when they are no longer in use
var enemyAttackInterval;
var randomTextInterval;
var inCombat = false;

const MACHINE_STATE_DAMAGED = 0;
const MACHINE_STATE_NORMAL = 1;
const MACHINE_STATE_CORE = 2;

function forest_hub() {
    element("music").src="https://www.youtube.com/embed/K9lwLau-mbQ?start=0&loop=1&autoplay=1";
    set_room(
        "A Forest Without A Definition", "\"Marie will be very cross with me, I should think!\" Annette said aloud to herself, as she wrung the moisture out of her dress, \"I should have been home to-night and now I am sopping."+
        " A talking-to is the best I should hope for!\"<br><br>She left the cavern with haste, as the dampened "+
        "sounds of the fairies faded away from her mind. Before her was what you call a forest"+
        ", or at least in your language it was. In this world it was called <br>[#]<br><br> I apologize. It appears that part of the story is missing from the "+
        "memories.<br>It was not important, the meaning could not have been conveyed to you either way.<br><br>The forest was wide and endless, and Annette was too sleepy to recall "+
        "the way home. So it was perhaps a few hours before she found the worn footpath; or maybe it was only a few minutes,"+
        " for she was lost in reverie, wandering thoughtlessly. She followed the path as closely as she could in her haze, and eventually she stumbled upon a clearing where the "+
        "path split into seven paths. She thought it strange for the paths to be crossed seven-way; stranger still that they were LABELED, but when she saw the mountain "+
        "of scrap metal, gears, and other mechanisms, it flashed across her mind that she had never before seen mountains of metal, or gears, or crossed-paths or fairies or forests along her path home."+
        "<br><br>\"O-o-o-h\", she faltered. \"I should like to hope I am not lost and only <i>IMAGINING</i> so. Being lost is so romantic, but it is different to be lost so hopelessly.\""+
        "<br><br>Annette had spent a lot of time GAZING at the sight in front of her, but only now did she so much as make an attempt to READ the signs scattered around the clearing."+
        " The path to the furthest left read 'Prudence,' the path next to that one, 'Justice,' next to that, 'Temperance,' then 'Courage,' and 'Faith,' and 'Hope,' and 'Charity,' and "+
        "the sight of all these options had left her so overwhelmed and confused, that she had forgotten to read the text painted upon the mountain of metal, "+
        "which read:<br>'The Machine'<br>Clunk! Clunk! The Machine churned out noises monotonously. Occasionally, very loudly, the Machine emitted a cloud of steam from its exhaust pipe."+
        " This, quite frankly, annoyed Annette to no ends; so much so that she walked straight up to it and kicked it square in the center. The shock was enough to knock down several large pieces of sheet metal"+
        " that were obscuring the terminal of the Machine.",
        "prudence_path justice_path temperance_path courage_path faith_path hope_path charity_path approach_machine");
}

function iverness_hub() {
    set_room("Iverness Village",
        " She walked along the worn-down path, quite tired and lonely and hoping dearly that she would come across something human; or at least something she could confide her troubles in. Suddenly she came upon a sign planted"+
        " in the dirt along the path (she thought whoever lives around here must surely <i>adore</i> documentation, for they have placed signs everywhere), that read: 'Iverness Village: somewhere around here'.<br><br>\"What is"+
        " the point of a sign,\" she thought, \"if it does not point the way.\"<br><br>Walking and walking and walking, Annette could not find Iverness village. She was beginning to tire"+
        " of walking, and of looking for signposts.<br><br>\"I dare say that sign deceived me,\" she thought, quite cross at the idea. \"I've never before been lied to by a sign.\"<br><br>"+
        "She was not, in fact, deceived by the sign, for she encountered the village soon after. Iverness village was an idyllic and small town, not too "+
        "disimiliar to Annette's own village. She wanted to take in the sights, but alas! it was already beginning to get dark (\"and it was certainly too early to be getting dark,\" said Annette), so once she had been up and down"+
        " all the roads, knocking on every door with no response, Annette had started to worry that no one was here. She noticed that this town had many signs, and many things were "+
        " labeled or categorized, and she thought that very strange, but so many strange and fantastical things had happened to her to-day, that she did not find anything <i>very</i>"+
        " remarkable anymore.<br><br>It appeared as though her rampage through the town did some good, as some time later a man (who looked to be professional and important), slid open the doors of the "+
        "largest building in the village, and came down the stairs towards Annette. He was unable to get the first words off, for as soon as the young girl standing across from him "+
        "concluded he was he was coming to her she started to her feet and spoke.<br><br>\"I'm very glad to see you. I saw some fairies this morning in a cave and I thought "+
        "they were so <i>dreadful</i>. I can imagine a lot of things but I couldn't imagine being a fairy. And the ones"+
        " I saw had hideous fangs. Fangs! Like vampires! Marie tells me those went extinct a long time ago, but I can't help but be afraid that one might show up and chomp! bite down on my neck and suck the life out of me.\"<br><br>"+
		"",
        "back_to_clearing follow_man");
}

window.onload = function() {
    //SETUP
    var bgm = element("music");
    element("enemyHealth").style.display='none';
    element("terminal").style.display = 'none';

    //decision trackers
    var killedfairies = false;
    var pathTaken = 0;
    var machineState = MACHINE_STATE_NORMAL;

    //check if player has died every 5 seconds.
    setInterval(function() {
        if(get_health("health") <= 0) {
            hide_buttons();
            set_health("health", 1);
            alert("You have died");
            element("start_over").style.display = 'block';
            clearInterval(enemyAttackInterval);
        }
    }, 5000);

    //setting start configuration
    set_room("A Storyteller's Grand Lounge", "I've been waiting for you. For a long time. You've come here to help me finish my story, right?", "hear_story escape_your_fate");

    bgm.src="https://www.youtube.com/embed/-OAkd2TINkg?autoplay=1&start=0&loop=1";
    bgm.width = 400;
    bgm.height = 300;

    //CHOICE BUTTON CALLBACKS
    element("hear_story").onclick = function() {
        set_room("A Dark Place", "The fairies lyrics reeked of mischief and deception, but there was nothing VERY abnormal about that. Annette Fitzgerald had begun to feel her way towards the sounds (slowly, for it was very dark and her sudden awakening had left her feeling sleepy), when the fey creatures began to rant in tongues she did not understand.<br><br>\"In Daemonologies of old, the god, the god, the nothing of nothing and the end of time.\"<br>\"This is written in the forme of a dialogue, and then nothing and the written works of Francis is the beginning.\"<br><br>The cavern she fell asleep in was very damp and cold. So she had begun to wonder in her mind, whether this event was remarkably intriguing; or if she should like to leave.", "visit_fairies leave_cave");
    }

    element("visit_fairies").onclick = function() {
        set_room("A Phantasmagoria Of Fae", "Ah, yes, that did happen. The memory is coming back to me. Those fairies of small stature, they danced and swirled around a luminescent sphere sat upon the cavern floor, rambling spells long forgotten in this dying world. Their eyes flared a brilliant green when exposed to the light. Six wings arched from their backs, distorting the light beaming through its translucent surfaces. They wore dresses of vibrant colors and intricate patterns, and adorned themselves in ribbons and frills, for it made them feel so very comfortable. The fairies resumed singing their song of meaningless imitation, flashing their sharpened fangs, and presently Annette realized she had never before given thought to the idea that perhaps they were more dangerous than ordinary garden fairies; or maybe indeed they were just as quaint as she thought. These waifs of the world continued their ritual in front of her, unknowing.", "talk_fairies leave_cave");
    }

    element("talk_fairies").onclick = function() {
        set_room("The Emerald Eyes", "It was then that she approached the fairies: their ritual interrupted, they let out unworldly moans and hisses.<br><br>\"I've been spurned! The forme of a loyal man hath been sworn upon thou. Thy willeth the means to understand the concept\" The Fae beings said.<br><br>It was meaningless, of course. The power of reciprocity evaded them, as much as they desired it. Annette stood among them wondering if they were planning some mischief, and she should step in to stop them; or perhaps it was best for her to leave and go home.", "fight_fairies leave_fairies");
    }

    element("follow_man").onclick = function() {
        set_room("A Coven of Comfort",
            "Annette followed the man into the building, and found herself in a long hall lined with flickering candeliers hanging along its roof. There were rooms all along the sides of the hall, evidently occupied, for "+
            "hushed whispers came from the doors. The two strange fellows walked on and on and on and on, and once they finally reached the end of the hall, the man silently motioned towards an unlabeled door. The door was very "+
            "antique-looking, so Annette swung it open half hoping to find an elegant master bedroom full of treasures and gold-framed beds and marble busts. Unfortunately for poor Annette! the room was not elegant, or filled"+
            " with treasures, nor did it have a gold-framed bed or a marble bust; it was a plain room, with dreadfully whitewashed walls, and creaky old floorboards. The room was so <i>unbearably</i> bare and drab, that once"+
            " Anette finished hanging her red flapper hat (she was SURE it was called a flapper hat, for that was written on the inside of the fabric) on the rack beside the door, she set about rearranging the room. It was certainly better than spending the night in a tree, she was confident of that.<br>"+
            "Annette laid awake on the bed listening to the cacophony of sounds floating through the old manor, when one more sound joined the fray: the sound of her own growling stomach. "+
            "Presently she realized that she had not eaten at all to-day; it had been such a crazy day that no one could have blamed her, but when she did realize this, she started to her feet, grabbed a candle, and snuck out. "+
            "",
            "to_be_continued");
    }

    element("back_to_clearing").onclick = function() {
        set_room("Clearing", "Annette headed back towards the clearing stormily; that man was so DREADFULLY rude, and she was certainly not going to follow all those rules. So she walked her way right to where she could have sworn "+
            "the path was, but it wasn't there. ", "to_be_continued");
        machineState = MACHINE_STATE_DAMAGED;
    }

    element("to_be_continued").onclick = function() {
        set_room("To Be Continued", "This took me a long time to write and revise, so this is it for now. I'll probably still work on this in my free time, maybe incorporate later projects into it (I think we're doing a game for the last project, right?)", "");
    }

    element("fight_fairies").onclick = function() {
        start_combat(20, 6000, 6, "swarm of fairies", "fairies", "leave_cave");
        killedfairies = true;
        bgm.src="https://www.youtube.com/embed/YOOQvpMzI_k?autoplay=1&start=0&loop=1";
    }

    element("leave_fairies").onclick = function() {
        forest_hub();
    }

    element("leave_cave").onclick = function() {
        forest_hub();
    }

    element("approach_machine").onclick = function() {
        set_room("Ancient Machine", "This thing called the Machine was nothing more than a hunk of scraps, discarded long ago when humans no longer desired knowledge. The terminal displayed on its screen: 'What do you wish to know?'", "ask_question leave_machine");
    }

    element("ask_question").onclick = function() {
        set_room("Ancient Machine", "The Machine awaited a response.", "leave_machine");
        terminal(machineState);
    }

    element("leave_machine").onclick = function() {
        element("terminal").style.display = 'none';
        removeEventListener('keydown', terminal_listener);
        bgm.width = 400;
        bgm.height = 300;
        forest_hub();
    }

    //all seven paths in the forest without a definition go to same room, but the decision is stored and has impact later.
    var paths = window.document.getElementsByName("virtue_paths");
    for(var i = 0; i < paths.length; i++){
        paths[i].onclick = function() {
            pathTaken = i;
            iverness_hub();
        }
    }

    element("escape_your_fate").onclick = function() {
        set_room("??", "You leave. It was probably for the best, after all. I'm sorry...", "start_over");
        bgm.src="https://www.youtube.com/embed/CIljWtGjyNM?autoplay=1&start=0&loop=1";
    }

    element("start_over").onclick = function() {
        set_room("A Storyteller's Grand Lounge", "I've been waiting for you.<br>For a long time.<br>you've come here to hear my story, right?", "hear_story escape_her_fate");
        set_health("health", 100);
        element("enemyHealth").style.display = 'none';
    }
}
