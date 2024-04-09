module.exports = {
    check: peiceMovingOptions
};



//What peice are we see that we can do?
function peiceMovingOptions(info, content, contentAll, contentThem, oneOrTwo, width, height, pillar){
    //console.log(info)
    let peice = contentAll[info.loc].name
    const myArray = info.loc.split(" ");
    //console.log(peice)
    //console.log(myArray)
    let rawInfo = {}

    
    switch(peice){
        case "mortal":
            rawInfo =  mortal(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "glider":
            rawInfo = glider(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break  
        case "restless":
            rawInfo = restless(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "horses":
            rawInfo = horses(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "bishop":
            rawInfo = bishop(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "guardian":
            rawInfo = guardian(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "rook":
            rawInfo = rook(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "sling":
            rawInfo = sling(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "burst":
            rawInfo = burst(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "core":
            rawInfo = core(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        case "proven":
            rawInfo = proven(content, contentAll, contentThem, oneOrTwo, parseInt(myArray[0]), parseInt(myArray[1]), width, height, pillar)
            break
        default:
            return {error: 404}
            break
    }     
    return rawInfo
}
//End of What peice are we see that we can do?

function filterCore(rawInfo,listOfTheirPeices, pillar){
    filtered = {}
    //console.log(rawInfo)
    //console.log("Triggered!!")
    for(key in rawInfo){
        if(listOfTheirPeices[key] != undefined){
            if(listOfTheirPeices[key].name != "core"){
                //console.log("triggered")
                filtered[key] = 'simple'
            }
            else{
                if(pillar == 0){
                    //console.log("triggered")
                    filtered[key] = 'simple'
                }
            }
        }else{
            //console.log("triggered")
            filtered[key] = 'simple'
        }
    }
    //console.log(filtered)
    //console.log("Trig!!")
    return filtered
}

function filterCoreEndure(rawInfo,listOfTheirPeices, pillar){
    filtered = {}
    //console.log(rawInfo)
    //console.log("Triggered!!")
    for(key in rawInfo){
        if(listOfTheirPeices[key] != undefined){
            if(listOfTheirPeices[key].name != "core"){
                //console.log("triggered")
                filtered[key] = 'simple'
            }
            else{
                if(pillar == 0){
                    //console.log("triggered")
                    filtered[key] = 'simple'
                }
            }
        }else{
            //console.log("triggered")
            filtered[key] = 'simple'
        }
    }
    //console.log(filtered)
    //console.log("Trig!!")
    return filtered
}


//filterIfTheCore in involved

//Proven
function proven(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
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
    //console.log(listOfMoves)
    return {simple: listOfMoves}
}
//End of Proven

//Burst Movement
function burst(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}
    let loca = ""
    let xLoc = 0
    let yLoc = 0
    xLoc =  x + 1
    yLoc = y
    loca = xLoc + " " + yLoc
    //c.clearRect(0, 0, canvas.width, canvas.height);
    //renderBoard()
    //renderPeices()
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
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 2
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 2
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y - 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 2
    yLoc = y + 1
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }

    xLoc = x 
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 1
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 1
    yLoc = y - 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }



    xLoc = x 
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x + 1
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    xLoc = x - 1
    yLoc = y + 2
    loca = xLoc + " " + yLoc
    if(xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
        listOfMovesEndure[loca] = 'endure'
       // drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})  
    }
    //renderChoices();
    
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return {simple: listOfMoves, endure: listOfMovesEndure, special:"burst"}
}

function core(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}

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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return {simple: listOfMoves}
}

function rook(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}
    //c.clearRect(0, 0, canvas.width, canvas.height);
    //renderBoard()
    //renderPeices()
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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return{simple: listOfMoves}
}

//Sling Movement
function sling(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}
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
                    listOfMovesEndure[loc] = 'endure'
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
                    listOfMovesEndure[loc] = 'endure'
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
                    listOfMovesEndure[loc] = 'endure'
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
                    listOfMovesEndure[loc] = 'endure'
                }
                downRight=false
            }
        }
        else{
            downRight = false
        }
    }
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    listOfMovesEndure = filterCoreEndure(listOfMovesEndure, listOfTheirPeices, pillar)
    return {simple: listOfMoves, endure:listOfMovesEndure, special:"sling"}
}
//End of Sling Movement

//Guardian Movement
function guardian(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}
    //c.clearRect(0, 0, canvas.width, canvas.height);
    //renderBoard()
    //renderPeices()
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
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel + 1
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel - 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel
        yLoc = ySel + 1
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel + 1
        yLoc = ySel
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        xLoc =  xSel - 1
        yLoc = ySel
        loca = xLoc + " " + yLoc
        if(listOfEveryone[loca] == undefined && xLoc < cutsWidth && xLoc > -1 && yLoc > -1 && yLoc < cutsHeight){
            listOfMovesEndure[loca] = 'endure'
            //drawPointEndure({xP:xLoc, yP:yLoc, selIt:selectionIt})  
        }
        
    }
    //console.log(listOfMoves)
    
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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    //listOfMovesEndure = filterCoreEndure(listOfMovesEndure, listOfTheirPeices, pillar)
    return {simple: listOfMoves, endure:listOfMovesEndure}

}
//End of Guardian movement


//Horses Movement
function horses(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    //console.log(oneOrTwo)
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    //c.clearRect(0, 0, canvas.width, canvas.height);
    //renderBoard()
    //renderPeices()
    
    
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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return {simple: listOfMoves}
}

//End of Horses Movement

//Mortal Movement
function mortal(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    //console.log(oneOrTwo)
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    //Simple means simple move, endure is a cooldown move
    let max = 2
    for(let i = 0; i < max; i++){
        if(!listOfYourPeices[x + " " + y].first){
            max = 1
        }
        let yLoc = (y + (((-i - 1) * flipping)))
        let location = (x + " " + yLoc).toString()
        let peiceSelected = listOfEveryone[location]
        if(peiceSelected == undefined){
            listOfMoves[location] = 'simple'  
        }
        else{
            i = 5
            //console.log('Triggered')
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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return {simple: listOfMoves}
}
//End of Mortal Movement

function bishop(listOfYourPeices, listOfEveryone, listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    //console.log(oneOrTwo)
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
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
                console.log(location + "B")
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                rightGoing = false
                console.log(x + " " + y + " Loc of peice")
                console.log(location + "End")
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
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return{simple: listOfMoves}
}

//Restless Movement
function restless(listOfYourPeices, listOfEveryone,listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    let flipping = 1
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    let listOfMoves = {}
    let listOfMovesEndure = {}
    //c.clearRect(0, 0, canvas.width, canvas.height);
    //renderBoard()
    //renderPeices()
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
            }
            else{
                peiceSelected = listOfTheirPeices[location]
                if(peiceSelected != undefined){
                    listOfMoves[location] = 'simple'
                }
                rightGoing = false
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

    xLoc = x 
    yLoc = y + 1
    let loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMovesEndure[loca] = 'endure'
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMovesEndure[loca] = 'endure'
            }
    }
    
    xLoc = x + 1
    yLoc = y
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMovesEndure[loca] = 'endure'   
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMovesEndure[loca] = 'endure'
            }
    }
    xLoc = x 
    yLoc = y - 1
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMovesEndure[loca] = 'endure'   
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMovesEndure[loca] = 'endure'
            }
    }
    xLoc = x - 1
    yLoc = y
    loca = xLoc + " " + (yLoc)
    peiceSelected = listOfEveryone[loca]
    if(peiceSelected == undefined){
        listOfMovesEndure[loca] = 'endure'  
    }
    else{
        peiceSelected = listOfTheirPeices[loca]
            if(peiceSelected != undefined){
                listOfMovesEndure[loca] = 'endure'
            }
    }
    console.log(listOfMovesEndure)
    console.log("Here")
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    listOfMovesEndure = filterCoreEndure(listOfMovesEndure, listOfTheirPeices, pillar)
    return {simple: listOfMoves, endure: listOfMovesEndure}
}
//End of Restless Movement



//Glider Moveset
function glider(listOfYourPeices, listOfEveryone,listOfTheirPeices, oneOrTwo, x, y, cutsWidth, cutsHeight, pillar){
    //console.log(cutsWidth + "Width!")
    let flipping = 1
    //console.log(oneOrTwo)
    if(oneOrTwo == 'two'){
        flipping = -1
    }
    listOfMoves = {}
    //Simple means simple move, endure is a cooldown move
    let leftGoing = true
    let rightGoing = true
    let backGoing = true
    for(let i = 1; i < 20; i++){
        let yLoc = (y + (((-i) * flipping)))
        let xLoc = x + i
        let location = (xLoc + " " + yLoc)
        let peiceSelected = listOfEveryone[location]
        if(leftGoing && (xLoc) < cutsWidth ){
            if(peiceSelected == undefined){
                listOfMoves[location] = 'simple'
                  
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
                //console.log(location + "B")
            }
            else{
                if(listOfTheirPeices[location] != undefined){
                    listOfMoves[location] = 'simple'
                    //drawPoint({xP:xLoc, yP:yLoc, selIt:selectionIt})
                }
                backGoing = false
                //console.log(x + " " + y + " Loc of peice")
                //console.log(location + "End")
            }
        }
        
        if(!rightGoing && !leftGoing && !backGoing){
            i = 500
        }
    }
    //console.log(listOfMoves)
    listOfMoves = filterCore(listOfMoves, listOfTheirPeices, pillar)
    return {simple: listOfMoves}
}
//End of Glider Moveset




