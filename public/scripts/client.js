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
  let $tweetTemplate = $(`
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

  return $tweetTemplate;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweetBlock = createTweetElement(tweet);

    $('#tweets-container').prepend($tweetBlock);
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

  const loadTweets = () => {
    $.getJSON('/tweets')
      .then((res) => {
        renderTweets(res);
      })
  }

  const $form = $('#tweet-form');
  
  // Form Submission using Jquery
  $form.on('submit', function() {
    event.preventDefault();
    //data validation
    const $input = $form.children('#tweet-text').val();
     // CHeck if text is null or empty or over 140 char
     // If so, send an alert to the user that it is empty or null
    // Do not run the code to post the tweet
    if(!$input) {
      return alert('Invalid input');
    }
    if ($input.length > 140) {
      return alert('Please enter less than 140 characters');
    }
    const serialized = $form.serialize();

    $.post('/tweets', serialized)
      .then(loadTweets())
  })
});
