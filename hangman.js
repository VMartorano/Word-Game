window.onload = function () {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x', 'y','z'];

  var category;           // Countries or Capitals
  var myCategory;         // Category selected
  var word;               // Answer
  var guess;              // Letter guessed
  var guesses = [ ];      // Stored guesses
  var attempts;           // Attempts before hanging
  var counting;           // Count of correct guesses of letters
  var spaces;             // Number of spaces in answer '_'

  var showAttempts = document.getElementById("myAttempts");
  var getHint = document.getElementById("hintB");
  var showClue = document.getElementById("clue");


// Making the list of the alphabet
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

  for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    letterList = document.createElement('li');
    letterList.id = 'letter';
    letterList.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(letterList);
    }
  }
  var chooseCategory = function () {
    if (myCategory === category[0]) {
      categoryName.innerHTML = "The category is: Countries of the World";
    } else if (myCategory === category[1]) {
      categoryName.innerHTML = "The category is: World Capitals";
    }
  }


  // Create ul of guesses
  result = function () {
    wordHolder = document.getElementById('holder');
    correctGuess = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correctGuess.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "_") {
        guess.innerHTML = "_";
        spaces = 1;
      } else {
        guess.innerHTML = "_";
      }
      guesses.push(guess);
      wordHolder.appendChild(correctGuess);
      correctGuess.appendChild(guess);
    }
  }


  // Show lives
  responses = function () {
    showAttempts.innerHTML = "You have " + attempts + " attempts remaining";
      if (attempts < 1) {
        showAttempts.innerHTML = "Sorry, Game Over";
      }
      for (var i = 0; i < guesses.length; i++) {
        if (counting + spaces === guesses.length) {
          showAttempts.innerHTML = "Congratulations! You Win $100,000";
        }
      }
  }


  // OnClick function for guessing a letter
  check = function () {
    letterList.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counting += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        attempts -= 1;
        responses();
      } else {
        responses();
      }
    }
  }


  // Play the game
  play = function () {
    category = [
      ["italy", "djbouti", "zimbabwe", "kyrgyzstan", "canada", "singapore", "fiji", "united states","brazil", "colombia", "united kingdom", "france", "somalia"],
      ["rome", "brasilia", "kabul", "abuja", "dublin", "naypyidaw", "paris", "athens", "washington dc"]
    ];

    myCategory = category[Math.floor(Math.random() * category.length)];
    word = myCategory[Math.floor(Math.random() * myCategory.length)];
    word = word.replace(/\s/g, "_");
    console.log(word);
    buttons();

    guesses = [ ];
    attempts = 10;
    counting = 0;
    spaces = 0;
    result();
    responses();
    chooseCategory();
  }

  play();


  // Hints
  hintB.onclick = function() {
    hints = [
      ["Pizza", "East Africa", "Formerly Rhodesia", "One of the eastern-most -stan", "Eh?", "Tiny country next to Malaysia", "Small Pacific island", "Star spangled", "Largest country in South America", "Major coffee producer", "The Beatles, Big Ben, Royal Family", "Snails, bread, cheese, and wine", "Horn of Africa"],
      ["Capital of Italy", "Capital of Brazil", "Capital of Afghanistan", "Capital of Nigeria", "Capital of Ireland", "Capital of Myanmar", "Eiffel Tower", "Parthenon", "The White House"]
    ];

    var categoryIndex = category.indexOf(myCategory);
    var hintIndex = myCategory.indexOf(word);
    showClue.innerHTML = "Hint: " +  hints [categoryIndex][hintIndex];
  };


  // Reset button
  document.getElementById('resetB').onclick = function() {
    correctGuess.parentNode.removeChild(correctGuess);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    play();
  }
}
