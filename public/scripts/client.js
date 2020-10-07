const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

//creates each tweet
const createTweetElement = function (tweet) {
  var tweetContent = tweet.content.text;
  let tweetHandle = tweet.user.handle;
  let tweetUsername = tweet.user.name;
  let tweetAvatar = tweet.user.avatars;
  let tweetCreatedAt = tweet.created_at;

  let $tweet = `
              <article class="tweet">
                <header class="tweet-header">
                <div class="tweet-subheader">
                  <img class="avatar" src="${tweetAvatar}">
                  <span class="name">${tweetUsername}</span>
                  
                  </div>
                  <span class="handle">${tweetHandle}</span>
                </header>
                
                <p class="text-tweet">${tweetContent}</p>
                <footer class="time-stamp">
                  <span>${moment(tweetCreatedAt).fromNow()}</span>
                  <div class="icon-subheader">
                  <i class="fa fa-flag" style="color:#4056A1;" ></i>
                  <i class="fa fa-retweet" style="color:#4056A1;"></i>
                  <i class="fa fa-heart" style="color:#4056A1;"></i>
                  </div>
                </footer>
              </article>
              <br>`;

  return $tweet;
};

//renders tweets
const renderTweets = function (tweets) {
  $(".tweet-container").empty();
  for (var i = 0; i < tweets.length; i++) {
    var $tweet = createTweetElement(tweets[i]);
    $(".tweet-container").prepend($tweet);
  }
};

 //Get Request to load tweets
 function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets/'
  }).then(function (data) {
    renderTweets(data);
  }).catch(function (error) {
    console.log(error);
  });
}


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("Client Js Loaded");

  //renderTweets(data);
  loadTweets();

  //Post request to submit tweets
  $("#submit-tweet").on("submit", function (event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $(this).serialize(),
    }).then(function (data) {
      console.log(`Submitted Successfully ${data}`);
      loadTweets();
    });
  });
});
