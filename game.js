﻿// Creating variables
var size=200;
var grid=[];
for(var i=0; i<3; i++){
    grid[i]=[];
    for(var j=0; j<3; j++){
        grid[i][j]=0;
    }
}
var turn=0;
var click=0;
var x=new Image(), o=new Image();
x.src="x.png";
o.src="blue-circle-hi.png";
var whatInARow=0;
var start=true;
var fullPoleta=0;
var player1Wins=0, player2Wins=0;

var myStorage = window.localStorage;
var wonLevels=readProgress('wonLevels') || 1;
console.log("Abv", wonLevels);

function saveProgress(key, value){
    localStorage.setItem(key, value);
}

function readProgress(key){
    var levelSaved = localStorage.getItem(key);
    return levelSaved;
}

function update() {
    if(start==true){
        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                //x
                //sideways
                if(i==0 && grid[i][j]==1){
                    if(grid[i+1][j]==1 && grid[i+2][j]==1){
                        whatInARow=1;
                    }
                }
                if(i==2 && grid[i][j]==1){
                    if(grid[i-1][j]==1 && grid[i-2][j]==1){
                        whatInARow=1;
                    }
                }
                //up and down
                if(j==0 && grid[i][j]==1){
                    if(grid[i][j+1]==1 && grid[i][j+2]==1){
                        whatInARow=1;
                    }
                }
                if(i==2 && grid[i][j]==1){
                    if(grid[i][j-1]==1 && grid[i][j-2]==1){
                        whatInARow=1;
                    }
                }
                //diagonal
                if(i==0 && j==0 && grid[i][j]==1){
                    if(grid[i+1][j+1]==1 && grid[i+2][j+2]==1){
                        whatInARow=1;
                    }
                }
                if(i==2 && j==2 && grid[i][j]==1){
                    if(grid[i-1][j-1]==1 && grid[i-2][j-2]==1){
                        whatInARow=1;
                    }
                }
                if(i==2 && j==0 && grid[i][j]==1){
                    if(grid[i-1][j+1]==1 && grid[i-2][j+2]==1){
                        whatInARow=1;
                    }
                }
                if(i==0 && j==2 && grid[i][j]==1){
                    if(grid[i+1][j-1]==1 && grid[i+2][j-2]==1){
                        whatInARow=1;
                    }
                }



                //o
                //sideways
                if(i==0 && grid[i][j]==2){
                    if(grid[i+1][j]==2 && grid[i+2][j]==2){
                        whatInARow=2;
                    }
                }
                if(i==2 && grid[i][j]==2){
                    if(grid[i-1][j]==2 && grid[i-2][j]==2){
                        whatInARow=2;
                    }
                }
                //up and down
                if(j==0 && grid[i][j]==2){
                    if(grid[i][j+1]==2 && grid[i][j+2]==2){
                        whatInARow=2;
                    }
                }
                if(i==2 && grid[i][j]==2){
                    if(grid[i][j-1]==2 && grid[i][j-2]==2){
                        whatInARow=2;
                    }
                }
                //diagonal
                if(i==0 && j==0 && grid[i][j]==2){
                    if(grid[i+1][j+1]==2 && grid[i+2][j+2]==2){
                        whatInARow=2;
                    }
                }
                if(i==2 && j==2 && grid[i][j]==2){
                    if(grid[i-1][j-1]==2 && grid[i-2][j-2]==2){
                        whatInARow=2;
                    }
                }
                if(i==2 && j==0 && grid[i][j]==2){
                    if(grid[i-1][j+1]==2 && grid[i-2][j+2]==2){
                        whatInARow=2;
                    }
                }
                if(i==0 && j==2 && grid[i][j]==2){
                    if(grid[i+1][j-1]==2 && grid[i+2][j-2]==2){
                        whatInARow=2;
                    }
                }
            }
        }
    }
    
    
    if(whatInARow != 0){
        start=false;
    }

    if(whatInARow==0 && fullPoleta==9){
        start=false;
    }

    if(whatInARow==1){
        player1Wins=0;
        saveProgress('player1Wins', player1Wins);
    }

    if(whatInARow==2){
        player2Wins=0;
        saveProgress('player2Wins', player2Wins);
    }
    
}

function draw() {
    // This is how you draw a rectangle
    context.fillStyle="black";
    context.fillRect(0, 0, 1370, 670);
    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            context.strokeStyle="white";
            context.strokeRect(i*size+350, j*size+30, size, size);
            context.fillRect(i*size+350, j*size+30, size, size);
            if(grid[i][j]==1){
                context.drawImage(x, i*size+350, j*size+30, size, size);
            }
            if(grid[i][j]==2){
                context.drawImage(o, i*size+350, j*size+30, size, size);
            }
        }
    }
    
    
    if(whatInARow==1){
        context.fillStyle="white";
        context.font="100px Arial";
        context.fillText("Player 1 wins", 400, 300, 500);
    }
    if(whatInARow==2){
        context.fillStyle="white";
        context.font="100px Arial";
        context.fillText("Player 2 wins", 400, 300, 500);
    }

    if(whatInARow==0 && fullPoleta==9){
        context.fillStyle="white";
        context.font="100px Arial";
        context.fillText("Nobody wins!", 400, 300, 500);
    }

    if(start==false){
        if(areColliding(mouseX, mouseY, 1, 1, 1100, 565, 200, 35)){
            context.font="bold 50px Arial";
        }else{
            context.font="50px Arial";
        }
        context.fillText("NEW GAME", 1100, 600, 200);
    }

    context.font="50px Arial";
    context.fillText("Player1:", 20, 100, 130);
    context.fillText("Player2:", 1100, 100, 130);
    context.fillText(readProgress('player1Wins'), 150, 100, 100);
    
    
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
    if(start==true){
        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                if(areColliding(i*size+350, j*size+30, size, size, mouseX, mouseY, 1, 1)){
                    if(grid[i][j]==0){
                        if(turn==0){
                            grid[i][j]=1;
                            turn=1;
                            fullPoleta++;
                        }else{
                            grid[i][j]=2;
                            turn=0;
                            fullPoleta++;
                        }
                    }
                }
            }
        }
    }
    if(start==false){
        if(areColliding(mouseX, mouseY, 1, 1, 1100, 565, 200, 35)){
            for(var i=0; i<3; i++){
                for(var j=0; j<3; j++){
                    grid[i][j]=0;
                }
            }
            start=true;
            whatInARow=0;
            fullPoleta=0;
        }
    }
    
};
