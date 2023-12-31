const gameContainer = document.getElementById("card-deck");
const startGameBtn = document.getElementById("start-game");
const instructionResultLine = document.getElementById("instruction-result");
const scoreLine = document.getElementById("score");
const playAgainBtn = document.getElementById("play-again-button");

if (localStorage.getItem("lowestScore")) {
  instructionResultLine.innerText = `Record Lowest Score: ${localStorage.getItem("lowestScore")}`;
} else {
  instructionResultLine.innerText = "Record Lowest Score: --";
}
let numberCardsClicked = 0;
let numberCorrectGuesses = 0;
let clickedCardOne;
let clickedCardTwo;
let currentScore = 0;

let colors = [];
let colorBank = [
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua"
]
selectColors();
colors = shuffle(colors);

function selectColors() {
  colorBank = shuffle(colorBank);
  for (let i = 0; i < 10; i++) {
    if (colors.length === 0) {
      colors.push(colorBank[i]);
      colors.push(colorBank[i]);
    } else {
      colors[i*2] = colorBank[i];
      colors[i*2+1] = colorBank[i];
    }
  }
}

startGameBtn.addEventListener("click", function() {
  startGameBtn.classList.add("hidden");
  createDivsForColors(colors); //div classes will be the colors in the order they were shuffled
  instructionResultLine.innerText = "Pick 2 cards";
  scoreLine.classList.remove("hidden");
});

playAgainBtn.addEventListener("click", resetGame);

// Helper function to shuffle the array. It is based on an algorithm called Fisher Yates if you want to research more.
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


// Loops over shuffledColors array, for each value it creates a new div and gives it a class with the value of the current entry
// and adds an event listener for clicking on the div/card.
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  console.log("You clicked on this card: ", event.target);
  if (numberCardsClicked === 0 && !(event.target.classList.contains("clicked"))) {
    clickedCardOne = event.target;
    changeColor(clickedCardOne);
    numberCardsClicked++;
  } else if (numberCardsClicked === 1 && !(event.target.classList.contains("clicked"))) { // If the card's background color hasn't changed yet
    clickedCardTwo = event.target;
    changeColor(clickedCardTwo);
    numberCardsClicked++;
    if (clickedCardOne.classList[0] === clickedCardTwo.classList[0]) {
      instructionResultLine.style.color = "green";
      instructionResultLine.innerText = "Correct! You got a match!";
    } else {
      instructionResultLine.style.color = "red";
      instructionResultLine.innerText = "Incorrect! The cards don't match!";
    }
    setTimeout(compareCards, 1000);
  }
}

function changeColor(clickedCard) { // Changes color of card to its background color and gives it the "clicked" class.
  clickedCard.style.background = clickedCard.classList[0]; // Color of the card = first class added to its classList.
  clickedCard.classList.add("clicked");
}

function compareCards() { //If cards don't match, "unclick them" by removing the clicked class and changing their colors back.
  if (clickedCardOne.classList[0] === clickedCardTwo.classList[0]) {
    numberCorrectGuesses++;
  } else {
    removeColor(clickedCardOne);
    removeColor(clickedCardTwo);
  }
  numberCardsClicked = 0;
  setScore(currentScore + 1);
  instructionResultLine.style.color = "black";
  instructionResultLine.innerText = "Pick 2 cards";
  if (numberCorrectGuesses >= 10) {
    finishGame();
  }
}

function removeColor(clickedCard) { //Reinstates color of card to white and removes the "clicked" class from it.
  clickedCard.style.background = "url(back_of_card.png)";
  clickedCard.style.backgroundSize = "contain";
  clickedCard.style.backgroundColor = "white";
  clickedCard.classList.remove("clicked");
}

function setScore(newScore) {
  currentScore = newScore;
  scoreLine.innerText = `Your score: ${currentScore}`;
}

function finishGame() {
  playAgainBtn.classList.toggle("hidden");
  if (!localStorage.getItem("lowestScore") || currentScore < localStorage.getItem("lowestScore")) {
    localStorage.setItem("lowestScore", `${currentScore}`);
    scoreLine.innerText = `NEW LOWEST SCORE! It took you ${currentScore} guesses!`;
  } else {
    scoreLine.innerText = `YOU WIN! It took you ${currentScore} guesses!`;
  }
  instructionResultLine.innerText = `Record Lowest Score: ${localStorage.getItem("lowestScore")}`;
}

function resetGame() {
  numberCorrectGuesses = 0;
  setScore(0);
  instructionResultLine.innerText = "Pick 2 cards";
  playAgainBtn.classList.toggle("hidden");
  selectColors();
  colors = shuffle(colors); //Before playing again, reselect and reshuffle colors of cards.
  resetDivsForColors(colors);
}

function resetDivsForColors(colorArray) {
  let divs = document.querySelectorAll(".clicked");
  for (let i = 0; i < divs.length; i++){
    removeColor(divs[i]); //Sets each card back to white and removes the clicked class
    divs[i].classList.remove(divs[i].classList[0]); // So only class remaining is the card's old color
    divs[i].classList.add(colorArray[i]);
  }
}



