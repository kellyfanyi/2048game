var board;
var rows = 4;
var columns =4;
var score = 0;

window.onload = function(){
    setGame();
}

function setGame() {
    board =[
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]
    ]
    // board =[
    //       [2, 2, 2, 2],
    //       [2, 2, 2, 2],
    //       [4, 4, 8, 8],
    //       [4, 4, 8, 8]
    //   ]

    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){

            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile, num);
           document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){

    if(!hasEmptyTile){
        return;
    }

    let found = false;
    while(!found){
        //random r,c
        let r = Math.floor(Math.random() * rows); //0-1 * 4 -> 0-3
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;
        }
            
    }
}

function updateTile(tile, num){
     tile.innerText = "";
     tile.classList.value = "";
     tile.classList.add("tile");
     if(num>0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x" + num.toString());
        } 
        else{
            tile.classList.add("x8192");
        }
     }
}

document.addEventListener("keyup",(e)=>{
    if(e.code=="ArrowLeft"){

        slideleft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){

        slideright();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;


})



function filterZero(row){

    return row.filter(num => num!=0); // creat a new array without zores
}

function slide(row){
    //[0,2,2,2]
    row = filterZero(row); //get rid of zeros =>[2,2,2]
    //slide
    for(let j=0; j<row.length-1; j++){
        //checking every 2
        if(row[j]==row[j+1]){
            row[j]*=2;
            row[j+1]=0;
            score += row[j];



        }// from here batch [2,2,2,] will become [4,0,2]
    }



  row = filterZero(row);// here we will have [4,2]

  //adding back zero

  while(row.length<columns){
    row.push(0);
  }// so after this we get [4,2,0,0]
  return row;
}

function slideleft(){
    for(let i=0; i<rows; i++){
        let row= board[i];
        row= slide(row);
        board[i]=row;

        for( let c=0; c <columns; c++){
            let tile= document.getElementById(i.toString() + "-" + c.toString());
            let num = board[i][c];
            updateTile(tile, num);
        }
    }
}
function slideright(){
    for(let i=0; i<rows; i++){
        let row= board[i];
        row.reverse();
        row= slide(row);
        row.reverse();
        board[i]=row;

        for( let c=0; c <columns; c++){
            let tile= document.getElementById(i.toString() + "-" + c.toString());
            let num = board[i][c];
            updateTile(tile, num);
        }
    }
}
function slideUp(){
    for(let c=0; c< columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        
        for( let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile= document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    

    }
}  

function slideDown(){
    for(let c=0; c< columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        
        for( let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile= document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    

    }
}  



