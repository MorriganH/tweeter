/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {
  
  const data = [
    {
      "user": {
      "name": "Juniper",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@yuzuriha"
    },
    "content": {
      "text": "They/them causing may/hem"
    },
    "created_at": 1461117232227
    },
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" 
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = (tweets) => {
    for ( let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      
      $('#tweets-container').append($($tweet));
    }
  };


  const createTweetElement = (tweetData) => {
    const $tweet = $(`<article>
      <header>
        <div>
          <img src="${tweetData.user.avatars}">
          <span>${tweetData.user.name}</span>
        </div>
        <span>${tweetData.user.handle}</span>
      </header>
      <p><strong>${tweetData.content.text}</strong></p>
      <footer>
        <p>${tweetData.created_at}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    <br>`);

    return $tweet;
  };

  renderTweets(data);

  const formSubmit = $("form").on('submit', function(event) {
    event.preventDefault();

    console.log($(this).serialize());

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    });
  });

});