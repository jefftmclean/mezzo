$(document).ready(function(){
  
var $columns = $('#grid .column');
var $row = $('#grid .row');
var snapX = {};
var snapY = {};
var halfColumn = $columns.width()/2;
var halfRow = $row.height()/2;
var activeColumn;

function place(){
  var $pepActive = $('.pep-active');
  snapX.dx = halfColumn;
  snapY.dy = halfRow;
  $columns.each(function(){
    $this = $(this);
    $this.dx = Math.abs($this.offset().left - $pepActive.offset().left);
    if($this.dx <= halfColumn){
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