

$(document).ready(function(){
  $(document.body).on("touchmove", function(event) {
    event.preventDefault();
  });
  function initializePep(){
    $('.pep').pep({
    });
  };
  initializePep();
});