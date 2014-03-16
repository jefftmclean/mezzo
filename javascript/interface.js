function place(){
  var $pepActive = $('.pep-active');
  var $columns = $('#grid .column');
  var $row = $('#grid .row');
  var snapX = {};
  var snapY = {};
  var halfColumn = $columns.width()/2;
  var halfRow = $row.height()/2;
  snapX.dx = halfColumn;
  snapY.dy = halfRow;
  $columns.each(function(){
    $this = $(this);
    $this.dx = Math.abs($this.offset().left - $pepActive.offset().left);
    if($this.dx <= halfColumn){
      snapX = $this;
      $pepActive.offset({left:snapX.offset().left});
      var $rows = $this.children('.row');
      $rows.each(function(){
        $this = $(this);
        $this.dy = Math.abs($this.offset().top - $pepActive.offset().top);
        console.log($this.dy);
        if($this.dy <= halfRow){
          snapY = $this;
          console.log(snapY);
          $pepActive.offset({top:snapY.offset().top});
        }
      });
    }
  });
  if(snapX.dx >= halfColumn || snapY.dy >= halfRow){
    $pepActive.remove();
  } else {
    // snapX.toggleClass('active-column');
  }
}

function pickup(){};

function initializePep(){
  $('.pep').pep({
    activeClass: 'pep-active',
    start: pickup,
    stop: place,
    shouldEase: false
  });
};