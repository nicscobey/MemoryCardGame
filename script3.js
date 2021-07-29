let cardOptions;
let cardContent;
let board = document.getElementById('gameboard');
let cardCount = 0;
let deck;
let cardA = null; 
let cardB = null;
let countCorrect = 0;
let startButton = document.getElementById('start');
let startTime;
let endTime;
let cards;
let welcome = document.getElementById('welcome');

//REQUIRED THINGS TO FIX:

//BONUS THINGS TO ADD:
//change the card content -- make into objects
//choose the card background color or cardBack theme (through an API)
//select difficulty (number of cards)


function loadCardContent() {
    cardContent = ["Jan", "Feb", "Mar", "Apr", "May", "June"];


    // testCardContent = [
    //     {

    //     }
    // ];
}

// loadCardContent();

startButton.addEventListener('click', ()=> startGame());

function startGame() {
    loadCardContent();
    // cardContent = ["Jan", "Feb", "Mar"];

    welcome.style.display = "none";
    startTime = Date.now();
    console.log(startTime);

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
        // console.log(cardContent);
        let randomNum = Math.floor(Math.random() * cardContent.length);
        // console.log(randomNum);

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
        // back.innerHTML = "Pick me!";
        back.classList.add('cardBack');
        content.appendChild(back);

        let node = document.createTextNode(cardContent[randomNum]);
        back.appendChild(node);

        board.appendChild(card);

        //remove the card
        cardContent.splice(randomNum, 1);
    }
    deck = document.getElementsByClassName('card');

    //card click animation and function call
    for (let i = 0; i < deck.length; i++) {
        deck[i].addEventListener('click', ()=> clickCard(i));
    }
}

//hide a card once removed from game
function loseCard(cardNumber) {
    // console.log('loseCard: cardNumber is ' + cardNumber);
    document.getElementsByClassName('cardContent')[cardNumber].innerHTML = "";
    document.getElementsByClassName('cardContent')[cardNumber].style.border = "none";
    document.getElementsByClassName('card')[cardNumber].style.width = "0%";
}



function clickCard(cardNumber) {
    document.getElementsByClassName('cardContent')[cardNumber].style.transform = "rotateY(180deg)";
    document.getElementsByClassName('cardContent')[cardNumber].style.transition = "transform 0.4s";

    //info about card
    // console.log('clickCard: cardNumber is ' + cardNumber);
    cardCount++;
    // console.log('clickCard: cardCount is ' + cardCount);
    if (cardA == null) {cardA = cardNumber;}
    else {cardB = cardNumber;}

    if (cardCount == 2) {compareCards();}
}


function compareCards() {
    setTimeout(function compare() {
        // console.log('compareCards: A is ' + cardA + ', B is ' + cardB);
        // console.log(document.getElementsByClassName('card'));
        // console.log('cardA is ' + document.getElementsByClassName('card')[cardA].innerHTML);
        // console.log('cardB is ' + document.getElementsByClassName('card')[cardB].innerHTML);
        
        if (document.getElementsByClassName('card')[cardA].innerHTML == document.getElementsByClassName('card')[cardB].innerHTML) {
            console.log('match!'); loseCard(cardA); loseCard(cardB);
            countCorrect++;;
            console.log('cards is ' + cards);
    
            if (countCorrect == cards) {
                console.log('all done!');
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
    console.log('deck is ');
    console.log(deck);
    console.log('cardContent is ');
    console.log(document.getElementsByClassName('cardContent'));
}

function gameComplete() {
    console.log('you did it!');
    endTime = Date.now();
    console.log(endTime);
    countCorrect = 0;
    let elapsedTime = endTime - startTime;

    elapsedTime /= 1000;
    console.log('elapsed time was ' + elapsedTime);

    let seconds = Math.round(elapsedTime);
    console.log('seconds was ' + seconds);


    //update welcome
    welcome.style.display = "block";
    board.innerHTML = "";



    //FIX SO THAT WHEN PLAY AGAIN IS PUSHED, GAME RESTARTS
    startButton.innerHTML = "Play Again?";
    document.getElementById('complete').innerHTML = "Game Complete! Total Elapsed Time: ";
    document.getElementById('time').innerHTML = seconds + " seconds";

    // let content = document.createElement('div');
    // content.classList.add('cardContent');
    // card.appendChild(content);

    // console.timeEnd('Execution');
}
