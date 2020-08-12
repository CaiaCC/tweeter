/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const user = tweet.user;
  const content = tweet.content.text;
  const timeStamp = tweet.created_at;
  const date = new Date(timeStamp);
  const day = date.toLocaleDateString();
  let $tweet = $(`
  <article class="tweet">
      <header>
        <div class="tweet-name">
          <img class="avatar" src=${user.avatars}>
          <p>${user.name}</p> 
        </div>
        <div class="hover-text">
          <p>${user.handle}</p>
        </div> 
      </header>
      <div class="tweet-content">
        <p>${content}</p>
      </div>
      <footer>
        <div>
          <p>posted on: ${day}</p>
        </div>
        <div>
          <img class="icon" src="./images/ghost.png"> 
          <img class="icon" src="./images/ghost.png">
          <img class="icon" src="./images/ghost.png">
        </div>
      </footer>
    </article>
  `)

  return $tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $newTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($newTweet);
  }
}



$(document).ready(() => {
  
  // Fixed Nav
  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {myFunction()};
  // Get the nav
  var nav= document.getElementById("fixed-nav");
  // Get the offset position of the navbar
  var sticky = nav.offsetTop;
  // Add the sticky class to the nav when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }
  
  

  // Form Submission using Jquery
  // const $tweetText = $('#tweet-text');
  const $form = $('#tweet-form');

  $form.submit(event => {
    event.preventDefault();
    const serialized = $form.serialize();

    $.post('/tweets', serialized)
      .then((tweetText) => {
        console.log(tweetText);
      });
  })
 
  // const loadTweets = (res) => {
  //     renderTweets(res);
  //   })
  const loadTweets = () => {
    $.getJSON('/tweets')
      .then((res) => {
        renderTweets(res);
      })
  }
  
  loadTweets();
  
});
