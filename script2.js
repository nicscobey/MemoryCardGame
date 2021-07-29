// let cardContent = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
let board = document.getElementById('gameboard');
let cardCount = 0;
let deck;
let cardA = null; 
let cardB = null;
let cardContent = [];

document.querySelector("#search-form").addEventListener("submit", cardSearch);

//API
const apiKey = "i9u5FoDahfPMI2LFAipRD3KXJ45afk0f";
async function cardSearch(event) {
    event.preventDefault();
    const searchTerm = "animal";
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`);
    const searchData = await response.json();

    for (let i = 0; i < 12; i++) {
        const url = searchData.data[i].images.fixed_width.url;
        const img = document.createElement('img');
        img.setAttribute('src', url);
        cardContent.push(img);
    }
}

console.log(cardContent);

// const apiKey = "i9u5FoDahfPMI2LFAipRD3KXJ45afk0f"
// async function giphySearch(event){
//     event.preventDefault();
//     const giphyResultsDiv = document.getElementById('giphy-results');

//     //   const searchTerm = document.querySelector('input[name="search-term"]').value;
//     const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`);
//     const giphyData = await response.json();
  
//     const url = giphyData.data[0].images.fixed_width.url;
//     const image = document.createElement('img');
//     image.setAttribute('src', url);
//     giphyResultsDiv.appendChild(image);
// }

// let cardContent = [
//     {
//         color: "blue",
//         month: "Jan"
//     },
//     {
//         color: "red",
//         month: "Feb"
//     },
//     {
//         color: "green",
//         month: "March"
//     }
// ];


//REQUIRED THINGS TO FIX:
//reverse fronts and backs
//change the card content
//make card flip AFTER click, not before
//update card hover css -- make it pop out?

//BONUS THINGS TO ADD:
//add a timer to track how long it takes to clear the board
//window to start the timer and game
//choose the card background color or cardBack theme (through an API)
//select difficulty (number of cards)


//duplicate each card in the deck
let cards = cardContent.length;
for (let i = 0; i < cards; i++) {
    console.log(cards);
    cardContent.push(cardContent[i]);
}

//randomly chooses an item from cards and then removes it from the array
function addCards() {
    while (cardContent.length > 0) {
        console.log(cardContent);
        let randomNum = Math.floor(Math.random() * cardContent.length);
        console.log(randomNum);

        //create the card
        let card = document.createElement("div");
        card.classList.add('card');
        let content = document.createElement('div');
        content.classList.add('cardContent');
        card.appendChild(content);
        let front = document.createElement('div');
        front.classList.add('cardFront');
        content.appendChild(front);
        let back = document.createElement('div');
        back.innerHTML = "Pick me!";
        back.classList.add('cardBack');
        back.style.backgroundColor = cardContent[randomNum].color;
        content.appendChild(back);

        let node = document.createTextNode(cardContent[randomNum].month);
        front.appendChild(node);

        board.appendChild(card);

        //remove the card
        cardContent.splice(randomNum, 1);
    }
    deck = document.getElementsByClassName('card');
}

//eventually, make a page with a button to start the game and call addCards
addCards();

//hide a card once removed from game
function loseCard(cardNumber) {
    console.log('loseCard: cardNumber is ' + cardNumber);
    document.getElementsByClassName('card')[cardNumber].innerHTML = "";
    document.getElementsByClassName('card')[cardNumber].style.width = "0%";
}

//card click animation and function call
for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener('click', ()=> clickCard(i));
}

function clickCard(cardNumber) {
    console.log('clickCard: cardNumber is ' + cardNumber);
    cardCount++;
    console.log('clickCard: cardCount is ' + cardCount);
    if (cardA == null) {cardA = cardNumber;}
    else {cardB = cardNumber;}

    if (cardCount == 2) {compareCards();}
}

function compareCards() {
    console.log('compareCards: A is ' + cardA + ', B is ' + cardB);
    console.log(document.getElementsByClassName('card'));
    console.log('cardA is ' + document.getElementsByClassName('card')[cardA].innerHTML);
    console.log('cardB is ' + document.getElementsByClassName('card')[cardB].innerHTML);
    if (document.getElementsByClassName('card')[cardA].innerHTML == document.getElementsByClassName('card')[cardB].innerHTML) {console.log('match!'); loseCard(cardA); loseCard(cardB);}
    else {console.log('they dont match');}
    cardA = null;
    cardB = null;
    cardCount= 0;
}