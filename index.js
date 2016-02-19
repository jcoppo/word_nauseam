var score, tries, theWord, shortWord, maxLetters, gameType;

gameType = 1;

var inPlay = true;

score = 0;
document.getElementById("scoreNumber").innerHTML = score;

var letterSlots = [];

var message = document.getElementById('message');
var topBox = document.getElementById('top-box');
var bottomBox = document.getElementById('bottom-box');
var newGameButtom = document.getElementById('new-game');
var maxLettersForm = document.getElementById('max-letters');
var userPic = document.getElementById('user-pic');

maxLetters = maxLettersForm.value;

var bottomBoxColor = "#4da6ff";
console.log(bottomBoxColor);

// userPic.src = "http://vignette4.wikia.nocookie.net/pokemon/images/5/55/004Charmander_OS_anime_3.png/revision/latest?cb=20150330015131";

newGameButtom.onclick = function() {
  newRound();
};

topBox.onclick = function() {
  makeGuess()
};
bottomBox.onkeyup = function(event) {
  if (event.keyCode == 13) {
    if (inPlay == false) {
      newRound();
    } else {
      switch (gameType) {
        case 1: makeGuess(); break;
        case 2: makeGuessBlanksGame(); break;
        default: break;
      }

    }
  };
}

//start Game
newRound();

function setGame(n) {
  console.log(n);

  gameType = n;
  newRound();
}

function newRound() {
  inPlay = true;
  tries = 1;
  topBox.innerHTML = "...";
  bottomBox.value = "";
  bottomBox.style.color = bottomBoxColor;
  maxLetters = maxLettersForm.value;
  RandomWord();
  message.innerHTML = "Guess the word";
  newGameButtom.style.display = "none";

}

function makeGuess() {

  if (inPlay == true) {

    if (bottomBox.value == theWord){

      youWin();

    } else {

      tries++;
      shortWord = theWord.slice(0, tries);

      if (shortWord == theWord) {
            topBox.innerHTML = theWord;

            youLose();

      } else {
            topBox.innerHTML = shortWord + "...";

            bottomBox.value = shortWord;
            message.innerHTML = "Nope!";
      }

    }
  }
}

function makeGuessBlanksGame() {

  if (inPlay == true) {

    if (bottomBox.value == theWord){

      youWin();

    } else {

      youLose();

      for (var i = 0; i < letterSlots.length; i++) {
        letterSlots[i].innerHTML = theWord[i];
      };

    }
  }
}

function youWin() {

  var letters = theWord.length-tries;
  var winnings = Math.pow(2, letters);
  score += winnings;
  message.innerHTML = "YAY! You got " + winnings + " points."
  document.getElementById("scoreNumber").innerHTML = score;
  newGameButtom.style.display = "inline-flex";
  inPlay = false;

  if (gameType == 1) {
    topBox.innerHTML = theWord;
  } else {
    for (var i = 0; i < letterSlots.length; i++) {
      letterSlots[i].innerHTML = theWord[i];
    };
  }

  var ownedWords = document.getElementById('owned-words');
  var addedWord = document.createElement('li');
  addedWord.innerHTML = theWord;
  ownedWords.appendChild(addedWord);
}

function youLose() {
  message.innerHTML = "Nope! You got 0 points.";
  bottomBox.style.color = "red";
  newGameButtom.style.display = "inline-flex";
  inPlay = false;
}

function startBlanksGame() {

  topBox.innerHTML = "";
  letterSlots = [];

  for (var i = 0; i < theWord.length; i++) {
    var letterSpan = document.createElement('span');
    letterSpan.className = "letter-span";
    letterSpan.innerHTML = theWord[i];
    topBox.appendChild(letterSpan);
    letterSlots.push(letterSpan);
  };

  var n = Math.floor(Math.random()*theWord.length);
  topBox.children[n].innerHTML = "-";

}

function RandomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
}

function RandomWordComplete(data) {

  if (data.Word.length > maxLetters) {

    RandomWord();

  } else {

    theWord = data.Word;
    shortWord = theWord.slice(0, tries);
    topBox.innerHTML = shortWord + "...";
    bottomBox.value = shortWord;
    bottomBox.focus();

    if (gameType == 2) {
        startBlanksGame();
        bottomBox.value = "";
    }

  }

}
