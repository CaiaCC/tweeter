/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevent cross-site script
const escape = function(str) {
  let div = document.createElement('div');

  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//generate tweet template
const createTweetElement = function(tweet) {
  const user = tweet.user;
  const content = tweet.content.text;
  const safeContent = escape(content);
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
        <p>${safeContent}</p>
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
  `);

  return $tweetTemplate;
};

//Post tweets on the top of the tweet section
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweetBlock = createTweetElement(tweet);

    $('#tweets-container').prepend($tweetBlock);
  }
};

//Load past tweets to the page
const loadTweets = () => {
  $.getJSON('/tweets')
    .then((res) => {
      renderTweets(res);
    });
};

$(document).ready(() => {
  
  loadTweets();

  // Fixed Nav
  // When the user scrolls the page, execute myFunction
  window.onscroll = () => {myFunction();};
  // Get the nav
  const nav = document.getElementById("fixed-nav");
  // Get the offset position of the navbar
  const sticky = nav.offsetTop;
  // Add the sticky class to the nav when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

  const $form = $('#tweet-form');
  
  //Submit form through Jquery
  $form.on('submit', function() {
    event.preventDefault();
    const $input = $form.children('#tweet-text').val();
    // validate input, if it's valid, post it
    if (!$input) {
      $('#error-msg').css('visibility', 'visible');
      $('#msg').text('Invalid input!');
      return;
    } else if ($input.length > 140) {
      $('#error-msg').css('visibility', 'visible');
      $('#msg').text('Please enter less 140 characters!');
      return;
    } else {
      $('#error-msg').css('visibility', 'hidden');
      const serialized = $form.serialize();
      
      $.post('/tweets', serialized)
        .then((res) => {
          const tweet = res[res.length - 1];

          loadTweets(tweet);
        });
    }
  });

});
