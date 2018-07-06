const imgList = [
'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rudyard_Kipling_three_quarter_length_portrait.jpg/240px-Rudyard_Kipling_three_quarter_length_portrait.jpg" alt="Rudyard Kipling">', 
    
'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rudyard_Kipling_three_quarter_length_portrait.jpg/240px-Rudyard_Kipling_three_quarter_length_portrait.jpg" alt="Rudyard Kipling">', 
'<img src="https://pbs.twimg.com/media/DckYIXSVAAA0bfP.jpg" alt="Rabindranath Tagore">', 
    
'<img src="https://pbs.twimg.com/media/DckYIXSVAAA0bfP.jpg" alt="Rabindranath Tagore">', 
'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sarojini_Naidu.jpg/220px-Sarojini_Naidu.jpg" alt="Sarojini Naidu">', 
'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sarojini_Naidu.jpg/220px-Sarojini_Naidu.jpg" alt="Sarojini Naidu">', 
    
'<img src="http://www.motherandsriaurobindo.in/_StaticContent/SriAurobindoAshram/-09%20E-Library/-03%20Disciples/Sujata%20Nahar/-01%20English/-05_Mother%5Es%20Chronicles%20Book%20Five/_images/Prologue%2060%20-%200007-1.jpg" alt="Sister Nevedita">', 
    
'<img src="http://www.motherandsriaurobindo.in/_StaticContent/SriAurobindoAshram/-09%20E-Library/-03%20Disciples/Sujata%20Nahar/-01%20English/-05_Mother%5Es%20Chronicles%20Book%20Five/_images/Prologue%2060%20-%200007-1.jpg" alt="Sister Nevedita">',
    
'<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZw_iq6Li8j5YFI_WQijYNY0zEBv2vM-sd1ejZF-KF3fe5H9G" alt="John Keats">', 
    
'<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZw_iq6Li8j5YFI_WQijYNY0zEBv2vM-sd1ejZF-KF3fe5H9G" alt="John Keats">',
    
'<img src="https://m.media-amazon.com/images/M/MV5BMTg5ODgyNDgyNF5BMl5BanBnXkFtZTcwMjEwNTgxOA@@._V1_UY317_CR6,0,214,317_AL_.jpg" alt="William Shakespeare">', 
    
'<img src="https://m.media-amazon.com/images/M/MV5BMTg5ODgyNDgyNF5BMl5BanBnXkFtZTcwMjEwNTgxOA@@._V1_UY317_CR6,0,214,317_AL_.jpg" alt="William Shakespeare">', 
    
'<img src="https://lyricstranslate-f2sqfo9.stackpathdns.com/files/styles/large/public/William-Wordsworth_6834.jpg?itok=bEknMdEA" alt="William Wordsworth">', 
    
'<img src="https://lyricstranslate-f2sqfo9.stackpathdns.com/files/styles/large/public/William-Wordsworth_6834.jpg?itok=bEknMdEA" alt="William Wordsworth">', 
    
'<img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/CBRichmond.png" alt="Charlotte Bronte">', 
'<img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/CBRichmond.png" alt="Charlotte Bronte">'
];

const cardDeck = document.querySelector('.deck');
const counter = document.querySelector('.moves');
const starRating = document.querySelector('.stars');
const myStopWatch = document.getElementById('stopWatch');
const cardArray = [];
const flippedCards = [];
const matchedCards = [];
const startTrigger = [];
let totalClicks = 0;
let totalMatched = 0;
let seconds = 0;
let minutes = 0;
let mySeconds;
let myMinutes;
let t;

//  This function assigns player star rating based on number of clicks to complete the game
function rating() {
  if (totalClicks <= 29) {
    starRating.innerHTML = `
    <li><i class="fa fa-star" aria-hidden="true"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if (totalClicks >= 30 && totalClicks <= 39) {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if (totalClicks >= 40) {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>`;
  } else {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  }
}
//  Insert Default Star Rating at Start of Game
rating();

//  Create a Stop Watch
function time() {
  seconds += 1;
  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }

  if (seconds > 9) {
    mySeconds = seconds;
  } else if (seconds <= 9) {
    mySeconds = `0${seconds}`;
  } else {
    mySeconds = '00';
  }

  if (minutes > 9) {
    myMinutes = minutes;
  } else if (minutes <= 9) {
    myMinutes = `0${minutes}`;
  } else {
    myMinutes = '00';
  }
  myStopWatch.textContent = (`${myMinutes}:${mySeconds}`);
  //  Call timer function
  timer();
}

// This Function Starts the Stop Watch After 1 Second Delay Using the setTimeout Method
function timer() {
  t = setTimeout(time, 1000);
}
// This funtion Stops the Stop Watch and calls clearTimeout Function
function stop() {
  clearTimeout(t);
}


//  This function constructs modal at game end
function matchedGame() {
  if (totalMatched === 16) {
    stop();
    setTimeout(() => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `<div class='modal-content'>
      <h1>Congratulations!</h1>
      <p>Thank's for playing the Famous Laureate Memory Game.</p>
      <p>You completed the game in <span>${totalClicks}</span> Moves with a time of <span>${myStopWatch.textContent}</span> minutes</p><br>
      <div id='modal-stars'>Your Star Rating is: <ul>${starRating.innerHTML}</ul> 
      </div><br>
      <p>If you would like to play again click the button below.</p>
      <button id='modal-reset' type ="button" onclick="refreshPage()">Play Again</button>
      </div>`;
      document.body.appendChild(modal);
    }, 2000);
  }
}

//  This function removes flipped class if selected cards do not match add matched class if matched
function checkFlipped() {
  if (flippedCards.length === 2 && flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
    setTimeout(() => {
      for (let i = 0; i < flippedCards.length; i += 1) {
        flippedCards[i].classList.remove('flipped');
      }
      //  Clear flippedCards Array
      flippedCards.splice(0, 16);
    }, 2000);
  } else if (flippedCards.length === 2 && flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
    for (let i = 0; i < flippedCards.length; i += 1) {
      flippedCards[i].classList.add('matched');
      matchedCards.push(this);
      totalMatched += 1;
    }
    //  Clear flippedCards Array
    flippedCards.splice(0, 16);
    //  Call matchedGame function
    matchedGame();
  }
}

//  Loops over imgList Array - Constructs Cards - Pushes to Card Array
function createCards() {
  for (let i = 0; i < imgList.length; i += 1) {
    const cards = document.createElement('div');
    cards.classList.add('card');
    cards.innerHTML = `<div class='back'>${imgList[i]}</div>
    <div class='front'><i class="fa fa-book" style="font-size:2em;color:#ffffff;"></i></div>`;
    cardArray.push(cards);
  }
  //  Loops and Shuffles Card Array
  for (let i = cardArray.length - 1; i >= 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = cardArray[randomIndex];
    cardArray[randomIndex] = cardArray[i];
    cardArray[i] = itemAtIndex;
  }
}
// Call createCards function
createCards();

cardArray.forEach((card) => {
  //  Adds Event Listener to Cards - Assigns Flipped Class to Flipped Cards
  card.addEventListener('click', () => {
    //  Prevents Event Listener/Counter Iteration (Double Click) If classList.length > 1
    if (card.classList.length < 2) {
      //  Push Clicked Cards Into flippedCards Array
      flippedCards.push(card);
      //  Push Clicked Cards Into startTrigger Array
      startTrigger.push(card);
      //  limit the number of flipped cards to two
      if (flippedCards.length < 3) {
        card.classList.add('flipped');
        // Track totalClicks
        totalClicks += 1;
        //  Update Counter
        counter.innerHTML = totalClicks;
      }
      //  Trip Start Time
      if (startTrigger.length === 1) {
        time();
      }
      //  Test Rating With Every Click
      rating();
      //  Test flippedCards for Pair Match
      checkFlipped();
    }
  });
  //  Append Shuffled Cards to HTML Document
  cardDeck.appendChild(card);
});


//This function reloads/restarts the game
function refreshPage(){
  window.location.href = window.location.href;
}