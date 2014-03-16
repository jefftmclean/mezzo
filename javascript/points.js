var level = {
  current: 1,
  score: 0,
  base: 0,
  next: 30
};

var duration = 1000;

function updateCountdown(){
  $('#exp-countdown').html(level.next - level.score + " to level " + (level.current + 1));
}

function scoreTicker(targetScore){
  var $totalScore = $('#total-score');
  var delay = duration / (targetScore - level.score);
  setTimeout(function pointLoop(){
    updateCountdown();
    $totalScore.html(level.score);
    if(level.score < targetScore){
      level.score++;
      setTimeout(pointLoop,delay);
    }
  }, 0);
}

function growExpBar(targetScore,finalScore){
  $('#experience').animate({
    width: 100 * (targetScore - level.base) / (level.next - level.base) + "%"
  }, duration);
}

function levelUp(){
  $('#level').animate(
    {"letter-spacing":"5px","opacity":"0"},
    200, 
    function(){
      var $this = $(this);
      $this.html("Level " + level.current);
      $this.animate(
        {"letter-spacing":"0px","opacity":"1"},
        200
      );
    }
  );
  level.current++;
  level.base = level.next;
  level.next = Math.floor(level.next + level.next*0.18 + 30);
  $('#experience').width(0);
  updateCountdown();
}

function addPoints(increase){
  var targetScore = level.score + increase;
  if (targetScore < level.next){
    scoreTicker(targetScore);
    growExpBar(targetScore);
  } else {
    increase = targetScore - level.next;
    scoreTicker(level.next);
    growExpBar(level.next);
    setTimeout(function(){
      levelUp();
      addPoints(increase);
    }, 1200);
  }
}

$(document).ready(function(){
  updateCountdown();
})