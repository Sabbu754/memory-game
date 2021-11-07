/** 
* @description makes a grid of 16 cards which are added to an HTML table element
* displayed immediately on window.onload 
*/
function displayCards() {
	for (let x = 0; x < 4; x++) {
		let newTr = document.createElement("tr");
		newTr.setAttribute("id", "row"+ x);
		let TrElement = document.getElementById("game");
		TrElement.appendChild(newTr);

    for (let y = 0; y < 4; y++) {
		let newTd = document.createElement("td");
		newTd.className = "card hidden";
		let TdElement = document.getElementById("row"+ x);
		TdElement.appendChild(newTd);
  }
  }
}
window.onload = displayCards();




/**
 * @description Function for randomizing array
 * @param {array} array
 * @return {array} shuffled Array
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}




// Make array with 2 x 8 numbers (newArray), shuffle this array
const allCards = document.querySelectorAll(".card");
const arrayWithNumbers = [...Array(8).keys()];
const myArray = arrayWithNumbers.concat([...Array(8).keys()]);
const newArray = shuffle(myArray);
let points = 0;
let turn = 0;
let clickCount = 0;
let moves = 0;




/**
 * @description Function to assign randomized numbers from an array to cards displayed
 * @returns Array content is displayed in DOM element
 */
function shuffleCards() {
	for (let a = 0; a < newArray.length; a++) {
		const arrayContent = newArray[a];
		allCards[a].innerHTML += arrayContent;
    };
  };




/**
 * @description Function for user to click on Cards
 * @constructor
 * @param allCards (NodeList)
 */
function userClick() {
    allCards.forEach(function(item) {
    item.addEventListener("click", function() {
		
        if (clickCount < 2) {
			clickCount++;
			this.classList.toggle("hidden");
			this.classList.toggle("selected");
      }
        if (userCard.length === 2) {
			moves++;
			document.getElementById("moves").innerHTML = moves;
			setTimeout(cardMatch, 1500)
      }
		else
			clickCount = 0;
});
});
}



/**
 * @description Function to check user choice
 * @constructor
 * @param {array} userCard
 */
const userCard = document.getElementsByClassName("selected");
function cardMatch() {
	if (userCard[0].innerHTML === userCard[1].innerHTML) {
		correctGuess();
		points++;
		clickCount = 0;
		if (points === 8) {
		  gameWon();
		}
  }
	else if (userCard[0].innerHTML !== userCard[1].innerHTML)  {
		wrongGuess();
		clickCount = 0;
		turn++;
		starRating();
	}
}



/**
 * @description Function to remove selected class from card of user choice
 */
function correctGuess() {
	let selectedCard = document.querySelectorAll(".selected");
	selectedCard.forEach(function(item) {
	item.classList.add("correct");
	item.classList.remove("selected");
});
}



/**
 * @description Function to remove selected class from card of user choice
 */
function wrongGuess() {
	let selectedCard = document.querySelectorAll(".selected");
	selectedCard.forEach(function(item) {
		item.classList.remove("selected");
		item.classList.add("hidden");
});
}




/** 
 * @description Function to change star rating depending on user performance ("turn") during the game
 */
function starRating() {
	var starRating = document.getElementsByClassName("checked")
	if ((turn > 5) && (starRating.length > 1)) {
		starRating[starRating.length - 1].classList.remove("checked");
		turn = 0;
}
}




/**
 * @description Timer function in hh:mm:ss format as DOM element
Reference for displaying time (s) in hh:mm:ss format: https://www.w3schools.com/howto/howto_js_countdown.asp 
*/
function startTimer() {
	const start = Date.now();
	setInterval(function() {
		var delta = (Date.now() - start);
		let seconds = Math.floor((delta % (1000 * 60)) / 1000);
		let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
		let hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		document.getElementById("time-displayed").innerHTML = hours + "h " +
		minutes + "m " + seconds + "s ";
	})
}




/**
 * @description Button to refresh Game
 */
const buttonRestart = document.getElementById("restart");
buttonRestart.addEventListener('click', function() {
	location.reload();
});




/**
 * @description Alert winning statistics to user
Resource: https://www.w3schools.com/howto/howto_css_modals.asp 
*/
const modal = document.getElementById('modal');
const btn = document.getElementById("test");
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function gameWon() {
	modal.style.display = "block";
	let finalTime = document.getElementById("time-displayed").innerHTML;
	let starRating = document.querySelector(".stars").innerHTML;
	document.getElementById("moves-finished").innerHTML = "You finished in " + moves + " moves.";
    document.getElementById("time-finished").innerHTML = "Your final time is " + finalTime;
    document.getElementById("stars-finished").innerHTML = "You finished the game with " + starRating;
}




/**
 * @description Function to play the game
 * @constructor
 */
function game() {
	document.getElementById("moves").innerHTML = "Move: " + moves;
	shuffleCards();
	userClick();
	startTimer()
}

game();
