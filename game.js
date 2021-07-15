var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(started==false){
        started=true;
        $("#level-title").text("Level 0");
        nextSequence();
}
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()}, 1000
            );
            console.log("succes");
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")},200
        );
        startOver();
        
        
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name){
    $("#"+name).fadeOut(100).fadeIn(100);
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")},100
    );
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

