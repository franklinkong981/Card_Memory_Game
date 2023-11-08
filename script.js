const gameContainer = document.getElementById("game");
let numberCardsClicked = 0;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
]; 

//Initial state of the game
let shuffledColors = shuffle(COLORS); 
createDivsForColors(shuffledColors); //div classes will be the colors in the order they were shuffled

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
  console.log("you just clicked", event.target);
  
}

