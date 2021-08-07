let cardOptions;
let cardContent = [];
let board = document.getElementById('gameboard');
let cardCount = 0;
let deck;
let cardA = null; 
let cardB = null;
let countCorrect = 0;
let restartButton = document.getElementById('restartButton');
let restartSection = document.getElementById('restart');
let startTime;
let endTime;
let cards;
let welcome = document.getElementById('welcome');
let submitButton = document.getElementById('submitButton');

let deckSize;
    
async function searchForImages(event){
    event.preventDefault();
    console.log('in searchforimages');

    //determine deckSize 
    if (document.querySelector('select[name="difficulty"]').value == "easy") {
        console.log('easy')
        deckSize = 5;
    }
    else if (document.querySelector('select[name="difficulty"]').value == "medium") {
        console.log('med')
        deckSize = 10;
    }
    else {
        console.log('hard')
        deckSize = 15;
    }


        const theme = document.querySelector('input[name="theme"]').value;
        const apiKEY = "i9u5FoDahfPMI2LFAipRD3KXJ45afk0f";
        const urlString = "https://api.giphy.com/v1/gifs/search?api_key="+apiKEY+"&q="+theme;
        const response = await fetch(urlString);
        const gifs = await response.json();

        
    // }
    
    for (let imgNumber = 0; imgNumber < deckSize; imgNumber++) {
        const url = gifs.data[imgNumber].images.fixed_width.url; 
        cardContent.push(url);
    }

    startGame();
}

document.querySelector("#imgSearch").addEventListener("submit", searchForImages);


restartButton.addEventListener('click', ()=> startGame());

function startGame() {
    document.getElementById('imgSearch').style.display = "none";
    startTime = Date.now();

    //duplicate each card in the deck
    cards = cardContent.length;
    for (let i = 0; i < cards; i++) {
        cardContent.push(cardContent[i]);
    }
    
    addCards();
}

//randomly chooses an item from cards and then removes it from the array
function addCards() {
    while (cardContent.length > 0) {
        let randomNum = Math.floor(Math.random() * cardContent.length);

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
        
        back.classList.add('cardBack');
        content.appendChild(back);

        back.style.backgroundImage = "url("+(cardContent[randomNum])+")";

        board.appendChild(card);

        //remove the card if a match
        cardContent.splice(randomNum, 1);
    }
    deck = document.getElementsByClassName('card');

    //card click animation and function call
    for (let i = 0; i < deck.length; i++) {
        deck[i].addEventListener('click', ()=> clickCard(i));
    }
}

function loseCard(cardNumber) {
    document.getElementsByClassName('cardContent')[cardNumber].innerHTML = "";
    document.getElementsByClassName('cardContent')[cardNumber].style.border = "none";
    document.getElementsByClassName('card')[cardNumber].style.width = "0%";
}



function clickCard(cardNumber) {
    document.getElementsByClassName('cardContent')[cardNumber].style.transform = "rotateY(180deg)";
    document.getElementsByClassName('cardContent')[cardNumber].style.transition = "transform 0.4s";

    cardCount++;
    if (cardA == null) {cardA = cardNumber;}
    else {cardB = cardNumber;}

    if (cardCount == 2) {compareCards();}
}


function compareCards() {
    setTimeout(function compare() {
        if (document.getElementsByClassName('card')[cardA].innerHTML == document.getElementsByClassName('card')[cardB].innerHTML) {
            loseCard(cardA); 
            loseCard(cardB);
            countCorrect++;;
    
            if (countCorrect == cards) {
                gameComplete();
            }    
        }
        else {
            console.log('they dont match');
            document.getElementsByClassName('cardContent')[cardA].style.transform = "rotateY(0)";
            setTimeout(document.getElementsByClassName('cardContent')[cardA].style.transition.transform = "", 3000);
            document.getElementsByClassName('cardContent')[cardB].style.transform = "rotateY(0)";
            setTimeout(document.getElementsByClassName('cardContent')[cardB].style.transition.transform = "", 3000);
    
        }
        
        cardA = null;
        cardB = null;
        cardCount= 0;
    }, 1000);
}

function gameComplete() {
    endTime = Date.now();
    countCorrect = 0;
    let elapsedTime = endTime - startTime;
    elapsedTime /= 1000;
    let seconds = Math.round(elapsedTime);
    restartSection.style.display = "block";
    board.innerHTML = "";
    document.getElementById('complete').innerHTML = "Game Complete! Total Elapsed Time: ";
    document.getElementById('time').innerHTML = seconds + " seconds";
}

restartButton.addEventListener('click', () => {
    document.getElementById('imgSearch').style.display = "flex";
    restartSection.style.display = "none";
})