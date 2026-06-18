var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$("#center-button").on("click", function(){

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $("img").css("opacity", 0.5)
    setTimeout(() => {
        $("img").css("opacity", 1)
    }, 100)
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    })

$("button").on("click", function(){
    startOver();
    playSound("yellow");
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {nextSequence(), 1000})
        }
    } else {
        new Audio("./sounds/wrong.mp3").play();
        $("body").css("background-image", "linear-gradient(red,red)");
        setTimeout(() => {$("body").css("background-image", "url(./tabletop.jpg)");}, 200)
        console.log("wrong.")
        startOver();
    }
    
}

function startOver(){
    $("#level-title").text("Game Over, Press the Centre to Restart");
    $("#highest-level").text(saveHighestLevel(level));
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    setTimeout(() => {$("#level-title").text("Level " + level);
    var randomChosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)];
    gamePattern.push(randomChosenColour);
    async function flashSequence(gamePattern) {
        for (const colour of gamePattern) {
            animatePress(colour);
            playSound(colour);
            await delay(600); 
        }
    }
    flashSequence(gamePattern);}, 800);
    
}
function playSound(colour){
    new Audio("./sounds/" + colour + ".mp3").play();
}

function animatePress(Colour){
    var buttonCurrentRGB = $("#" + Colour).css("background-color");
    var radialGradient = `radial-gradient(white, ${buttonCurrentRGB})`;
    var endFill = `linear-gradient(${buttonCurrentRGB}, ${buttonCurrentRGB})`
    $("#" + Colour).css("background-image", radialGradient);
    setTimeout(function(){
        $("#" + Colour).css("background-image", endFill);
    }, 200)
}

function saveHighestLevel(level){
    var currentLevel = level;
    var highestlevel = 0;
    if (currentLevel > highestlevel){
        highestlevel = currentLevel;
    }
    else {
        highestlevel = currentLevel;
    }
    return "Your highest level is " + highestlevel;

}
