const cards = document.querySelectorAll(".memory-card");

let movesCount = 0, winCount = 8;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard == true)
    {
        return;
    }

    if(this === firstCard)
    {
        return;
    }

    this.classList.add('flip');

    if(hasFlippedCard == false)
    {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else
    {
        //second click
        hasFlippedCard = false;
        secondCard = this;

        //do card match?
        checkForMatch();
    }
}

function checkForMatch() {
    if(firstCard.dataset.img === secondCard.dataset.img) {
        //its a match
        movesCount++;
        checkWin();
        disableCards();        
        //check for win
        
    }
    else {
        //not a match
        unFlipCards();            
    }
}

function checkWin() {
    if(movesCount === winCount) {
        let end_screen = document.querySelector("#end-screen");
        let board = document.querySelector(".memory-board");
        let restart_button = document.querySelector("#restart-screen");

        end_screen.style.display = "block";
        board.style.display = "none";
        restart_button.style.display = "block";

        restart_button.addEventListener("click", start);

    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", firstCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null;    
}

function shuffle() {
    for(let i = 0; i < cards.length; i++)
    {
        let randomPos = Math.floor(Math.random() * 16);
        cards[i].style.order = randomPos;
    }
}

function unFlipAll() {
    for(let i = 0; i < cards.length; i++)
    {
        cards[i].classList.remove('flip');
    }
}

function start()
{
    shuffle();
    unFlipAll();
    resetBoard();
    movesCount = 0;
    let board = document.querySelector(".memory-board");
    let start_button = document.querySelector("#start-screen");
    let end_screen = document.querySelector("#end-screen");
    // let restart_button = document.querySelector("#restart-screen");

    board.style.display = "flex";
    start_button.style.display = "none";
    end_screen.style.display = "none";    
    // restart_button.style.display = "none";

    for(var i = 0; i < cards.length; i++)
    {
        cards[i].addEventListener("click", flipCard);
    }
}

(function startGame() {
    let start_button = document.querySelector("#start-screen");
    start_button.addEventListener("click", start);
})();