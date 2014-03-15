var level = {
  current: 1,
  score: 0,
  base: 0,
  next: 30
};

function pointIncreaser(targetScore,duration){

  //tick through total points
  var $totalScore = $('#total-score');
  var $expCountdown = $('#exp-countdown');

  var delay = duration / (targetScore - level.score);

  setTimeout(function pointLoop(){
    $totalScore.html(level.score);
    $expCountdown.html(level.next - level.score + " to level " + (level.current + 1));
    if(level.score < targetScore){
      level.score++;
      setTimeout(pointLoop,delay);
    }
  }, 0);

  $('#experience').animate({
    width: 100 * (targetScore - level.base) / (level.next - level.base) + "%"
  }, duration);

}

$(document).ready(function(){
  $('#exp-countdown').html(level.next - level.score + " to level " + (level.current + 1));
  pointIncreaser(24,2000);
})