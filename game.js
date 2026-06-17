var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$("h2").on("click", function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $("h2").css("opacity", 0.5)
    setTimeout(() => {
        $("h2").css("opacity", 1)
    }, 100)
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    })

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {nextSequence(), 1000})
        }
    } else {
        new Audio("./wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");}, 200)
        console.log("wrong.")
        $("h1").text("Game Over, Press the Centre to Restart");
        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("h2").text(level);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h2").text(level);
    $("#level-title").text("Level " + level);
    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).addClass("pressed");
    setTimeout(() => {$("#" + randomChosenColour).removeClass("pressed")}, 200)
    playSound(randomChosenColour);

}
function playSound(colour){
    new Audio("./" + colour + ".mp3").play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}
