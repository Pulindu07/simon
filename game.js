var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on("keydown", function () {
    if (!started) {
        started = true;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);

    palySound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern.length - 1);

});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    palySound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);
    if (level === 0) {
        $("#game-info").text("Simon game is a memory game. On start game will blink a tile and you have to click on that tile and continue the pattern from the begining when next tile is blinked.");
    } else {
        $("#game-info").text("");
    }
    level += 1;

}

function palySound(name) {
    var newAudio = new Audio("sounds/" + name + ".mp3");
    newAudio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            // console.log("success");
            setTimeout(function () {
                palySound("success");
            }, 100);

            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1200);
        }

    } else {
        // console.log("wrong");
        palySound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        started = false;
        level = 0;
        userClickedPattern = [];
        gamePattern = [];

    }
}



