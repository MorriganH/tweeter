$(document).ready(() => {
  $('#tweet-text').on('keyup', function(event) {

    // hides error messages if they were shown
    $('#too-much-text').addClass('invisible');
    $('#no-text').addClass('invisible');

    //calculates remaining characters allowed in tweet and displays # on screen
    let maxChars = 140;
    let typed = $(this).val().length;
    let remaining = maxChars - typed;
    $(this).parent()[0][2].innerText = remaining;

    if (remaining < 0) {
      $($(this).parent()[0][2]).addClass('red');
    }
    
    if (remaining >= 0) {
      $($(this).parent()[0][2]).removeClass('red');
    }
  });
});