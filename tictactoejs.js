const replaybtn=document.getElementById("replay");
var origBoard;
const player1='X';
const player2='O';
var currPlayer=player1;
var won=false;
var isAIpressed=false;
var isAIGame=false;
const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]
]
const cells=document.getElementsByClassName("cell");
var minimaxBtn=document.getElementById("minimax");
var twoPlayerBtn=document.getElementById("2players");
var modeLabel=document.getElementById("currently");

minimaxBtn.addEventListener('click',()=>{
    twoPlayerBtn.style.background="blue";
    minimaxBtn.style.background="darkblue";
    isAIpressed=true;
    if(!isAIGame)
    {
        replaybtn.innerHTML="Click to change mode!";
    }else{
        replaybtn.innerHTML="Restart";
    }
});

twoPlayerBtn.addEventListener('click',()=>{
    minimaxBtn.style.background="blue";
    twoPlayerBtn.style.background="darkblue";
    isAIpressed=false;
    if(isAIGame)
    {
        replaybtn.innerHTML="Click to change mode!";
    }else{
        replaybtn.innerHTML="Restart";
    }
});

replaybtn.addEventListener('click',() => {
    startGame();
});

startGame();

function startGame()
{
    document.getElementById("endgame").style.display="none";
    origBoard=Array.from(Array(9).keys());
    replaybtn.innerHTML="Restart";
    currPlayer=player1;
    won=false;
    if(isAIpressed)
    {
        isAIGame=true;
        modeLabel.innerHTML="Currently playing: Unbeatable AI (MiniMax) mode";
        minimaxBtn.style.background="darkblue";
    }
    else{
        isAIGame=false;
        modeLabel.innerHTML="Currently playing: 2 Players mode";
        twoPlayerBtn.style.background="darkblue";
    }
    for(var i=0;i<cells.length;i++)
    {
        cells[i].textContent="";
        cells[i].style.backgroundColor="transparent";
        cells[i].addEventListener('click',turnClick,false);
    }
}

function turnClick(cell)
{
    if(won==true){
        return;
    }
    if(!movesLeft())
    {
            document.getElementById("endgame").textContent="Its a draw!";
            document.getElementById("endgame").style.display="block";
            won=true;
            return;
    }
    if(currPlayer==player1){
        turn(cell.target.id,currPlayer);
        currPlayer=player2;
        if(isAIGame)
        {
            var bm=findBestMove();
            origBoard[bm]=currPlayer;
            document.getElementById(bm).innerText=currPlayer;
            checkWin(origBoard,currPlayer);
            currPlayer=player1;
        }
    }else{
        turn(cell.target.id,currPlayer);
        currPlayer=player1;
    }
}

function turn(cellId,player)
{
    origBoard[cellId]=player;
    document.getElementById(cellId).innerText=player;
    checkWin(origBoard,player);
}

function checkWin(board,player)
{
    var curPlayerArr=[];
    var j=0;
    var winFlag=false;
    var winningStreak=0;
    for(var i=0;i<cells.length;i++)
    {
        if(board[i]==currPlayer){
            curPlayerArr[j]=i;
            j++;
        }
    }
    for(var i=0;i<winCombos.length;i++)
    {
        if(winCombos[i].every(elem=>curPlayerArr.includes(elem))){
            winFlag=true;
            winningStreak=i;
            won=true;
        }
    }
    if(winFlag==true)
    {
        var streak=winCombos[winningStreak];
        cells[streak[0]].style.backgroundColor="green";
        cells[streak[1]].style.backgroundColor="green";
        cells[streak[2]].style.backgroundColor="green";
        document.getElementById("endgame").textContent=currPlayer+"  Wins!";
        document.getElementById("endgame").style.display="block";
    }
    else if(!movesLeft())
    {
        document.getElementById("endgame").textContent="Its a draw!";
        document.getElementById("endgame").style.display="block";
        won=true;
    }
}

function movesLeft()
{
    for(var i=0;i<origBoard.length;i++)
    {
        if(origBoard[i]!='X' && origBoard[i]!='O')
        {
            return true;
        }
    }
    return false;
}

function minimax(depth,isMax)
{
    var score=evaluate();

    var otherPlayer;
    if(currPlayer==player1)
    {
        otherPlayer=player2;
    }
    else{
        otherPlayer=player1;
    }

    if(score==10 || score==-10)
    {
        return score;
    }
    if(movesLeft()==false)
    {
        return 0;
    }
    if(isMax)
    {
        var best=-1000;

        for(var i=0;i<origBoard.length;i++)
        {
            if(origBoard[i]!='X' && origBoard[i]!='O')
            {
                var temp=origBoard[i];
                origBoard[i]=currPlayer;
                best=Math.max(best,minimax(depth+1,!isMax));
                origBoard[i]=temp;
            }
        }
        return best;
    }
    else{
        var best=1000;

        for(var i=0;i<origBoard.length;i++)
        {
            if(origBoard[i]!='X' && origBoard[i]!='O')
            {
                var temp=origBoard[i];
                origBoard[i]=otherPlayer;
                best=Math.min(best,minimax(depth+1,!isMax));
                origBoard[i]=temp;
            }
        }
        return best;
    }
}

function evaluate()
{
    var curPlayerArr=[];
    var otherPlayerArr=[];
    var j=0,k=0;
    var otherPlayer;
    if(currPlayer==player1)
    {
        otherPlayer=player2;
    }
    else{
        otherPlayer=player1;
    }
    for(var i=0;i<cells.length;i++)
    {
        if(origBoard[i]==currPlayer){
            curPlayerArr[j]=i;
            j++;
        }else if(origBoard[i]==otherPlayer){
            otherPlayerArr[k]=i;
            k++;
        }
    }
    for(var i=0;i<winCombos.length;i++)
    {
        if(winCombos[i].every(elem=>curPlayerArr.includes(elem))){
            return 10;
        }
    }
    for(var i=0;i<winCombos.length;i++)
    {
        if(winCombos[i].every(elem=>otherPlayerArr.includes(elem))){
            return -10;
        }
    }
    return 0;
}

function findBestMove()
{
    var bestVal=-1000;
    var bestMove;

    for(var i=0;i<origBoard.length;i++){
        if(origBoard[i]!='X' && origBoard[i]!='O'){
            var temp=origBoard[i];
            origBoard[i]=currPlayer;

            var moveVal=minimax(0,false);
            origBoard[i]=temp;
        }
        if(moveVal>bestVal)
        {
            bestMove=i;
            bestVal=moveVal;
        }
    }
    return bestMove;
}