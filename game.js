// array with button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// arrays for the patterns
var gamePattern = [];
var userClickedPattern = [];

// A variable to keep track of whether the game has started or not, so only the first keystroke starts the game
var started = false;

// The game starts at level 0
var level = 0;

var userClicks = 0;

// when a keyboard key has been pressed call nextSequence

$(document).on("keypress", function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // initial animation for button click
  //$("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  userClicks = userClicks + 1;

  checkAnswer(userClickedPattern[userClickedPattern.length-1]);

});


// function that creates a random number between 0 and 3
function nextSequence() {

  level = level + 1;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  // selects a random colour from the buttonColours array
  var randomlyChosenColour = buttonColours[randomNumber];
  // add new randomly chose colour to the end of the array gamePattern
  gamePattern.push(randomlyChosenColour);

  $("#"+randomlyChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomlyChosenColour);


}


function playSound (name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  // if (currentLevel === gamePattern[userClickedPattern.length-1]) {
  //   console.log("success");
  // }
  // else {
  //   console.log("failure");
  // }
  // If the user got the most recent answer right, check that they have finished their sequence
  if (currentLevel === gamePattern[userClickedPattern.length-1]) {

    if (userClicks === gamePattern.length) {

      window.setTimeout(nextSequence, 1000);

      userClickedPattern = [];
      userClicks = 0;
    }
  }
  // if the user got the most recent answer wrong execute the following code:
  else {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over").delay(200).queue(function (nxt) {
        $(this).removeClass("game-over");
    });
    $("h1").text("Game over, press any key to restart");
    started = false;
    level = 0;
    userClicks = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
}






// ***** briefly flashes button that got clicked ****
// $(".btn").on("click", function () {
//     $(this).animate({opacity: 0.1});
// 	  setTimeout(function(){$(".btn").animate({opacity: 1})}, 0.5);
// });
