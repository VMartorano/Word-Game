window.onload = function () {
  // creating the alphabet array that will be used for players to choose a letter he/she wants to guess
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x', 'y','z'];

// Creating the global variables
  var category;           // Countries or Capitals
  var myCategory;         // Category selected
  var word;               // Answer
  var guess;              // Letter guessed
  var guesses = [ ];      // Stored guesses
  var attempts;           // Attempts before hanging
  var counting;           // Count of correct guesses of letters
  var spaces;             // Number of spaces in answer '_'

// creating variables for the attempts, the button for hints, as well as the clue. The getElementById() method returns the element that has the ID attribute with the values "myAttempts", "hintB", "clue",  respectively
  var showAttempts = document.getElementById("myAttempts");
  var getHint = document.getElementById("hintB");
  var showClue = document.getElementById("clue");


// Making the unorderd list of the alphabet
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');


// looping through the alphabet variable to put the alphabet into the unordered list, letters, each list item being a letter, running the check method defined below, as well as connecting those to the the div, butttons.
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

  // creating a variable funtion that checks if the category that is currently active is in the first or the second spot of the array of category (you will see them farther down). If it is in the first position, it will return "The category is: Countries of the World". If in the second, it will return "The category is: World Capitals". myCategory is given its valye below.
  var chooseCategory = function () {
    if (myCategory === category[0]) {
      categoryName.innerHTML = "The category is: Countries of the World";
    } else if (myCategory === category[1]) {
      categoryName.innerHTML = "The category is: World Capitals";
    }
  }


  // Create an unordered list of correct guesses and where the words will be.
  result = function () {
    wordHolder = document.getElementById('holder');
    correctGuess = document.createElement('ul');

// A loop that goes through each letter of the word and see if the one you have guessed matches the one (or more) of the spots in the word it loops through. The setAttribute() method adds the ID attribute to the unorderd list of what would be the correct gueses, the correctGuess element, and gives each of them the value of 'my-word. It creates a list item witin the unordered list that will record the letter you have guessed, and gives it a class, "guess". It then checks to see if the letter guessed matches the a letter in the word, whos value is given below, and then adds one to the space variable when guessed correctly , if not it just keeps the spot as '_' (see towards bottom). The letter guessed it then pushed into the guesses array and then adds the the correct guess to the holder.
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
  // takes the number of attempts the player has and displays it back. player starts off with 10 attempts (see below). if the attempts reach less than one, then the text will instead read "Sorry, Game Over". then it loops through the guesses array and checks to see if the correct guesses (counting), and the letters in the word (spaces) align, the text will instead display "Congratulations! You Win $100,000".
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
  // This creates an onclick functon for the letter buttons that were created in the unordered list above. the guess is recorded into a class. a loop is then run that if the index value (letter) of a word is the same as the letter clicked, the index value of guesses is the guess, and the number of correct guesses (counting) is inclusively (+=) increaseing.
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

//This if state ments checks the letter that is guessed and decrease the attemps if the guess is wrong and then shows the response corresponding to the amount of attemps left. 
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

  // the play function is where the category array gets its values (only 2, each with their own nested array). myCategory is randomly selected from the category length(2), so the values of 0 and 1, countries and capitals respectively, then chooses a position in the selected category sub-array at random, which becomes the word that is supposed to be guessed, and that is checked against the letters in the funciton above. It then replaces each letter with "_". the buttons function is then called to have all the letters available to be guessed.
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


// this gives the global variables these values when ever the game is started (or reset). then it runs the result, responses, and chooseCategory functions.
    guesses = [ ];
    attempts = 10;
    counting = 0;
    spaces = 0;
    result();
    responses();
    chooseCategory();
  }

// the play function is called to start the game

  play();


  // Hints

  // a onclick function for the hint button. The hints array is basically identical in structure to the categories array and each hint corresponds respectively to the words in the category arrays.
  hintB.onclick = function() {
    hints = [
      ["Pizza", "East Africa", "Formerly Rhodesia", "One of the eastern-most -stan", "Eh?", "Tiny country next to Malaysia", "Small Pacific island", "Star spangled", "Largest country in South America", "Major coffee producer", "The Beatles, Big Ben, Royal Family", "Snails, bread, cheese, and wine", "Horn of Africa"],
      ["Capital of Italy", "Capital of Brazil", "Capital of Afghanistan", "Capital of Nigeria", "Capital of Ireland", "Capital of Myanmar", "Eiffel Tower", "Parthenon", "The White House"]
    ];


// getting variables and checking the index position of the category and word chosen, and dislpays the hint after cross referenced between arrays (like described above).
    var categoryIndex = category.indexOf(myCategory);
    var hintIndex = myCategory.indexOf(word);
    showClue.innerHTML = "Hint: " +  hints [categoryIndex][hintIndex];
  };


  // Reset button
  // when the reset button is clicked, the guesses are cleared and the buttons pressed are as well thanks to removeChild. the hint will not appear on the screen, giving the player the opportunity to click it again when the game is reset. the play function is then run to bring it back to the base.

  document.getElementById('resetB').onclick = function() {
    correctGuess.parentNode.removeChild(correctGuess);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    play();
  }
}
