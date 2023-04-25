var gamePattern=[];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern =[];
var level = 0;
var startCheck = false;

function nextSequence() {
  userClickedPattern=[];
 var randomnumber = Math.random();
 randomnumber*=4;
 randomnumber=Math.floor(randomnumber);

 var randomChooseColor= buttonColors[randomnumber];
 gamePattern.push(randomChooseColor);

 $("#"+randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);

  $('#level-title').text('Level '+(level+1));
  ++level;
};

$('.btn').on('click', function() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//nextSequence();


function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $('#'+currentColor).addClass('pressed');
  setTimeout( ()=> {
      $('#'+currentColor).removeClass('pressed');
  },100);
}


// game start
$(document).on('keypress', function(){
  if(!startCheck) {
    nextSequence();
    startCheck=true;
  }
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log('success');
    if(gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);

    }
  }
  else {
    playSound('wrong');
    gameOver();
    console.log('fail');
  }
}

function gameOver() {
  $('body').addClass('game-over');
  setTimeout( ()=> {
      $('body').removeClass('game-over');
  },200);
  $('#level-title').text('Game Over, Press Any Key to Restart');
  startOver();
}

function startOver() {
  level=0;
  gamePattern =[];
  startCheck = false;
}
