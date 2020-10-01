//colours array
var buttonColours = ["red", "blue", "green", "yellow"];

//game pattern array
var gamePattern = [];

//users interacted array
var userClickedPattern = [];

//to check if game has started
var started = false;

//starting level
var level = 0;

//to detect keypress
$(document).keypress(function() {
    if(!started) {

        //h1 title says"Press A key to start",changes this  "Level 0"
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


//selected button function
$(".btn").click(function() {
    //stores the id of the button clicked
    var userChosenColour = $(this).attr("id");

    //pushing clicked pattern to array
    userClickedPattern.push(userChosenColour);

    //for playing corresponding sound
    playSound(userChosenColour);

    //for animating button
    animatePress(userChosenColour);

    //calling checkAnswer() after the user clicks,passing the index of last answer in user's sequence
    checkAnswer(userClickedPattern.length-1);
});


//checkAnswer()
function checkAnswer(currentLevel){

    //checking users answer with game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //checking user Patterns length
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else{

        playSound()
        console.log("wrong");

        //wrong nsound
        playSound("wrong");

        //wrong answer effect
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        //GameOver Warning
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //restart command
        startOver();
    }

}

function nextSequence() {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //increment level each time nextSequence() is called
    level++;

    //update the h1
    $("#level-title").text("Level " + level);

    //random number
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    //button animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Refactoring so that it plays for both chosen and generated buttons
    playSound(randomChosenColour);

}

//for playing sound
function playSound(name) {
    
    //selected button audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//for clicking animation
function animatePress(currentColour){

    //clicked button
    $("#" + currentColour).addClass("pressed");

    //for delay of 100ms
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

//restrt function
function startOver(){

    //reset data
    level = 0;
    gamePattern = [];
    started = false;
}
