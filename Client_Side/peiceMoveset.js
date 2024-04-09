//Setup for location on the board
x = 0;
y = 0
//End of Setup for location on the board


let flipping = 1
//What peice are we see that we can do?
function peiceMovingOptions({xRec, yRec, peice}){
    x = xRec
    y = yRec

    
    if(getCookie("oneOrTwo") == 'two'){
        flipping = -1
    }
    else{
        flipping = 1
    }
    //listOfMoves = {}
    switch(peice.name){
        case "mortal":
            mortal()
            break
        case "glider":
            glider()
            break
            //console.log("glider")    
        case "restless":
            restless()
            break
        case "horses":
            horses()
            break
        case "bishop":
            bishop()
            break
        case "guardian":
            guardian()
            break
        case "rook":
            rook()
            break
        case "sling":
            sling()
            break
        case "burst":
            burst()
            break
        case "core":
            core()
            break
        case "proven":
            proven()
            break
    }
    
}
//End of What peice are we see that we can do?



//Renders the peices
function drawPoint({xP, yP, selIt}){

    //console.log(selIt)
    multiplier = -1
    heightComp = 0
    widthComp = 0
    
    if(getCookie("oneOrTwo") == 'two'){
        multiplier = 1
        heightComp = cutsHeight - 1
        widthComp = cutsWidth - 1
    }
    
    let image = document.getElementById("Selection" + selIt);
    c.fillStyle = 'green'
    c.drawImage(image, (widthComp - xP) * widthOfChecks * multiplier, (heightComp - yP) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
    //c.fillRect((widthComp - xP) * widthOfChecks * multiplier, (heightComp - yP) * heightOfChecks * multiplier, widthOfChecks/4,  heightOfChecks/4)
}
//End of renders the peices

//Renders the peices
function drawPointEndure({xP, yP, selItEndure}){
    //console.log(selIt)
    multiplier = -1
    heightComp = 0
    widthComp = 0
    
    if(getCookie("oneOrTwo") == 'two'){
        multiplier = 1
        heightComp = cutsHeight - 1
        widthComp = cutsWidth - 1
    }
    //
    //let timeLeft = listOfYourPeices[xFound + " " + yFound].lastMove
    //let timeBetween = listOfYourPeices[xFound + " " + yFound].rate
    
    let image = document.getElementById("endure" + selItEndure);
    c.fillStyle = 'green'
    
    let xToUse = (widthComp - xP) * widthOfChecks * multiplier
    let yToUse = (heightComp - yP) * heightOfChecks * multiplier
    c.drawImage(image, xToUse, yToUse, canvas.width/cutsWidth, canvas.height/cutsHeight);
    /*
    let timeSince = turn - timeLeft
    if(timeSince > timeBetween){
        c.fillText( "READY!" , xToUse + (canvas.width/cutsWidth/2) - (.275 * canvas.width/cutsWidth), yToUse + ( (canvas.height/cutsHeight/2)))
    }
    else{
        c.fillText(Math.ceil((timeBetween - timeSince)/2) , xToUse + (canvas.width/cutsWidth/2), yToUse + ( (canvas.height/cutsHeight/2)))
    }
    */
    //c.fillRect((widthComp - xP) * widthOfChecks * multiplier, (heightComp - yP) * heightOfChecks * multiplier, widthOfChecks/4,  heightOfChecks/4)
}
//End of renders the peices

//Renders the peices
function drawPointEndureText({xP, yP}){
    //console.log(selIt)
    multiplier = -1
    heightComp = 0
    widthComp = 0
    let turnLeft
    let timeBetween
    if(getCookie("oneOrTwo") == 'two'){
        multiplier = 1
        heightComp = cutsHeight - 1
        widthComp = cutsWidth - 1
    }
    try{
        console.log(listOfYourPeices)
        turnLeft = listOfYourPeices[xFound + " " + yFound].lastMove
        timeBetween = listOfYourPeices[xFound + " " + yFound].rate
    }
    catch{
        
    }

    //let image = document.getElementById("endure" + selItEndure);
    c.fillStyle = 'green'
    c.font = "1vw arial"

    let xToUse = (widthComp - xP) * widthOfChecks * multiplier
    let yToUse = (heightComp - yP) * heightOfChecks * multiplier
    //c.drawImage(image, xToUse, yToUse, canvas.width/cutsWidth, canvas.height/cutsHeight);
    
    let timeSince = turn - turnLeft
    //console.log(timeSince + " Time Since")
    console.log("---f")
    console.log(turn)
    console.log(turnLeft)
    console.log(timeBetween)
    console.log(timeSince)
    console.log(timeBetween - timeSince)
    console.log("here is the time stuff")
    if(timeSince > timeBetween){
        c.fillText( "READY!" , xToUse + (canvas.width/cutsWidth * .2), yToUse + ( (canvas.height/cutsHeight * .5)))
    }
    else{
        c.fillText(Math.ceil(((timeBetween - timeSince) + 0.5)/2) , xToUse + (canvas.width/cutsWidth  * .45) , yToUse + ( (canvas.height/cutsHeight * .5)))
    }
    //c.fillRect((widthComp - xP) * widthOfChecks * multiplier, (heightComp - yP) * heightOfChecks * multiplier, widthOfChecks/4,  heightOfChecks/4)
}
//End of renders the peices

function core(){
    listOfMoves = {}
    let loca = ""
    let xLoc = 0
    let yLoc = 0
    
    xLoc =  x + 1
    yLoc = y
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
    
}


function proven(){
    listOfMoves = {}
    let loca = ""
    let xLoc = 0
    let yLoc = 0
    let forward = true
    let backward = true
    let right = true
    let left = true
    for(let i = 1; i < 20; i++){
        if(forward){
            let loca = " "
            let xLoc =  x
            let yLoc = y + i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                forward = false
            }
        }
        if(backward){
            let loca = " "
            let xLoc =  x
            let yLoc = y - i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                backward = false
            }
        }
        if(right){
            let loca = " "
            let xLoc =  x + i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                right = false
            }
        }
        if(left){
            let loca = " "
            let xLoc =  x - i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                left = false
            }
        }
        
    }

    let leftGoing = true
    let rightGoing = true
    let backLeftGoing = true
    let backRightGoing = true
    for(let i = 1; i < 20; i++){
        let yLoc = (y + (((-i) * flipping)))
        let xLoc = x + i
        let location = (xLoc + " " + yLoc)

        let peiceSelected = listOfEveryone[location]

        if(yLoc < 0 || yLoc > cutsHeight - 1){
            leftGoing = false
            rightGoing = false
        }
        if(leftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                leftGoing = false
            } 
        }
        if(rightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                //console.log(location + "B")
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                rightGoing = false
                //console.log(x + " " + y + " Loc of peice")
                //console.log(location + "End")
            }
        }

        xLoc = x + i
        yLoc = (y - (((-i) * flipping)))
        location = (xLoc + " " + yLoc)
        peiceSelected = listOfEveryone[location]
        if(yLoc < 0 || yLoc > cutsHeight - 1){
            backLeftGoing = false
            backRightGoing = false
        }
        if(backLeftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backLeftGoing = false
            } 
        }
        if(backRightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backRightGoing = false
            }
        }
        if(!rightGoing && !leftGoing && !backRightGoing && !backLeftGoing){
            i = 500
        }
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}


//Burst Movement
function burst(){
    listOfMoves = {}
    let loca = ""
    let xLoc = 0
    let yLoc = 0
    
    xLoc =  x + 1
    yLoc = y
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }

    xLoc = x - 2
    yLoc = y
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 2
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 2
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }

    xLoc = x 
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 1
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 1
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }



    xLoc = x 
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 1
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 1
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }


    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Burst Movement

//Sling Movement
function sling(){
    listOfMoves = {}
    let forward = true
    let backward = true
    let right = true
    let left = true
    for(let i = 1; i < 3; i++){
        if(forward){
            let loca = " "
            let xLoc =  x
            let yLoc = y + i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                forward = false
            }
        }
        if(backward){
            let loca = " "
            let xLoc =  x
            let yLoc = y - i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                backward = false
            }
        }
        if(right){
            let loca = " "
            let xLoc =  x + i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                right = false
            }
        }
        if(left){
            let loca = " "
            let xLoc =  x - i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                left = false
            }
        }
        
    }
    let upRight = true
    let downRight = true
    let upLeft = true
    let downLeft = true
    for(let i = 1; i < 20; i++){
        let xLoc = x + i
        let yLoc = y + i
        if(upRight && xLoc > -1 && xLoc < cutsWidth && yLoc > -1 && yLoc < cutsHeight){
            let loc = xLoc + " " + yLoc
            if(listOfEveryone[loc] != undefined){
                if(listOfTheirPeices[loc] != undefined){
                    listOfMoves[loc] = 'endure'
                }
                upRight=false
            }
        }
        else{
            upRight = false
        }
        
        xLoc = x - i
        yLoc = y + i
        if(upLeft && xLoc > -1 && xLoc < cutsWidth && yLoc > -1 && yLoc < cutsHeight){
            let loc = xLoc + " " + yLoc
            if(listOfEveryone[loc] != undefined){
                if(listOfTheirPeices[loc] != undefined){
                    listOfMoves[loc] = 'endure'
                }
                upLeft=false
            }
        }
        else{
            upLeft = false
        } 
        
        xLoc = x - i
        yLoc = y - i
        if(downLeft && xLoc > -1 && xLoc < cutsWidth && yLoc > -1 && yLoc < cutsHeight){
            let loc = xLoc + " " + yLoc
            if(listOfEveryone[loc] != undefined){
                if(listOfTheirPeices[loc] != undefined){
                    listOfMoves[loc] = 'endure'
                }
                downLeft=false
            }
        }
        else{
            downLeft = false
        }

        xLoc = x + i
        yLoc = y - i
        if(downRight && xLoc > -1 && xLoc < cutsWidth && yLoc > -1 && yLoc < cutsHeight){
            let loc = xLoc + " " + yLoc
            if(listOfEveryone[loc] != undefined){
                if(listOfTheirPeices[loc] != undefined){
                    listOfMoves[loc] = 'endure'
                }
                downRight=false
            }
        }
        else{
            downRight = false
        }
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Sling Movement



//Rook Movement
function rook(){
    listOfMoves = {}
    let forward = true
    let backward = true
    let right = true
    let left = true
    for(let i = 1; i < 20; i++){
        if(forward){
            let loca = " "
            let xLoc =  x
            let yLoc = y + i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                forward = false
            }
        }
        if(backward){
            let loca = " "
            let xLoc =  x
            let yLoc = y - i
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                backward = false
            }
        }
        if(right){
            let loca = " "
            let xLoc =  x + i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                right = false
            }
        }
        if(left){
            let loca = " "
            let xLoc =  x - i
            let yLoc = y
            loca = xLoc + " " + yLoc
            if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
                listOfMoves[loca] = 'simple'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
            }
            else{
                if(listOfTheirPeices[loca] != undefined){
                    listOfMoves[loca] = 'simple'
                }
                left = false
            }
        }
        
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Rook Movement



//Guardian movement
function guardian(){
    listOfMoves = {}
    
    for(const key in listOfYourPeices) {
        let loc = key.split(" ")
        let xSel = parseInt(loc[0])
        let ySel = parseInt(loc[1])
        
        let loca = " "
        let xLoc =  xSel + 1
        let yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel + 1
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel + 1
        yLoc = ySel
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMoves[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        
    }
    

    let xLoc =  x + 1
    let yLoc = y
    let loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x + 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    xLoc =  x - 1
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMoves[loca] = 'simple'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    else{
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
        }
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Guardian movement



//Mortal Movement
function mortal(){
    listOfMoves = {}
    let max = 2
    //Simple means simple move, endure is a cooldown move
    for(let i = 0; i < max; i++){
        if(!listOfYourPeices[x + " " + y].first){
            max = 1
        }
        let yLoc = (y + (((-i - 1) * flipping)))
        let location = (x + " " + yLoc).toString()
        console.log(location)
        let peiceSelected = listOfEveryone[location]
        if(yLoc == 0 || yLoc == cutsHeight - 1){
            i = 50
        }
        if(peiceSelected == undefined){
            listOfMoves[location] = 'simple'
            console.log("here")
            //drawPoint({xP:x, yP:yLoc, selIt:selectionIt})    
        }
        else{
            i = 5
        }   
        if(x + 1 < cutsWidth){
            location = ((x + 1) + " " + yLoc).toString()
            peiceSelected = listOfTheirPeices[location]
            if(peiceSelected != undefined){
                listOfMoves[location] = 'simple'
            }
        }
        if(x - 1 >= 0){
            location = ((x - 1) + " " + yLoc).toString()
            peiceSelected = listOfTheirPeices[location]
            if(peiceSelected != undefined){
                listOfMoves[location] = 'simple'
            }
        }
        
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Mortal Movement

//Restless movement
function restless(){
    listOfMoves = {}
    //Simple means simple move, endure is a cooldown move
    let leftGoing = true
    let rightGoing = true
    let backLeftGoing = true
    let backRightGoing = true
    for(let i = 1; i < 4; i++){
        let yLoc = (y + (((-i) * flipping)))
        let xLoc = x + i
        let location = (xLoc + " " + yLoc)

        let peiceSelected = listOfEveryone[location]

        if(yLoc < 0 || yLoc > cutsHeight - 1){
            leftGoing = false
            rightGoing = false
        }
        if(leftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                leftGoing = false
            } 
        }
        if(rightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                //console.log(location + "B")
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                rightGoing = false
                //console.log(x + " " + y + " Loc of peice")
                //console.log(location + "End")
            }
        }

        xLoc = x + i
        yLoc = (y - (((-i) * flipping)))
        location = (xLoc + " " + yLoc)
        peiceSelected = listOfEveryone[location]
        if(yLoc < 0 || yLoc > cutsHeight - 1){
            backLeftGoing = false
            backRightGoing = false
        }
        if(backLeftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backLeftGoing = false
            } 
        }
        if(backRightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backRightGoing = false
            }
        }
        if(!rightGoing && !leftGoing && !backRightGoing && !backLeftGoing){
            i = 500
        }
    }

    //console.log("Still working")
    
    xLoc = x 
    yLoc = y + 1
    let loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'endure'
        //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMoves[loca] = 'endure'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})
            }
    }
    
    xLoc = x + 1
    yLoc = y
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'endure'
       //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMoves[loca] = 'endure'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})
            }
    }
    xLoc = x 
    yLoc = y - 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'endure'
        //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMoves[loca] = 'endure'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})
            }
    }
    xLoc = x - 1
    yLoc = y
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'endure'
        //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMoves[loca] = 'endure'
                //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})
            }
    }
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Restless movement



//Glider Movement
function glider(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    listOfMoves = {}
    renderPeices()
    //Simple means simple move, endure is a cooldown move
    let leftGoing = true
    let rightGoing = true
    let backGoing = true
    for(let i = 1; i < 20; i++){
        let yLoc = (y + (((-i) * flipping)))
        let xLoc = x + i
        let location = (xLoc + " " + yLoc)

        let peiceSelected = listOfEveryone[location]

        if(yLoc < 0 || yLoc > cutsHeight - 1){
            leftGoing = false
            rightGoing = false
        }
        if(leftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                
            }
            else{
                if(listOfTheirPeices[location] != undefined){
                    listOfMoves[location] = 'simple'
                    //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
                }
                leftGoing = false
            } 
        }
        if(rightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                //console.log(location + "B")
            }
            else{
                if(listOfTheirPeices[location] != undefined){
                    listOfMoves[location] = 'simple'
                    //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
                }
                rightGoing = false
            
            }
        }
        
        if(backGoing && ((y - ((((-i) * flipping))) > -1) && (y - ((-i) * flipping)) < cutsHeight)){
            yLoc = (y - ((-i) * flipping))
            location = (x + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:x, yP:yLoc, selIt:selectionIt})    
            }
            else{
                //console.log("Triggered!")
                if(listOfTheirPeices[location] != undefined){
                    listOfMoves[location] = 'simple'
                    //drawPoint({xP:x, yP:yLoc, selIt:selectionIt})
                }
                backGoing = false
            }
        }
        if(!rightGoing && !leftGoing && !backGoing){
            i = 500
        }
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()
}
//End of Glider Movement



//Horses Movement
function horses(){
    
    listOfMoves = {}
    
    xLoc = x - 1
    yLoc = y + 2
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x + 1
    yLoc = y + 2
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x - 1
    yLoc = y - 2
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x + 1
    yLoc = y - 2
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x + 2
    yLoc = y - 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x + 2
    yLoc = y + 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x - 2
    yLoc = y - 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }

    xLoc = x - 2
    yLoc = y + 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMoves[loca] = 'simple'
        //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
    }
    else{
        //console.log("Triggered!")
        if(listOfTheirPeices[loca] != undefined){
            listOfMoves[loca] = 'simple'
            //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
        }
        backGoing = false
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()    
}
//End of HorsesMovement



//Bishop Movement
function bishop(){
    listOfMoves = {}
    //Simple means simple move, endure is a cooldown move
    let leftGoing = true
    let rightGoing = true
    let backLeftGoing = true
    let backRightGoing = true
    for(let i = 1; i < 20; i++){
        let yLoc = (y + (((-i) * flipping)))
        let xLoc = x + i
        let location = (xLoc + " " + yLoc)

        let peiceSelected = listOfEveryone[location]

        if(yLoc < 0 || yLoc > cutsHeight - 1){
            leftGoing = false
            rightGoing = false
        }
        if(leftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                leftGoing = false
            } 
        }
        if(rightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
                //console.log(location + "B")
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                rightGoing = false
                //console.log(x + " " + y + " Loc of peice")
                //console.log(location + "End")
            }
        }

        xLoc = x + i
        yLoc = (y - (((-i) * flipping)))
        location = (xLoc + " " + yLoc)
        peiceSelected = listOfEveryone[location]
        if(yLoc < 0 || yLoc > cutsHeight - 1){
            backLeftGoing = false
            backRightGoing = false
        }
        if(backLeftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backLeftGoing = false
            } 
        }
        if(backRightGoing && (x - i) > -1){
            xLoc = x - i
            let location = (xLoc + " " + yLoc)
            peiceSelected = listOfEveryone[location]
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})    
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                backRightGoing = false
            }
        }
        if(!rightGoing && !leftGoing && !backRightGoing && !backLeftGoing){
            i = 500
        }
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBoard()
    renderChoices()
    renderPeices()

}
//End of Bishop movement