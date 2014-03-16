$(document).ready(function(){

// **********************************************
// DRAG AND DROP

var $columns = $('#grid .column');
var $row = $('#grid .row');
var snapX = {};
var snapY = {};
var halfColumn = $columns.width()/2;
var halfRow = $row.height()/2;
var activeColumn;
var $half = $('#source-container .source .half').clone();
var $fourth = $('#source-container .source .fourth').clone();
var $eighth = $('#source-container .source .eighth').clone();

function place(){
  var $pepActive = $('.pep-active');
  //generate replacement block
  if( $pepActive.attr("data-origin") === "true" ){
    switch($pepActive.attr("data-duration")){
      case "4":
        $("#source-container>.half").prepend($half.clone());
        initializePep();
        break;
      case "2":
        $("#source-container>.fourth").prepend($fourth.clone());
        initializePep();
        break;
      case "1":
        $("#source-container>.eighth").prepend($eighth.clone());
        initializePep();
        break;
      default:
        break;
    }
    $pepActive.attr("data-origin", "false");
  }
  //snap block to grid
  snapX.dx = halfColumn;
  snapY.dy = halfRow;
  var columnIndex = 0;
  $columns.each(function(){
    $this = $(this);
    $this.dx = Math.abs($this.offset().left - $pepActive.offset().left);
    if($this.dx <= halfColumn && columnIndex + parseInt($pepActive.attr("data-duration")) <= $columns.length){
      snapX = $this;
      $pepActive.offset({left:snapX.offset().left});
      $pepActive.addClass('no-bg');
      var $rows = $this.children('.row');
      $rows.each(function(){
        $this = $(this);
        $this.dy = Math.abs($this.offset().top - $pepActive.offset().top);
        if($this.dy <= halfRow){
          snapY = $this;
          $pepActive.offset({top:snapY.offset().top});
        }
      });
    }
    columnIndex += 1;
  });
  if(snapX.dx >= halfColumn || snapY.dy >= halfRow){
    $pepActive.remove();
  } else {
    activeColumn = snapX;
    snapX.addClass('active-column');
  }
}

function pickup(){
  var $pepActive = $('.pep-active');
  $pepActive.removeClass('no-bg');
  if(activeColumn != null){
    activeColumn.removeClass('active-column');
  }
};

function initializePep(){
  $('.pep').pep({
    activeClass: 'pep-active',
    start: pickup,
    stop: place,
    shouldEase: false
  });
};
initializePep();

// **********************************************
// POINTS

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

});