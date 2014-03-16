$(document).ready(function(){

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

});