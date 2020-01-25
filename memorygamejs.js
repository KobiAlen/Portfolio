const replaybtn=document.getElementById("replay");
const cards = document.getElementsByClassName("memorycard");
let hasFlippedCard=false;
let lockBoard;
let firstCard, secondCard;

startGame();

replaybtn.addEventListener('click',() => {
    startGame();
});

function startGame()
{
    for(var i=0;i<cards.length;i++)
    {
        cards[i].addEventListener("click",flipCard);
        cards[i].classList.remove('flip');
        cards[i].style.boxShadow="0px 0px 10px white"
    }
    resetBoard();
    shuffle();
}

function flipCard()
{
    if(lockBoard) return;
    if(this == firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
        return;
    }
    hasFlippedCard=false;
    secondCard=this;
        
    checkForMatch();
}

function checkForMatch()
{
    if(firstCard.dataset.framework == secondCard.dataset.framework)
    {
        firstCard.style.boxShadow="0px 0px 30px green"
        secondCard.style.boxShadow="0px 0px 30px green"
        disableCards();
    }else{
        unflipCards();
    }
}

function disableCards()
{
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unflipCards()
{
    lockBoard=true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    } ,700);
}

function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard,secondCard]=[null,null];
}

function shuffle(){
    for(var i=0;i<cards.length;i++)
    {
        let randomPos= Math.floor(Math.random()*12);
        cards[i].style.order=randomPos;
    }
}
