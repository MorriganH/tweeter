/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {

  // takes in array of tweet data and displays them on the page, newer at the top
  const renderTweets = (tweets) => {
    for ( let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      
      $('#tweets-container').prepend($($tweet));
    }
  };

  // generates the HTML that will be added into the DOM
  const createTweetElement = (tweetData) => {
    const $article = $('<article>');
    const $header = $('<header>');
    const $avatarDiv = $('<div>');
    const $img = $(`<img src="${tweetData.user.avatars}">`);
    const $username = $(`<span>${tweetData.user.name}</span>`);
    const $userHandle = $(`<span>${tweetData.user.handle}</span>`);
    const $safeHTML = `<p><strong>${escape(tweetData.content.text)}</strong></p>`;
    const $footer = $('<footer>');
    const $timeago = $(`<div class="timeago">${timeago.format(tweetData.created_at)}</div>`);
    const $iconDiv = $('<div>');

    $avatarDiv.append($img, $username);
    $header.append($avatarDiv, $userHandle);
    $iconDiv.append('<i class="fa-solid fa-flag"></i>',
                    '<i class="fa-solid fa-retweet"></i>',
                    '<i class="fa-solid fa-heart"></i>');
    $footer.append($timeago, $iconDiv);
    $article.append($header, $safeHTML, $footer);

    // const $tweet = $(`<article>
    //   <header>
    //     <div>
    //       <img src="${tweetData.user.avatars}">
    //       <span>${tweetData.user.name}</span>
    //     </div>
    //     <span>${tweetData.user.handle}</span>
    //   </header>
    //   ${$safeHTML}
    //   <footer>
    //     <div class="timeago">${timeago.format(tweetData.created_at)}</div>
    //     <div>
    //       <i class="fa-solid fa-flag"></i>
    //       <i class="fa-solid fa-retweet"></i>
    //       <i class="fa-solid fa-heart"></i>
    //     </div>
    //   </footer>
    // </article>
    // <br>`);

    return $article;
  };

  // sends server request for tweet data and passed it into renderTweets
  const loadTweets = () => {
    $.get("/tweets")
    .then((res) => {
      renderTweets(res);
    })
  }
  
  // immediately call loadTweets when page is ready
  loadTweets();

  // prevents code from running if user tried inputting HTML
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $("form").on('submit', function(event) {
    event.preventDefault();

    // if user tried to submit empty tweet, or too long tweet, reveals appropriate error message
    if (!$('#tweet-text').val()) {
      $('#no-text').removeClass('invisible');
      $('#no-text-alert').removeClass('invisible');
      throw Error ("Text field empty");
    }
    if ($('#tweet-text').val().length > 140) {
      $('#too-much-text').removeClass('invisible');
      throw Error ("Tweet too long!");
    }
    
    // serializes input text for the .post and clears text field
    const tweetSerial = $(this).serialize();
    $(this)[0].reset();

    $.post("/tweets", tweetSerial)
      .then(() => {
        /*  this causes the page to scroll awkwardly when displaying the new tweet, but I
        *   had the code reviewed and the instructor said this was sufficient since we
        *   haven't learned react yet */
        $('#tweets-container').empty();
        loadTweets();
      });
  });

});