//Stuff to initialize the canvas
const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d');
canvas.width = window.innerWidth * .5
canvas.height = window.innerHeight * .7
c.fillStyle = 'green'
c.fillRect(0, 0, canvas.width,  canvas.width)
let uiFace = '<span><textbox>Create Room</textbox><input id = "roomName" style="width:20vh; height:2vh; font-size:1.5vh;"></input>        <button onclick="join()" class="glow-on-hover" style="width:8vh; height:2vh; font-size:1.5vh;">Join</button></span> <span id="gameMessage">QuickPlay <button onclick="quickPlay()" style="width:8vh; height:2vh; font-size:1.5vh;" class="glow-on-hover">QuickPlay</button></span>'
//End of Stuff to initalize the canvas

//document.getElementById("uiStuff").innerHTML = '<span><textbox>Create Room</textbox><input id = "roomName" style="width:20vh; height:2vh; font-size:1.5vh;"></input><button onclick="join()" style="width:8vh; height:2vh; font-size:1.5vh;">Join</button></span> <span><span id="gameMessage">QuickPlay</span> <button onclick="quickPlay()" style="width:8vh; height:2vh; font-size:1.5vh;">QuickPlay</button></span>'

//User Interface
const canvasYou = document.getElementById('you')
const cYou = canvasYou.getContext('2d');
canvasYou.width = window.innerWidth * .5
canvasYou.height = window.innerHeight * .12

cYou.fillStyle = 'white'
cYou.fillRect(0, 0, canvasYou.width,  canvasYou.width)

const canvasThem = document.getElementById('them')
const cThem = canvasThem.getContext('2d');
canvasThem.width = window.innerWidth * .5
canvasThem.height = window.innerHeight * .12

cThem.fillStyle = 'red'
cThem.fillRect(0, 0, canvasThem.width,  canvasThem.width)

cYou.fillStyle = 'black'
cYou.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
cYou.fillRect(canvasYou.width /2, 0, canvasYou.width ,  canvasYou.width * 1/50)

cThem.fillStyle = 'black'
cThem.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
cThem.fillRect(0, 0, canvasYou.width/2 ,  canvasYou.width * 1/50)

let theirMessage = ""
let yourMessage = ""

//End of User Interface


xFound = -5
yFound = -5

let timeLeftThem = 180000
let timeLeft = 180000



document.getElementById("giveUp").style.width = window.innerWidth * .05 + "px"
    document.getElementById("giveUp").style.height = window.innerHeight * .023 + "px"
    document.getElementById("giveUp").style.fontSize = window.innerWidth * .01 + "px"

function resize(){
    cYou.font = (canvas.height/25) + "px Arial";
    cThem.font = (canvas.height/25) + "px Arial";
    screenMult = 1
    canvas.width = window.innerWidth * .5
    canvas.height = window.innerHeight * .7
    
    screenMult = 1
    //canvasYou.width = canvas.width
    canvasYou.width = window.innerWidth * .5
    canvasYou.height = window.innerHeight * .12
    canvasThem.width = window.innerWidth * .5
    canvasThem.height = window.innerHeight * .12
    //c.font = "20v Arial";
    
    c.fillRect(0, 0, canvas.width,  canvas.width)
    cYou.fillRect(0, 0, canvasYou.width,  canvasYou.width)
    cThem.fillRect(0, 0, canvasThem.width,  canvasThem.width)

    document.getElementById("giveUp").style.width = window.innerWidth * .05 + "px"
    document.getElementById("giveUp").style.height = window.innerHeight * .023 + "px"
    document.getElementById("giveUp").style.fontSize = window.innerWidth * .01 + "px"
    //console.log(document.getElementById("giveUp").style.width)
    renderBoard()
    renderChoices()
    renderPeices()
    renderYouAndThem()
    renderEndure()
    
}

//This is the board coloring.
let flip = true
function changeColor(){
    if(flip){
        c.fillStyle = 'DarkSlateBlue'
        flip = false
    }
    else{
        c.fillStyle = 'orange'
        flip = true
    }
}
//End of This is the board coloring.

let turn = 0

//Are you in a game currently?
inGame = false;
yourTurn = false
homeScreen = true
//End of Are you in a game currently?


totalMessage = {}


//Renders the Peices
let horsesIt = 1
let restlessIt = 1
let gliderIt = 1
let mortalIt =1
let bishopIt = 1
let guardianIt = 1
let provenIt = 1

let wasx = 0
let wasy = 0
let nowx = 0
let nowy = 0
aniMoved = 0
let modulation = 0
function renderPeices(){

    c.fillStyle = 'white'
    heightComp = 0
    widthComp = 0
    multiplier = -1
    whichPlayer = -1
    if(getCookie("oneOrTwo") == "two"){
        multiplier = 1
        heightComp = cutsHeight - 1
        widthComp = cutsWidth - 1
        whichPlayer = 1
    }
    

    if(aniMoved > 0){
        centerx = (aniMoved) * multiplier/2 * widthOfChecks
        centery = (aniMoved) * multiplier/2 * heightOfChecks

        if(!specialMove){
            xOfMov = wasx*(aniMoved) + nowx*(1 - aniMoved)
            yOfMov = wasy*(aniMoved) + nowy*(1 - aniMoved)
            xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
            yAni= (heightComp - yOfMov) * heightOfChecks * multiplier
            c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * (1 - aniMoved) + (1 - aniMoved) * multiplier/2 , heightOfChecks * (1 - aniMoved))
            //console.log(xOfMov * widthOfChecks)
           // console.log(yOfMov * heightOfChecks)
            aniMoved = aniMoved / 1.5
            //console.log(aniMoved)
            //console.log("Triggered for th aniMoved")
            if(aniMoved < .01){
                aniMoved = 0
                renderBoard()
                renderPeices()
            }
        }
        else{
            if(peiceValue == "sling s"){
                xOfMov = nowx
                yOfMov = nowy
                xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
                yAni= (heightComp - yOfMov) * heightOfChecks * multiplier
                //console.log(listOfTheirPeices[wasx + " " + wasy])
                //console.log("Here is was")
                fillStyle = 'red'
                c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * (1 - aniMoved) + (1 - aniMoved) * multiplier/2 , heightOfChecks * (1 - aniMoved))
                //console.log(wasx)
                //console.log(wasy)
                xOfMovTwo = wasx
                yOfMovTwo = wasy
                xAniTwo = (widthComp - xOfMovTwo) * widthOfChecks * multiplier 
                yAniTwo= (heightComp - yOfMovTwo) * heightOfChecks * multiplier
                c.fillStyle = "white"
                c.fillRect(xAniTwo , yAniTwo,widthOfChecks, heightOfChecks * (1 - aniMoved))
                aniMoved = aniMoved / 1.5
                //console.log(aniMoved)
                //console.log("Triggered for th aniMoved")
                if(aniMoved < .01){
                    aniMoved = 0
                    modulation = 0
                    renderBoard()
                    renderPeices()
                }
            }
            else if (peiceValue == "restless s"){
                c.fillStyle = "white"
                xOfMov = wasx*(aniMoved) + nowx*(1 - aniMoved)
                yOfMov = wasy*(aniMoved) + nowy*(1 - aniMoved)
                xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
                yAni= (heightComp - yOfMov) * heightOfChecks * multiplier

                let effectX = Math.floor(Math.random() * 20)
                let effectY = Math.floor(Math.random() * 20)
                c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * (1 - aniMoved) + (1 - aniMoved) * multiplier/2 , heightOfChecks * (1 - aniMoved))
                c.fillStyle = "red"
                c.fillRect(xAni + centerx * whichPlayer + effectX, yAni + centery * whichPlayer + effectY,widthOfChecks * (.2), heightOfChecks * (.2))
                c.fillRect(xAni + centerx * whichPlayer - effectX, yAni + centery * whichPlayer - effectY,widthOfChecks * (.2) , heightOfChecks * (.2))
                //console.log(xOfMov * widthOfChecks)
            // console.log(yOfMov * heightOfChecks)
                aniMoved = aniMoved / 1.5
                //console.log(aniMoved)
                //console.log("Triggered for th aniMoved")
                if(aniMoved < .01){
                    aniMoved = 0
                    renderBoard()
                    renderPeices()
                }
            }
            else if (peiceValue == "burst s"){
                xOfMove = 0
                yOfMove = 0
                fixedx = 0
                fixedy = 0
                xAni = 0
                yAni= 0
                centerx = 0
                centery = 0
                //console.log(xOfMov * widthOfChecks)
                if(Math.abs(nowx - wasx) == 2){
                    centerx = 0 
                    centery = -(aniMoved) * multiplier/2 * heightOfChecks - (1 - aniMoved) * multiplier/2 * heightOfChecks * 3 + .5 * multiplier * heightOfChecks
                    
                    xOfMov = nowx 
                    yOfMov = wasy


                    fixedx = 1
                    fixedy = (1 - aniMoved) * 3
                    
                        
                    xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
                    yAni= (heightComp - yOfMov) * heightOfChecks * multiplier
                    
                    c.fillStyle = "red"
                    c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * fixedx , heightOfChecks * fixedy)
                    c.fillStyle = "white"
                    c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * fixedx /((1-aniMoved) * 10), heightOfChecks * fixedy)
                }
                else{
                    centerx = -(aniMoved) * multiplier/2 * widthOfChecks - (1 - aniMoved) * multiplier/2 * widthOfChecks * 3 + .5* multiplier * widthOfChecks
                    centery =  0

                    yOfMov = nowy 
                    xOfMov = wasx

                    xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
                    yAni= (heightComp - yOfMov) * heightOfChecks * multiplier

                    fixedx = (1 - aniMoved) * 3
                    fixedy = 1
                    c.fillStyle = "red"
                    c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * fixedx , heightOfChecks * fixedy)
                    c.fillStyle = "white"
                    c.fillRect(xAni + centerx * whichPlayer, yAni + centery * whichPlayer,widthOfChecks * fixedx , heightOfChecks * fixedy/((1 - aniMoved) * 30))
                }

                
                //console.log(xOfMov * widthOfChecks)
            // console.log(yOfMov * heightOfChecks)
                aniMoved = aniMoved / 1.5
                //console.log(aniMoved)
                //console.log("Triggered for th aniMoved")
                if(aniMoved < .01){
                    aniMoved = 0
                    renderBoard()
                    renderPeices()
                }
                
                
            
            }
            else if (peiceValue = "guardian s"){
                xOfMov = nowx
                yOfMov = nowy
                xAni = (widthComp - xOfMov) * widthOfChecks * multiplier
                yAni= (heightComp - yOfMov) * heightOfChecks * multiplier
                //console.log(listOfTheirPeices[wasx + " " + wasy])
                //console.log("Here is was")
                fillStyle = 'red'
                c.fillRect(xAni + widthOfChecks/2 , yAni ,widthOfChecks * (1 - aniMoved)/2 , heightOfChecks * (1 - aniMoved)/2)
                c.fillRect(xAni, yAni,widthOfChecks * (1 - aniMoved)/2 , heightOfChecks * (1 - aniMoved)/2)
                c.fillRect(xAni + widthOfChecks/2  , yAni + heightOfChecks/2   ,widthOfChecks /2 * (1 - aniMoved), heightOfChecks * (1 - aniMoved)/2)
                c.fillRect(xAni, yAni + heightOfChecks/2 ,widthOfChecks  /2 * (1 - aniMoved), heightOfChecks * (1 - aniMoved)/2)
                //console.log(wasx)
                //console.log(wasy)
                xOfMovTwo = wasx
                yOfMovTwo = wasy
                xAniTwo = (widthComp - xOfMovTwo) * widthOfChecks * multiplier 
                yAniTwo= (heightComp - yOfMovTwo) * heightOfChecks * multiplier
                
                timeTill = .25
                if(aniMoved < timeTill){
                    c.fillStyle = "red"
                    c.fillRect(xAniTwo , yAniTwo,widthOfChecks, heightOfChecks * (1)) 
                    c.fillStyle = "white"
                    c.fillRect(xAniTwo , yAniTwo,widthOfChecks, heightOfChecks * ((aniMoved) / timeTill)) 
                }
                else{
                    c.fillStyle = "white"
                    //console.log("here is the start" + aniMoved)
                    c.fillRect(xAniTwo , yAniTwo,widthOfChecks, heightOfChecks * (1 - aniMoved)/(1 - timeTill))
                }
                aniMoved = aniMoved / 1.5
                //console.log(aniMoved)
                //console.log("Triggered for th aniMoved")
                if(aniMoved < .01){
                    aniMoved = 0
                    modulation = 0
                    renderBoard()
                    renderPeices()
                }
            }
        }
    }
    //console.log("YOUR")
    //console.log(listOfYourPeices)
    //console.log("Their")
    //console.log(listOfTheirPeices)
    
    //console.log(getCookie("oneOrTwo") + "Here is the value")
    for(const key in listOfYourPeices) { // Using the default iterator (could be `map.entries()` instead)
        let peiceLocation = key.split(" ")
        let image
        let fullPeice = listOfYourPeices[key]
        let whichPeice = fullPeice.name
        //console.log(whichPeice)

        if(whichPeice == "mortal"){
            //console.log(guardianIt)
            image = document.getElementById("mortal" + guardianIt);
        }
        else if(whichPeice == "glider"){
            image = document.getElementById("glider" + guardianIt);
            //console.log(gliderIt)
        }
        else if(whichPeice == "restless"){
            image = document.getElementById("restless" + restlessIt);
        }
        else if(whichPeice == "horses"){
            image = document.getElementById("horses" + horsesIt);
        }
        else if(whichPeice == "bishop"){
            image = document.getElementById("bishop" + bishopIt);
        }
        else if(whichPeice == "guardian"){
            image = document.getElementById("guardian" + guardianIt);
        }
        else if(whichPeice == "rook"){
            image = document.getElementById("rook" + guardianIt);
        }
        else if(whichPeice == "sling"){
            image = document.getElementById("sling" + guardianIt);
        }
        else if(whichPeice == "burst"){
            image = document.getElementById("burst" + guardianIt);
        }
        else if(whichPeice == "proven"){
            //console.log(provenIt)
            image = document.getElementById("proven" + provenIt);
        }
        else if(whichPeice == "core"){
            if(yourPillarLeft == 0){
                let pillarimg = document.getElementById("pillar" + guardianIt);
                c.drawImage(pillarimg, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
            }
            image = document.getElementById("core" + guardianIt);
        }
        if(fullPeice.pillar != undefined){
            let pillarimg = document.getElementById("pillar" + guardianIt);
            c.drawImage(pillarimg, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
        }
        c.drawImage(image, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
    }
    //c.fillStyle = 'white'
    for(const key in listOfTheirPeices) { 
        let peiceLocation = key.split(" ")
        let image
        let fullPeice = listOfTheirPeices[key]
        let whichPeice = fullPeice.name

        if(whichPeice == "mortal"){
            //console.log(guardianIt)
            image = document.getElementById("mortalop" + guardianIt);
        }
        else if(whichPeice == "glider"){
            image = document.getElementById("gliderop" + guardianIt);
            //console.log(gliderIt)
        }
        else if(whichPeice == "restless"){
            image = document.getElementById("restlessop" + restlessIt);
        }
        else if(whichPeice == "horses"){
            image = document.getElementById("horsesop" + horsesIt);
        }
        else if(whichPeice == "bishop"){
            image = document.getElementById("bishopop" + bishopIt);
        }
        else if(whichPeice == "guardian"){
            image = document.getElementById("guardianop" + guardianIt);
        }
        else if(whichPeice == "rook"){
            image = document.getElementById("rookop" + guardianIt);
        }
        else if(whichPeice == "sling"){
            image = document.getElementById("slingop" + guardianIt);
        }
        else if(whichPeice == "burst"){
            image = document.getElementById("burstop" + guardianIt);
        }
        else if(whichPeice == "proven"){
            image = document.getElementById("provenOp" + guardianIt);
        }
        else if(whichPeice == "core"){
            if(theirPillarLeft == 0){
                let pillarimg = document.getElementById("pillar" + guardianIt);
                c.drawImage(pillarimg, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
            }
            image = document.getElementById("coreop" + guardianIt);
        }
        if(fullPeice.pillar != undefined){
            let pillarimg = document.getElementById("pillar" + guardianIt);
            c.drawImage(pillarimg, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
        }
        c.drawImage(image, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);
        
    }
    for (const key in listOfPowerUp){
        let peiceLocation = key.split(" ")
        let image
        let fullPeice = listOfPowerUp[key]
        let whichPeice = fullPeice
        if(whichPeice == "time"){
            //console.log(guardianIt)
            image = document.getElementById("time" + guardianIt);
        }
        c.drawImage(image, (widthComp - peiceLocation[0]) * widthOfChecks * multiplier, (heightComp - peiceLocation[1]) * heightOfChecks * multiplier, canvas.width/cutsWidth, canvas.height/cutsHeight);

    }
    restlessIt += 1
    if(restlessIt > 11){
        restlessIt = 1
    }
    mortalIt += 1
    if(mortalIt > 7){
        mortalIt = 1
    }
    gliderIt += 1
    if(gliderIt > 12){
        gliderIt = 1
    }
    horsesIt += 1
    if(horsesIt > 10){
        horsesIt = 1
    }
    bishopIt += 1
    if(bishopIt > 10){
        bishopIt = 1
    }
    guardianIt += 1
    if(guardianIt > 10){
        guardianIt = 1
    }
    provenIt += 1
    if(provenIt > 13){
        provenIt = 1
    }
}
//End of renders the Peices



//Renders the board
let cutsWidth = 8
let cutsHeight = 8
let widthOfChecks = canvas.width/cutsWidth
let heightOfChecks = canvas.height/cutsHeight
renderBoard()
function renderBoard(){
    flip = false
    widthOfChecks = canvas.width/cutsWidth
    heightOfChecks = canvas.height/cutsHeight
    for(let i = 0; i < cutsWidth;i++){
        for(let j = 0; j<cutsHeight ;j++){
            changeColor()
            c.fillRect(i * widthOfChecks, j * heightOfChecks, widthOfChecks,  heightOfChecks)
        }
        if(cutsHeight % 2 == 0){
            changeColor()   
        }

    }
    c.fillStyle = 'lightblue'
    if(getCookie("oneOrTwo") == "two"){
        c.fillRect(0, 0, widthOfChecks,  heightOfChecks)
    }
    else{
        c.fillRect((cutsWidth - 1) * widthOfChecks, (cutsHeight - 1) * heightOfChecks, widthOfChecks,  heightOfChecks)
    }
    
}
//Ends of Renders the board
moodPer = 0

let lastTime = Date.now()
let mood = 0

function renderMood(){
    if(inGame || defeat || victory){
    let image = ""
    let imageThem = ""
    mood = yourPillarLeft - theirPillarLeft
    
    theirMood = theirPillarLeft - yourPillarLeft
    let char = ""
    let charThem = ""
    if(getCookie("oneOrTwo") == "one"){
        char = "ian"
        charThem = "stella"
    }
    else{
        char = "stella"
        charThem = "ian"
    }
    if(!victory && !defeat){
    if(moodPer == 0){
        image = document.getElementById(char + "Neu");
        imageThem = document.getElementById(charThem + "Neu");
    }
    else if(moodPer == 1){
        image = document.getElementById(char + "Hap");
        imageThem = document.getElementById(charThem + "Ann");
    }
    else if (moodPer == 2){
        image = document.getElementById(char + "Joy");
        imageThem = document.getElementById(charThem + "Enr");
    }
    else if(moodPer == -1){
        image = document.getElementById(char + "Ann");
        imageThem = document.getElementById(charThem + "Hap");
    }
    else if (moodPer == -2){
        image = document.getElementById(char + "Enr");
        imageThem = document.getElementById(charThem + "Joy");
    }
}
else{
    if(victory){
        image = document.getElementById(char + "Vic");
        imageThem = document.getElementById(charThem + "Def");
    }
    if(defeat){
        image = document.getElementById(char + "Def");
        imageThem = document.getElementById(charThem + "Vic");
    }
}
    //console.log(mood)
    cYou.drawImage(image, canvas.width - canvas.width/5, 0, canvas.height/6, canvas.height/6);
    cThem.drawImage(imageThem, canvas.width/30, 0, canvas.height/6, canvas.height/6);


    
}
}

let pillarsOrPillar = " Pillars Left"
let pillarsOrPillarThem = " Pillars Left"
let currentMes = -1
let currentChar = 1
let numberOfMessages = ""


spaceMessage = 0
spaceMessageTwo = 0
spaceMessageThree = 0

//c.font = "3vw Arial";
function renderYouAndThem(){




    cYou.clearRect(0, 0, canvasYou.width, canvasYou.height);
    cThem.clearRect(0, 0, canvasThem.width, canvasThem.height);
    cYou.fillStyle = 'white'
    cYou.fillRect(0, 0, canvasYou.width,  canvasYou.height)

    cThem.fillStyle = 'red'
    cThem.fillRect(0, 0, canvasThem.width,  canvasThem.width)

    cYou.fillStyle = 'black'
    cYou.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
    cYou.fillRect(canvasYou.width /2, 0, canvasYou.width ,  canvasYou.width * 1/50)

    cThem.fillStyle = 'black'
    cThem.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
    cThem.fillRect(0, 0, canvasYou.width/2 ,  canvasYou.width * 1/50)
    
    //c.font = "10vw Arial";
    cYou.fillStyle = 'red'
    cThem.fillStyle = 'white'
    //cYou.fillText( yourPillarLeft , 0 , 0)
    //cThem.fillText( theirPillarLeft , 0 , 0)
    //console.log(theirMessage + "Here")
    cYou.font = (canvas.height/50) + "px Arial";
    cThem.font = (canvas.height/50) + "px Arial";
    
    xa =  canvasThem.width * 26/50;
    ya = canvasThem.height * 3/5;
    lineheight = canvasThem.height/4.5;
    lines = theirMessage.split('\n');
    for (let i = 0; i < lines.length; i++) {
    cThem.fillText(lines[i], xa, ya + (i * lineheight));
    }
    renderMood()
    
    
    //cThem.fillText(theirMessage, canvasThem.width * 26/50, canvasThem.height * 3/5);

    //const txt = 'line 1\nline 2\nthird line..';
    xa = canvasYou.width /50;
    ya = canvasYou.height * 3/5;
    lineheight = canvasYou.height/8;
    //cYou.font = (canvas.width/50) + "px Arial";
    lines = yourMessage.split('\n');
    for (let i = 0; i < lines.length; i++) {
    cYou.fillText(lines[i], xa, ya + (i * lineheight));
    }

    cYou.font = (canvas.height/25) + "px Arial";
    cThem.font = (canvas.height/25) + "px Arial";

    //cYou.fillText(yourMessage, canvasThem.width /50, canvasThem.height * 3/5);
    //cThem.fillText(theirMessage, canvasThem.width * 3/5, canvasThem.height/5);    
    let useThisMin = Math.floor(timeLeft / 60000)
    let useThisSec = Math.floor((timeLeft/1000) % 60)
    let useThisMinThem = Math.floor(timeLeftThem / 60000)
    let useThisSecThem = Math.floor((timeLeftThem/1000) % 60)
    //console.log(useThisSec)
    //console.log(useThisMin)
    let useThisThem = timeLeftThem
    if(useThisSec < 10){
        useThisSec = "0" + useThisSec
    }
    if(useThisSecThem < 10){
        useThisSecThem = "0" + useThisSecThem
    }
    if(inGame){
        cThem.fillText(theirPillarLeft + pillarsOrPillarThem, canvasThem.width * 26/50, canvasThem.height/5);
        cYou.fillText(yourPillarLeft + pillarsOrPillar, canvasYou.width/50, canvasYou.height/5);
        if(timeLeftThem >= 0){
            cThem.fillText("Time Left: " +  useThisMinThem + ":" + useThisSecThem, canvasThem.width * 26/50, canvasThem.height * 2/5);
            //cYou.fillText(useThisMin + ":" + useThisSec, canvasYou.width * 4/5, canvasYou.height/5);
        }
        else{
            cThem.fillText("Time Left: " +  "0 : 00", canvasThem.width * 26/50, canvasThem.height * 2/5);
            //cYou.fillText("0 : 00", canvasYou.width * 4/5, canvasYou.height/5);
        }
        if(timeLeft >= 0){
            //cThem.fillText(useThisMinThem + ":" + useThisSecThem, canvasThem.width * 4/5, canvasThem.height/5);
            cYou.fillText("Time Left: " + useThisMin + ":" + useThisSec, canvasYou.width /50, canvasYou.height * 2/5);
        }
        else{
            //cThem.fillText("0 : 00", canvasThem.width * 4/5, canvasThem.height/5);
            cYou.fillText("Time Left: " + "0 : 00", canvasYou.width  /50, canvasYou.height * 2/5);
        }
    }

    if(totalMessage[0] != undefined){
        
       // console.log("totalMessage sent off")
       // console.log(totalMessage)frenderg
        if(currentMes == -1){
        currentMes = 0
        currentChar = 1
        numberOfMessages =  Object.keys(totalMessage).length
        }

        let message = totalMessage[currentMes]
       // console.log(currentMes + " CurMes")

        //console.log(message + " Mes")

        let messageOne = ""
        let messageTwo = ""
        let messageThree = ""
        let messageFour = ""

        breakPoint = 20
        if(currentChar < breakPoint){

            messageOne = message.substring(1, currentChar)
            if(message[currentChar] == " "){
                spaceMessage = currentChar
            }
        }
        else if (currentChar < breakPoint * 2){
            messageOne = message.substring(1, spaceMessage)
            messageTwo = message.substring(spaceMessage, currentChar)
            if(message[currentChar] == " "){
                spaceMessageTwo = currentChar
            }
        }
        else if (currentChar < breakPoint * 3){
            messageOne = message.substring(1, spaceMessage)
            messageTwo = message.substring(spaceMessage, spaceMessageTwo)
            messageThree = message.substring(spaceMessageTwo, currentChar)
            if(message[currentChar] == " "){
                spaceMessageThree = currentChar
            }
        }
        else{
            messageOne = message.substring(1, spaceMessage)
            messageTwo = message.substring(spaceMessage, spaceMessageTwo)
            messageThree = message.substring(spaceMessageTwo, spaceMessageThree)
            messageFour = message.substring(spaceMessageThree, currentChar)
        }

        
        cYou.font = (canvas.height/50) + "px Arial";
        cThem.font = (canvas.height/50) + "px Arial";
        //console.log(message + "This is current message")
        
        try{
            if(message[0] == "1"){
                cYou.fillText(messageOne, canvasYou.width  *  .62, canvasYou.height * 1.5/5);
                cYou.fillText(messageTwo, canvasYou.width  * .62, canvasYou.height * 2/5);
                cYou.fillText(messageThree, canvasYou.width  * .62, canvasYou.height * 2.5/5);
                cYou.fillText(messageFour, canvasYou.width  * .62, canvasYou.height * 3/5);
                if(currentChar % 20 == 0){
                    playSound({name:"1"})
                }

            }
            else{
                cThem.fillText(messageOne, canvasThem.width  /4, canvasThem.height * 1.5/5);
                cThem.fillText(messageTwo, canvasThem.width  /4, canvasThem.height * 2/5);
                cThem.fillText(messageThree, canvasThem.width  /4, canvasThem.height * 2.5/5);
                cThem.fillText(messageFour, canvasThem.width  /4, canvasThem.height * 3/5);
                if(currentChar % 20 == 0){
                    playSound({name:"2"})
                }
            }
        }
        catch{

        }
        currentChar += 1
            if(currentChar - 1 > message.length){
                currentMes += 1
                currentChar = 1
                if(totalMessage[currentMes] == undefined){
                    totalMessage[0] = undefined
                    currentMes = -1
                    currentChar = 1
                    numberOfMessages = 0
                    
                }
            }
        
        
        
        


    }

    


}

function description(){
    //peiceName
    //console.log(peiceName.name)
    switch(peiceName.name){
            case "mortal":
                yourMessage = "Mortal: Moves like a pawn. If it can move two spaces,\n it can also capture from two spaces"
                break
            case "glider":
                yourMessage = "Glider: Moves in a Y shape"
                break
                //console.log("glider")    
            case "restless":
                yourMessage ="Restless: Moves diagonally three spots \n endure(3) move vertically\n or horizontally once"
                break
            case "horses":
                yourMessage ="Horses: Moves like a knight"
                break
            case "bishop":
                yourMessage ="Bishop: Moves like a bishop"
                break
            case "guardian":
                yourMessage ="Guardian: Moves like a king \n endure(2) move near a friendly peice \n Cannot capture this way"
                break
            case "rook":
                yourMessage ="Rook: Moves like a rook"
                break
            case "sling":
                yourMessage ="Sling: Moves Horizontally or Vertically two spots \n endure(4): destroy a peice diagonally,\ndoes not move sling"
                break
            case "burst":
                yourMessage ="Burst: Moves like a king \n endure(5): Destroy three peices,\n friendly or enemy\n in any direction. \n does not destroy core"
                break
            case "core":
                yourMessage ="Core: Moves like a king \n can only be taken once the pillars to taken. \n lose if your core is taken"
                break
            case "proven":
                yourMessage ="Proven: Moves like a queen"
                break
            default:
                yourMessage = ""
                break
    }
    renderYouAndThem()
}


//the current board
let listOfYourPeices = {}
let listOfTheirPeices = {}
let listOfEveryone = {}
let listOfPowerUp = {}
//End of the current board



listOfMoves = {}
peiceSelected = ''
peiceLocation = ''
moveSelected = {}
let peiceFound
let peiceName = ''

//When you click the board, where did you click? Also deals with calling the places you can move
let canvasElem = document.getElementById("canvas");
canvasElem.addEventListener("mousedown", function(e)
{
    if(inGame){
    //console.log("Triggered")
    whatWasClicked(canvasElem, e);
    }
});
function whatWasClicked(canvas, event){
    let rect = canvas.getBoundingClientRect();
    //xFound = event.clientX - rect.left ;
    //yFound = event.clientY - rect.top ;
    xFound = event.clientX - rect.left;
    yFound = event.clientY - rect.top ;
    
    multiplier = -1
    heightComp = 0
    widthComp = 0
    if(getCookie("oneOrTwo") == 'two'){
        multiplier = 1
        heightComp = cutsHeight - 1
        widthComp = cutsWidth - 1
    }
    xFound = ((widthComp - Math.floor(xFound/(widthOfChecks))) * multiplier)
    yFound = ((heightComp - Math.floor(yFound/(heightOfChecks))) * multiplier)
    
    peiceFound = listOfYourPeices[xFound + " " + yFound]

    both = false
    if(peiceFound !== undefined){
        peiceName = peiceFound
        peiceMovingOptions({peice:peiceFound, xRec:xFound, yRec:yFound})
        peiceSelected = peiceFound
        peiceLocation = xFound + " " + yFound
    }
    else{
        both = true
    }
    //console.log(peiceFound + " HERE!!!! PeiceFound")
    //console.log(listOfMoves + " HERE!!!! Moves")
    
    let moveFound = listOfMoves[xFound + " " + yFound]
    //console.log("Triggered")
    if(moveFound != undefined){
        moveSelected.x = xFound
        moveSelected.y = yFound
        if(listOfEndure[xFound + " " + yFound]){
            special = " s"
        }
        else{
            special = ""
        }
        makeMove()
        listOfMoves = {}
    }
    else{
        if(both){
            listOfMoves = {}
            renderBoard()
            renderPeices()
        }
    }
    //console.log(listOfMoves)
    //console.log('Somethign is bad!')
    description()
}
//End of When you click the board, where did you click?
async function didYouLose(){
    let pass = getCookie('pass')
    oneOrTwo = getCookie('oneOrTwo')
    let room = getCookie('name')
    const data = {pass, oneOrTwo, room};
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    };
    const response = await fetch('/didYouLose', options);
    const info = await response.json();
    //console.log(info.didYouLostYet)
    if(info.didYouLostYet != 'surrendered'){
        if(info.didYouLostYet == true){
            theirMessage = "You ran out of time, you lost"
            firstMessage = "Time over"
            secondMessage = "You Lost"
            defeat = true
            inGame = false
            renderYouAndThem()
            renderMood()
            //document.getElementById("uiStuff").style.visibility = "visible"
            gameOverScreen()
            //inGame = false
            //waiting = false
            
        }
    }
    else{
        victory = true
        theirMessage = "They Surrendered!"
        firstMessage = "Enemy Surrendered"
        secondMessage = "You Win!"
        inGame = false
        waiting = false
        //document.getElementById("uiStuff").style.visibility = "visible"
        gameOverScreen()
    }
}

//Did you lose?

currentPeiceSelectedName = ""

//Game OverScreen
function gameOverScreen(){
    screenMult = 1
    renderYouAndThem()
    document.getElementById("uiStuff").style.visibility = "visible"
    document.getElementById("uiStuffPlayer").style.visibility = "hidden"
    document.getElementById('uiStuff').innerHTML = '<span><span id="gameMessage" style="background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);background-size: 400% 400%;animation: gradient 15s ease infinite;height: 100vh;">Return to Title Screen</span> <button onclick="reset()" class="glow-on-hover" style="width:8vh; height:2vh; font-size:1.5vh;">Return</button></span>'
    //gameOverScreen()
}
document.getElementById("uiStuffPlayer").style.visibility = "hidden"

//end of Did you lose?


function reset(){
    aniMoved = 0 
    turn = 0
    peiceValue = "    "
    waitingDialogue = 0
    totalMessage = {}
    let currentMes = 0
    let currentChar = -1
    let numberOfMessages = ""
    document.getElementById("uiStuffPlayer").innerHTML = '<span><button onclick="confirmSur()"  style="width:8vh; height:2vh; font-size:1.5vh;" class="glow-on-hover" id="giveUp">give up</button></span>'
    theirMessage = ''
    yourMessage = ""
    victory = false
    defeat = false
    mood = 0
    updateAni = -1
    theirMood = 0
    listOfMoves = {}
    homeScreen = true
    screenMult = 1
    setCookie("oneOrTwo", '')
    setCookie("pass", '')
    setCookie("name", '')
    listOfEveryone = {}
    inGame = false
    yourTurn = false
    waiting = false
    listOfYourPeices = {}
    listOfTheirPeices = {}
    listOfPowerUp = {}
    timeLeft = 180000
    timeLeftThem = 180000
    document.getElementById("uiStuff").innerHTML = uiFace
    renderBoard()
    renderPeices()
    renderChoices()

    
    cYou.fillStyle = 'white'
    cYou.fillRect(0, 0, canvasYou.width,  canvasYou.width)
    cThem.fillStyle = 'red'
    cThem.fillRect(0, 0, canvasThem.width,  canvasThem.width)
    cYou.fillStyle = 'black'
    cYou.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
    cYou.fillRect(canvasYou.width /2, 0, canvasYou.width ,  canvasYou.width * 1/50)

    cThem.fillStyle = 'black'
    cThem.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
    cThem.fillRect(0, 0, canvasYou.width/2 ,  canvasYou.width * 1/50)
}

//Victory and defeat
let victory = false
let defeat = false
//Victory and defeat


//Special move?
let special = ""
//Special Move?
//Make a move
async function makeMove(){
    if(inGame){
    if(yourTurn){
    let pass = getCookie('pass')
    oneOrTwo = getCookie('oneOrTwo')
    let room = getCookie('name')
    let loc =  peiceLocation
    let peice = peiceName


    const data = {pass, oneOrTwo, moveSelected, room, loc, peice};
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    };
    const response = await fetch('/makeMove', options);
    const info = await response.json();
    if(info.error == undefined){
        console.log(moveSelected)
            console.log(moveSelected[x] + " " + moveSelected[y])
            if(listOfPowerUp[moveSelected.x + " " + moveSelected.y] == "time" && timeLeft < 30000){
                refreshedSelf()
            }
        
        

        timeLast = Date.now()
        listOfYourPeices = info.you 
        listOfEveryone = info.all
        listOfTheirPeices = info.them
        listOfPowerUp = info.power
        

        
        if(yourPillarLeft != info.selfPillar){
            //console.log('System used cor')
            if(info.selfPillar == 0){
                pillarBadMessageFinal()
            }
            else{
                pillarBadMessage() 
            }
            //pillarBadMessage()
            playSound({name:"pillarLost"})
        }
        else if (theirPillarLeft != info.pillar){
            //console.log('System used cor')
            if(info.pillar == 0){
            pillarGoodMessageFinal()
            }
            else{
                pillarGoodMessage()
            }
        }
        else{
            let soundName = peiceName
            soundName.name = peiceName.name + special
            playSound(soundName)
        }
        
        theirPillarLeft = info.pillar
        yourPillarLeft = info.selfPillar

        if(yourPillarLeft == 1){
            pillarsOrPillar = " Pillar Left"
        }
        else{
            pillarsOrPillar = " Pillars Left"
        }
        if(theirPillarLeft == 1){
            pillarsOrPillarThem = " Pillar Left"
        }
        else{
            pillarsOrPillarThem = " Pillars Left"
        }
        //console.log(info.timeLeft + "Here")
        
        timeLeft = info.timeLeft
        timeLeftThem = info.timeLeftThem
        //console.log(theirPillarLeft)
        renderBoard()
        renderPeices()
        renderYouAndThem()
        if(!info.victory){
            if(info.defeat){
                inGame = false
                defeat = true
                theirMessage = "YOU RAN OUT OF TIME! YOU LOSE!"
                firstMessage = "Out Of Time"
                secondMessage = "You Lose"
                document.getElementById("uiStuff").style.visibility = "visible"
                document.getElementById("uiStuffPlayer").style.visibility = "hidden"
                gameOverScreen()
            }
            else{
                //document.getElementById('gameMessage').innerHTML = "opponet's turn"
                theirMessage = "Their Turn"
                onlyOnceWarn = false
                turn = turn + 1
            }
        }
        else{
            victory = true
            theirMessage = "Enemy Core Destroyed"
            inGame = false
            firstMessage = "Enemy Core Destroyed"
            secondMessage = "You Win"
            gameOverScreen()
        }
        //turn += 1
        yourTurn = false
    }
    else{
        if(info.error == "surrendered"){
            victory = true
            firstMessage = "Enemy Surrendered"
            secondMessage = "You Win"
            //secondMessage = "You Lose"
            theirMessage = "THE ENEMY GAVE UP! YOU WIN!"
            gameOverScreen()
        }
        else{
            curErr = 1
            errorMes = info.error
            if(errorMes == "Still On Cooldown"){
                cooldownMes()
            }
        }
        yourMessage = info.error
        listOfEndure = {}
        listOfMoves = {}
        renderBoard()
        renderPeices()
        renderChoices()
        renderYouAndThem()
        
    }
}
else{
    curErr = 1
    errorMes = "Not Your Turn"
    listOfEndure = {}
    listOfMoves = {}
    renderBoard()
    notYourTurnDia()
    renderPeices()
    renderChoices()
    renderYouAndThem()
}
}
}
//End of Make a move

errorMes = ""
curErr = 0

function refreshedSelf(){
    //console.log("triggered Refreshed")
    if(oneOrTwo == "two"){
        totalMessage = {0:"1It's not over yet.                                                                        "}
    }
    else{
        totalMessage = {0:"1Now is the time.                                                                              "}
    }
}

function refreshed(){
    //console.log("triggered Refreshed")
    if(oneOrTwo == "one"){
        totalMessage = {0:"2It's not over yet.                                                                        "}
    }
    else{
        totalMessage = {0:"2Now is the time.                                                                              "}
    }
}


//Sound effects for peices
function playSound(peiceName){
    
    console.log(peiceName.name + "Here is the selected sound")
    switch(peiceName.name) {
        case "bishop":
          var audio = new Audio("Sound/Bishop.wav");
          audio.play();
          break;
        case "glider":
          var audio = new Audio("Sound/Glider.wav");
          audio.play();
          break;
        case "horses":
          var audio = new Audio("Sound/Horses.wav");
          audio.play();
          break;
        case "mortal":
          var audio = new Audio("Sound/Mortal.wav");
          audio.play();
          break;
        case "mortal s":
            var audio = new Audio("Sound/Endure7.wav");
            audio.play();
            break;
        case "proven":
          var audio = new Audio("Sound/Proven.wav");
          audio.play();
          break;
        case "proven s":
            var audio = new Audio("Sound/Endure8.wav");
            audio.play();
        case "restless":
          var audio = new Audio("Sound/Endure6.wav");
          audio.play();
          break;
        case "restless s":
            var audio = new Audio("Sound/Endure9.wav");
            audio.play();
            break;
        case "rook":
          var audio = new Audio("Sound/Rook.wav");
          audio.play();
          break;
        case "burst":
          var audio = new Audio("Sound/Endure4.wav");
          audio.play();
          break;
        case "burst s":
            var audio = new Audio("Sound/Spare Sound 4.wav");
            audio.play();
            break;
        case "core":
          var audio = new Audio("Sound/Spare Sound 3.wav");
          audio.play();
          break;
        case "sling":
          var audio = new Audio("Sound/Spare Sound 2.wav");
          audio.play();
        case "sling s":
          var audio = new Audio("Sound/restless.wav");
          audio.play();
          break;
        case "guardian s":
            var audio = new Audio("Sound/Endure1.wav");
            audio.play();
            break;
        case "guardian":
            var audio = new Audio("Sound/Guardian.wav");
            audio.play();
            break;
        case "glider":
            var audio = new Audio("Sound/Glider.wav");
            audio.play();
            break;
        case "pillarLost":
            var audio = new Audio("Sound/PillarLost.wav");
            audio.play();
            break;
        case "lost":
            var audio = new Audio("Sound/Lose.wav");
            audio.play();
            break;
        case "1":
            console.log('play player sound')
            if(oneOrTwo == "one"){
                var audio = new Audio("Sound/Ian_Sound.wav");
                audio.play();
            }
            else{
                var audio = new Audio("Sound/Stella_Sound.wav");
                audio.play();
            }
            break;
        case "2":
            if(oneOrTwo == "two"){
                var audio = new Audio("Sound/Ian_Sound.wav");
                audio.play();
            }
            else{
                var audio = new Audio("Sound/Stella_Sound.wav");
                audio.play();
            }
            break;
      }
    
}
//End of Sound effects for peices

//Saves cookies in the event you accidentally close the tab
function setCookie(cname, cvalue, exdays) {
    //console.log("Triggered at here " + cname + " " + cvalue)
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    //console.log(cname)
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
   
   
//End of Saves cookies in the event you accidentally close the tab


let yourPillarLeft = 2
let theirPillarLeft = 2
//Server contact to join
let waiting = false
async function join(){
//turn = 0
yourMessage = ""
theirMessage = ""
let name = document.getElementById('roomName').value
const data = {name};
const options={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body : JSON.stringify(data)
};
const response = await fetch('/findGame', options);
const info = await response.json();
let player = info.player

console.log(player + " player here")
if(player == "one"){
    multiplier = 1
    homeScreen = false
    //console.log("A trig")
    setCookie("oneOrTwo", 'one')
    //setCookie("oneOrTwo", 'one')
    setCookie("pass", info.key, 20)
    setCookie("name", info.code, 20)
    inGame = false;
    waiting = true
    defeat = false
    victory = false
    mood = 0
    theirMood = 0
    document.getElementById('gameMessage').innerHTML = "waiting for opponet"
    theirMessage = "waiting for opponet. \n Code to Join: " + info.code
    document.getElementById("uiStuff").style.visibility = "hidden"
    document.getElementById("uiStuffPlayer").style.visibility = "visible"
    //console.log("Trigged here for waiting")
   // console.log(theirMessage)
    timeLeft = 180000
    timeLeftThem = 180000   
    renderYouAndThem()
    
    
}
else{
    setCookie("oneOrTwo", 'two')
    //console.log(info)
    if(info.error == undefined){
        multiplier = 1
        homeScreen = false
        document.getElementById("uiStuff").style.visibility = "hidden"
        document.getElementById("uiStuffPlayer").style.visibility = "visible"
        cutsWidth = info.width
        cutsHeight = info.height    
        listOfYourPeices = info.two
        listOfTheirPeices = info.one
        listOfEveryone = info.all
        listOfPowerUp = info.power
        //console.log("TWO SET OFF")
        //setCookie("oneOrTwo", 'two')
        //console.log("Triggered here 1")
        theirMessage = "their turn"
        timeLeft = 180000
        timeLeftThem = 180000 
        c.clearRect(0, 0, canvas.width, canvas.height);
        renderBoard()
        renderPeices()
        renderYouAndThem()
        yourPillarLeft = 2
        theirPillarLeft = 2
        pillarsOrPIllar = " Pillars Left"
        pillarsOrPillarThem = " Pillars Left"
        setCookie("pass", info.key, 20)
        setCookie("name", info.code, 20)

        //document.getElementById('gameMessage').innerHTML = "opponet's turn"
        inGame = true
        yourTurn = false
    }
    else{
        //console.log(info.error)
        yourMessage = info.error
        renderYouAndThem()
    }
}
//setCookie("pass", info.key, 20)
//setCookie("name", info.code, 20)
//setCookie("player", player, 20)
//setCookie("oneOrTwo", player, 20)
//console.log("triggered here 2")
}
//End of server contact to join


//Server contact to join for quickplay
async function quickPlay(){
const options={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
};
const response = await fetch('/findQuickPlay', options);
const info = await response.json();
let player = info.player
console.log(player + " player here")
if(player == 'one'){
    multiplier = 1
    homeScreen = false
    setCookie("oneOrTwo", 'one')
    theirMessage = "waiting for opponet.\nCode to Join: " + info.code
    waiting = true
    inGame = false
    //console.log("B trigged")
    
    
    //setCookie("oneOrTwo", 'one')
    
    setCookie("pass", info.key, 20)
    setCookie("name", info.code, 20)
    renderYouAndThem()
    //document.getElementById('gameMessage').innerHTML = "waiting for opponet"
    document.getElementById("uiStuff").style.visibility = "hidden"
    document.getElementById("uiStuffPlayer").style.visibility = "visible"
    
}
else{
    //console.log(info)
    if(info.error == undefined){
        
        multiplier = 1
        homeScreen = false
        setCookie("oneOrTwo", 'two')
        document.getElementById("uiStuff").style.visibility = "hidden"
        document.getElementById("uiStuffPlayer").style.visibility = "visible"
        cutsWidth = info.width
        cutsHeight = info.height    
        listOfYourPeices = info.two
        listOfTheirPeices = info.one
        listOfEveryone = info.all
        listOfPowerUp = info.power
        theirMessage = "Their Turn"
        //console.log("TWO SET OFF B")
        //setCookie("oneOrTwo", 'two')
        //console.log("Triggered here 3 " + getCookie("oneOrTwo"))
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        renderBoard()
        renderPeices()
        renderYouAndThem()
        yourPillarLeft = 2
        theirPillarLeft = 2
        pillarsOrPillar = " Pillars Left"
        pillarsOrPillarThem = " Pillars Left"
        //document.getElementById('gameMessage').innerHTML = "opponet's turn"
        timeLast = Date.now()
        inGame = true
        yourTurn = false
    }
    else if(info.error = "Invalid room name"){
        
        console.log("Invalid room name")
    }
    else{
        console.log("room full")
    }
}

setCookie("pass", info.key, 20)
setCookie("name", info.code, 20)



}
//End of server contact to join

//Confirms that you want to give up
function confirmSur(){
    //console.log("triggered to give up")
    document.getElementById("uiStuffPlayer").innerHTML = '<span><button onclick="surrender()" style=" font-size:1.5vh;" class="glow-on-hover" id="giveUp">Confirm?</button></span>'
    resize()
}   
//Confirms that you want to give up


//Surrender: When you want to give up
async function surrender(){
    let pass = getCookie('pass')
    oneOrTwo = getCookie('oneOrTwo')
    let room = getCookie('name')
    const data = {pass, oneOrTwo, room};
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    };
    const response = await fetch('/surrender', options);
    const info = await response.json();

    if(info.success){
        //console.log("You should have won")
        theirMessage = "You gave up, how sad"
        firstMessage = "You Surrendered"
        defeat = true
        secondMessage = "You Lose"
        inGame = false
        //waiting = false
        document.getElementById("uiStuff").style.visibility = "visible"
        document.getElementById("uiStuffPlayer").style.visibility = "hidden"
        gameOverScreen()
    }
}
//End of Surrender: When you want to give up


//Banter between the characters
let waitingDialogue = 0


function banter(){
    console.log("Triggered banter")
    currentMes = -1
    //lastTime = Date.now()
    //updateAni = 1
    let whichDio = Math.floor(Math.random() * 4);

    if(oneOrTwo == "one"){
        if(whichDio == 0){
            totalMessage = {0:"1Why do people go into casinos if they know they will lose?                                                                        ",
                        1: "2Everyone thinks they're clever, until they arent'                                                                        "
            }
            

        }
        else if(whichDio == 1){
            totalMessage = {
                        0:"1How does wearing glasses work for you? just wondering                                                                        ",
                        1: "2Contact Lenses.                                                                        ",
                        0:"1What do I call you? Twelve eyes?                                                                        ",
            }
        }
        else if(whichDio == 2){
            totalMessage = {
                        0:"2You know, You and Naverion remind me of two certain skeleton.                                                                        ",
                        1: "1HE HE HE HE HE HE HE                                                                       ",
                        2:"2Blue stop signs. understood.                                                                        ",
            }
        }
        else if(whichDio == 3){
            totalMessage = {
                        0:"2Do skeleon sleep?                                                                         ",
                        1:"1Most are. go to a graveyard                                                                         ",
                        2:"2Not what I meant.                                                                        ",
            }
        }
    }
    else{
        if(whichDio == 0){
            totalMessage = {0:"2Why do people go into casinos if they know they will lose?                                                                        ",
                        1: "1Everyone thinks they're clever, until they don't                                                                        "
            }
            

        }
        else if(whichDio == 1){
            totalMessage = {
                0:"2Do you wear sunglasses? just wondering                                                                        ",
                1:"1Contact Lenses.                                                                        ",
                2:"2What do I call you? Twelve eyes?                                                                        ",
            }
        }
        else if(whichDio == 2){
            totalMessage = {
                        0:"1You know, You and Naverion remind me of two certain skeleton.                                                                        ",
                        1: "2HE HE HE HE HE HE HE                                                                       ",
                        2:"1Blue stop signs. understood.                                                                        ",
            }
        }
        else if(whichDio == 3){
            totalMessage = {
                        0:"1Do skeleon sleep?                                                                         ",
                        1:"2Most are. go to a graveyard                                                                         ",
                        2:"1Not what I meant.                                                                        ",
            }
        }
    }

}
//End of Banter between the characters


let peiceValue = "    "
specialMove = false
//Checks for your turn.
async function yourTurnYet(){
    let pass = getCookie('pass')
    oneOrTwo = getCookie('oneOrTwo')
    let room = getCookie('name')
    const data = {pass, oneOrTwo, room};
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    };
    const response = await fetch('/checkTurn', options);
    const info = await response.json();
    //console.log(info)
    if (info.answer){
        waitingDialogue = 0
        document.getElementById("uiStuffPlayer").style.innerHTML = '<span><button onclick="confirmSur()" style="width:8vh; height:2vh; font-size:1.5vh;" class="glow-on-hover">give up</button></span>'
        timeLast = Date.now()
        peiceValue = info.peiceMoved
        
        //console.log(peiceValue[-1])
        //console.log("here was the use for the -1")
        //consolelog
        if(peiceValue.charAt(peiceValue.length - 1) == "s" & peiceValue.charAt(peiceValue.length - 2) == " "){
            specialMove = true
        }
        else{
            specialMove = false
        }

        if(yourPillarLeft != info.selfPillar){
            if(info.selfPillar == 0){
                pillarBadMessageFinal()
            }
            else{
                pillarBadMessage()
            }
            //pillarBadMessage()
            playSound({name:"pillarLost"})
        }
        else if (theirPillarLeft != info.pillar){
            if(info.pillar == 0){
                pillarGoodMessageFinal()
            }
            else{
                pillarGoodMessage()
            }
        }
        else{
            playSound({name:peiceValue})
        }
        was = info.was.split(" ")
        now = info.now.split(" ")
        
        console.log(listOfPowerUp)
        
        
            if(listOfPowerUp[now[0] + " " + now[1]] == "time" && timeLeftThem < 30000){
                refreshed()
            }
        
        listOfYourPeices = info.you 
        listOfEveryone = info.all
        listOfTheirPeices = info.them
        theirPillarLeft = info.pillar
        yourPillarLeft = info.selfPillar
        
        
        wasx = was[0]
        wasy = was[1]
        nowx = now[0]
        nowy = now[1]
        aniMoved = 1
        
        
        //console.log(info.peiceMoved)

        if(yourPillarLeft == 1){
            pillarsOrPillar = " Pillar Left"
        }
        else{
            pillarsOrPillar = " Pillars Left"
        }
        if(theirPillarLeft == 1){
            pillarsOrPillarThem = " Pillar Left"
        }
        else{
            pillarsOrPillarThem = " Pillars Left"
        }
        //console.log(info.timeLeftThem + "Time left for it")

        
        timeLeft = info.timeLeft
        timeLeftThem = info.timeLeftThem
        listOfPowerUp = info.power
        //console.log(info.won)
        if(info.lost){
            if(timeLeft < 0){
                defeat = true
           theirMessage = "OUT OF TIME! YOU LOSE"
           firstMessage= "Time Hit Zero"
           inGame = false
           secondMessage = "You Lose"
           playSound({name:"lost"})
           gameOverScreen()
            }
            else{
                defeat = true
           theirMessage = "Core Destroyed. You Lose"
           firstMessage= "Core Destroyed"
           inGame = false
           secondMessage = "You Lose"
           playSound({name:"lost"})
           gameOverScreen()
            }
            
            //document.getElementById(F"uiStuff").style.visibility = "visible"
        }
        else{
            //document.getElementById('gameMessage').innerHTML = "Your' Turn"
            theirMessage = "Your Turn"
            errorMes = ""
            turn = turn + 1
            onlyOnceWarn = false
            listOfMoves = {}
        }
        renderYouAndThem()
        renderBoard()
        renderPeices()
        renderMood()
        ///turn += 1
        //console.log(turn)
        yourTurn = true
    }
    else{
        if(info.won){
            if(info.surrendered){
                victory = true
                theirMessage = "They gave up"
                firstMessage = "Enemy Surrendered"
                secondMessage = "You Win"
            }
            else{
                victory = true
                theirMessage = "They ran out of time! You win!"
                firstMessage = "Time Hit Zero"
                secondMessage = "You Win"
            }
            //console.log("You should have won")
            waiting = false
            inGame = false
            document.getElementById("uiStuff").style.visibility = "visible"
            document.getElementById("uiStuffPlayer").style.visibility = "hidden"
            gameOverScreen()
        }
        /*
        else{
            waitingDialogue += 1
            if(waitingDialogue > 5){
                banter()
                waitingDialogue = 0
            }
        }
        */
    }
}
//End of checks for your turn

function resetMessage(){
    totalMessage = ""
}
let updateAni = -1.5

function notYourTurnDia(){
    if(oneOrTwo == "one"){
        totalMessage = {0:"2You can Wait                                                                        "}
    }
    else{
        totalMessage = {0:"2That's uncalled for                                                                              "}
    }
}

function cooldownMes(){
    currentMes = -1
    lastTime = Date.now()
    //console.log("goodmessage used")
    if(oneOrTwo == "one"){
        totalMessage = {0:"1They can't do that yet                                                                        "}
    }
    else{
        totalMessage = {0:"1Not yet, but soon                                                                              "}
    }
}

function pillarGoodMessage(){
    lastTime = Date.now()
    updateAni = 1
    currentMes = -1
    //console.log("goodmessage used")
    if(oneOrTwo == "one"){
        totalMessage = {0:"2You'll pay for that                                                                        "}
    }
    else{
        totalMessage = {0:"2They will be remembered                                                                              "}
    }
}

function pillarGoodMessageFinal(){
    lastTime = Date.now()
    updateAni = 1
    currentMes = -1
    console.log("final")
    if(oneOrTwo == "one"){
        totalMessage = {0:"2I'll do this myself if I must                                                                        "}
    }
    else{
        totalMessage = {0:"2This complicates things                                                                              "}
    }
}

function pillarBadMessage(){
    currentMes = -1
    lastTime = Date.now()
    updateAni = 1
    //console.log("badmessage used")
    //console.log(oneOrTwo)
    if(oneOrTwo == "one"){
        totalMessage = {0:"1They will be remembered                                                                                                                    "}
    }
    else{
        totalMessage = {0:"1You'll pay for that                                                                                                                                       "}
    }
}

function pillarBadMessageFinal(){
    currentMes = -1
    lastTime = Date.now()
    updateAni = 1
    console.log("final")
    //console.log(oneOrTwo)
    if(oneOrTwo == "one"){
        totalMessage = {0:"1This complicates things                                                                                              "}
    }
    else{
        totalMessage = {0:"1I'll do this myself if I must                                                                                                                                     "}
    }
}


//Checks for opponet
async function opponetJoined(){
    let name = getCookie("name")
    //console.log(name)
    const data = {password: getCookie(""), room: getCookie("name")};
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    };
    const response = await fetch('/foundOpponet', options);
    timeLast = Date.now()
    const info = await response.json();
    if(info.found){
        board = (JSON.parse(info.boardInfo))
        cutsWidth = board.width
        cutsHeight = board.height
        //console.log(JSON.parse(info.board.one))
        listOfYourPeices = (JSON.parse(info.board.one))
        listOfTheirPeices = (JSON.parse(info.board.two))
        listOfEveryone = (JSON.parse(info.board.all))
        //console.log(info.board)
        listOfPowerUp = (JSON.parse(info.board.power))
        waiting = false
        //console.log(listOfYourPeices)
        //console.log(listOfTheirPeices)
        //console.log("Trigged C")
        //setCookie("oneOrTwo", 'one')
        //console.log("Triggered here 5 " + getCookie("oneOrTwo"))
        yourPillarLeft = 2
        theirPillarLeft = 2
        mood = yourPillarLeft - theirPillarLeft
        theirMood = theirPillarLeft - yourPillarLeft
        pillarsOrPillar = " Pillars Left"
        pillarsOrPillarThem = " Pillars Left"
        //document.getElementById('gameMessage').innerHTML = "Your move"
        theirMessage = "Your Turn"
        renderBoard()
        renderPeices()
        renderYouAndThem()
        inGame = true
        yourTurn = true
    }
    else{
        //console.log("Not found")
    }
}
//End of checks for opponet



let selectionIt = 1
let selectionItEndure = 1
let listOfEndure = {}
//Renders the posible place to move
function renderChoices(){

    waitingDialogue += 1
        if(waitingDialogue > 1000){
            banter()
            waitingDialogue = 0
        }

    listOfEndure = {}
    for(const key in listOfMoves) { 
        let loc = key.split(" ")
        if(listOfMoves[key] == "simple"){
            if(listOfTheirPeices[key] != undefined){
                if(listOfTheirPeices[key].name != "core"){
                    drawPoint({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selIt:selectionIt})
                }
                else if(theirPillarLeft < 1){
                    drawPoint({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selIt:selectionIt})
                }
                else{
                    listOfMoves[key] = undefined
                }
            }
            else{
                drawPoint({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selIt:selectionIt})
            }
            
        }
        else if (listOfMoves[key] == "endure"){
            listOfEndure[key] = "endure"
            if(listOfTheirPeices[key] != undefined){
                if(listOfTheirPeices[key].name != "core"){
                    drawPointEndure({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selItEndure:selectionItEndure})
                }
                else if(theirPillarLeft < 1){
                    drawPointEndure({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selItEndure:selectionItEndure})
                }
                else{
                    listOfMoves[key] = undefined
                }
            }
            else{
                drawPointEndure({xP: parseInt(loc[0]), yP: parseInt(loc[1]), selItEndure:selectionItEndure})
            }
            
        }

    }
    selectionIt += 1
    if(selectionIt > 10){
        selectionIt = 1
    }

    selectionItEndure += 1
    if(selectionItEndure > 14){
        selectionItEndure = 1
    }
    
}
//End of Renders the possible places to move

function renderEndure(){
    for(const key in listOfEndure){
        let loc = key.split(" ")
        drawPointEndureText({xP: parseInt(loc[0]), yP: parseInt(loc[1])})
    }
}


// This gets us how long it's been since a peice of code ran.
let everysec = Date.now();
// End of This gets us how long it's been since a peice of code ran.
//EverHalf
let every50 = Date.now();

let every20 = Date.now();
//End of every half

let timeLast = Date.now()


let oneOrTwo = "one"


//Quick Rejoin if you get disconnected
async function reconnect(){
    if (getCookie("oneOrTwo") != ''){
        let pass = getCookie('pass')
        oneOrTwo = getCookie('oneOrTwo')
        let room = getCookie('name')
        const data = {pass, oneOrTwo, room};
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(data)
        };
        const response = await fetch('/rejoin', options);
        const info = await response.json();
        const intel = info.information
        //console.log(intel)
        //console.log(intel)
        if(intel != undefined){
            homeScreen = false
            if(intel.disconnected){
                reset()
            }
            else if(intel.victory){
                victory = true
                listOfYourPeices = intel.you
                listOfTheirPeices = intel.them
                listOfEveryone = intel.all
                timeLeft = intel.timeLeft
                timeLeftThem = intel.timeLeftThem
                cutsHeight = intel.height
                cutsWidth = intel.width
                listOfPowerUp = intel.power
                theirMessage = "When you were gone, you won!"   
                firstMessage = "You won"
                secondMessage = "Yay"
                renderBoard()
                renderChoices()
                renderPeices()
                renderYouAndThem()
                gameOverScreen()
                resize()
                screenMult = 1
                inGame = false
                document.getElementById("uiStuff").style.visibility = "visible"
                document.getElementById("uiStuffPlayer").style.visibility = "hidden"
            }
            else if (intel.defeat){
                defeat = true
                listOfYourPeices = intel.you
                listOfTheirPeices = intel.them
                listOfEveryone = intel.all
                timeLeft = intel.timeLeft
                timeLeftThem = intel.timeLeftThem
                cutsHeight = intel.height
                cutsWidth = intel.width
                listOfPowerUp = intel.power
                theirMessage = "When you were gone, you lost!"
                firstMessage = "You lost"
                secondMessage = "try again"
                renderBoard()
                renderChoices()
                renderPeices()
                renderYouAndThem()
                gameOverScreen()
                resize()
                inGame = false
                document.getElementById("uiStuff").style.visibility = "visible"
                document.getElementById("uiStuffPlayer").style.visibility = "hidden"
            }
            else if (!intel.inGame){
                waiting = true
                inGame = false
                theirMessage = "Still waiting"
                resize()
                renderBoard()
                renderChoices()
                renderPeices()
                renderYouAndThem()
                gameOverScreen()
                document.getElementById("uiStuff").style.visibility = "hidden"
                document.getElementById("uiStuffPlayer").style.visibility = "visible"

            }
            else{
                //console.log(intel)
                turn = parseInt(intel.turnNumber)
                //console.log(turn)
               // console.log(" here is your turn")
                listOfYourPeices = intel.you
                listOfTheirPeices = intel.them
                listOfEveryone = intel.all
                timeLeft = intel.timeLeft
                timeLeftThem = intel.timeLeftThem
                cutsHeight = intel.height
                cutsWidth = intel.width
                listOfPowerUp = intel.power
                yourPillarLeft = intel.pillarsYou
                theirPillarLeft = intel.pillarsThem
                if(yourPillarLeft == 1){
                    pillarsOrPillar = " Pillar Left"
                }
                else{
                    pillarsOrPillar = " Pillars Left"
                }
                if(theirPillarLeft == 1){
                    pillarsOrPillarThem = " Pillar Left"
                }
                else{
                    pillarsOrPillarThem = " Pillars Left"
                }
                
                inGame = true
                document.getElementById("uiStuff").style.visibility = "hidden"
                document.getElementById("uiStuffPlayer").style.visibility = "visible"
                if(intel.turn == oneOrTwo){
                    theirMessage = "Your Turn"
                    onlyOnceWarn = false
                }
                else{
                    theirMessage = "Their Turn"
                    onlyOnceWarn = false
                }
                yourTurnYet()
                renderBoard()
                renderChoices()
                renderPeices()
                renderYouAndThem()
            }
        }
        else{
            defaultScreen()
        }
        

    
    
    }
    else{
        defaultScreen()
    }
}

function defaultScreen(){
    setCookie("oneOrTwo", '')
    setCookie("pass", '')
    setCookie("name", '')
    document.getElementById("uiStuff").innerHTML = uiFace
}


//End of Quick Rejoin if you get disconnected


//Main loop

onlyOnceWarn = false

function mainLoop(){
    time = Date.now()
    //console.log(document.cookie)
    if(time - every50 > 50){
        if(inGame == true){
        renderChoices()
        renderPeices()
        renderEndure()
        if(curErr != 0){
            //console.log("trigged Error")
            renderError()
        }
        }
        else if (homeScreen){
            renderTitleScreen()
        }
        else{
            if(!waiting){
                renderEndMessage()
            }
        }
        every50 = Date.now()
    }



    if(time - everysec > 1000){    
        //console.log(getCookie("oneOrTwo"))
        everysec = time
        if(waiting){
            opponetJoined()
            //console.log("HERE + " +  getCookie("oneOrTwo"))
        }
        else if(inGame && !yourTurn){
            yourTurnYet()
            //console.log('your turn trig')
        }
        everySec = time

            if(inGame){
                //console.log(getCookie("oneOrTwo"))
                if(yourTurn == true){
                    timeLeft -= Date.now() - timeLast
                    if(timeLeft < 4000 && inGame){
                        didYouLose()
                    }
                    else if(timeLeft < 30000){
                        if(!onlyOnceWarn){
                            gottaMove()
                            onlyOnceWarn = true
                        }
                    }
                }
                else{
                    if(inGame == true){
                        timeLeftThem -= Date.now() - timeLast
                        if(timeLeftThem < 30000){
                            if(!onlyOnceWarn){
                                gottaMoveThem()
                                onlyOnceWarn = true
                            }
                        }
                    }
                    //console.log(timeLeftThem)
                    /*
                    if(timeLeftThem < 0){
                        console.log("triggered")
                        //yourTurnYet()
                    }
                    */
                }
                timeLast = Date.now()
                renderYouAndThem()
            }
            
        
    }

    if(time - every20 > 10){
        
        
        if(totalMessage[0] != undefined){
            renderYouAndThem()
        }

        if(updateAni > -1.5){
            if(updateAni < 0){
                moodPer = mood
            }
            renderYouAndThem()
            //console.log("Udate ani trigged")
            cYou.fillStyle = 'white'

            cYou.fillRect(canvas.width - canvas.width/5, Math.abs(canvas.height/6 * (updateAni)), canvas.height/6 , canvas.height/6)
            cThem.fillStyle = 'red'
            cThem.fillRect(canvas.width/30, Math.abs(canvas.height/12 * (updateAni)), canvas.height/6 ,  canvas.height/6)

            updateAni -= (Date.now() - lastTime) * .002
            //console.log(updateAni)
            lastTime = Date.now()
            if(updateAni < -1.5){
                renderYouAndThem()
            }

            cYou.fillStyle = 'black'
            cYou.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
            cYou.fillRect(canvasYou.width /2, 0, canvasYou.width ,  canvasYou.width * 1/50)

            cThem.fillStyle = 'black'
            cThem.fillRect(0, 0, canvasYou.width * 1/50,  canvasYou.height)
            cThem.fillRect(0, 0, canvasYou.width/2 ,  canvasYou.width * 1/50)
            
        }
        else{
            moodPer = mood
        }
        
        
        
        every20 = Date.now()
    }


    window.requestAnimationFrame(mainLoop)   //Keeps the loop going
}
mainLoop()
//End of Main Loop



//This is for when you are running out of time
function gottaMove(){
    currentMes = -1
    //console.log("goodmessage used")
    let whichDio = Math.floor(Math.random() * 2);
    if(oneOrTwo == "one"){
        if(whichDio == 0){
            totalMessage = {0:"1Would you look at the time!                                                                        "}
        }
        else if (whichDio == 1){
            totalMessage = {0:"1Let's not keep them waiting!                                                                        "}
        }
    }
    else{
        if(whichDio == 0){
            totalMessage = {0:"1Don't Rush Me!                                                                        "}
        }
        else if (whichDio == 1){
            totalMessage = {0:"1I don't have time for this!                                                                        "}
        }
    }
}
//End of This is for when you are running out of time

function gottaMoveThem(){
    currentMes = -1
    //console.log("goodmessage used")
    let whichDio = Math.floor(Math.random() * 2);
    if(oneOrTwo == "two"){
        if(whichDio == 0){
            totalMessage = {0:"2Would you look at the time!                                                                        "}
        }
        else if (whichDio == 1){
            totalMessage = {0:"2Let's not keep them waiting!                                                                        "}
        }
    }
    else{
        if(whichDio == 0){
            totalMessage = {0:"2Don't Rush Me!                                                                        "}
        }
        else if (whichDio == 1){
            totalMessage = {0:"2I don't have time for this!                                                                        "}
        }
    }
}

//This is the title screen animation
let screenMult = 1
function renderTitleScreen(){
    //console.log(screenMult)
    if(screenMult < .005){
        c.fillStyle = 'black'
    }
    else if(screenMult < .05){
        c.fillStyle = 'purple'
    }
    else if(screenMult < .1){
        c.fillStyle = 'blue'
    }
    else if(screenMult < .2){
        c.fillStyle = 'red'
    }
    else{
        c.fillStyle = 'black'
    }
    c.font = (canvas.width/10) + "px Arial";
    addition = canvas.width * screenMult
    screenMult = screenMult/((Math.random()) * .5 + 1)
    if(screenMult < .00001){
        screenMult = 1
    }
    c.fillText("Servants", canvas.width * 1/5 + addition, canvas.height/5)
    c.fillText("Of Ruin", canvas.width * 2/5 - addition, canvas.height/3)
}
//End of This is the title screen animation


let firstMessage = 'General'
let secondMessage = 'Message'
//This is the end of game message animation
function renderEndMessage(){
    //console.log(screenMult)
    if(screenMult < .005){
        c.fillStyle = 'saddlebrown'
    }
    else if(screenMult < .01){
        c.fillStyle = 'pink'
    }
    else if(screenMult < .02){
        c.fillStyle = 'orange'
    }
    else if(screenMult < .05){
        c.fillStyle = 'HotPink'
    }
    else{
        c.fillStyle = 'DarkMagenta'
    }
    c.font = "3vw Arial";
    addition = canvas.width * screenMult

    screenMult = screenMult/((Math.random()) * .5 + 1)
    if(screenMult < .00001){
        screenMult = 1
    }
    c.fillText(firstMessage, canvas.width * 1/5 + addition, canvas.height/5)
    c.fillText(secondMessage, canvas.width * 3/5 - addition, canvas.height/3)
}
//End of This is the title screen animation

screenMultErr = 1
//Renders an error
function renderError(){
    //console.log(screenMult)
    if(screenMultErr < .005){
        c.fillStyle = 'saddlebrown'
    }
    else if(screenMultErr < .01){
        c.fillStyle = 'pink'
    }
    else if(screenMultErr < .02){
        c.fillStyle = 'orange'
    }
    else if(screenMultErr < .05){
        c.fillStyle = 'HotPink'
    }
    else{
        c.fillStyle = 'green'
    }
    c.font = "3vw Arial";
    addition = canvas.width * screenMultErr

    screenMultErr = screenMultErr/((Math.random()) * .5 + 1)
    c.fillText(errorMes, canvas.width * 1/5 + addition, canvas.height/2)
    if(screenMultErr < .00001){
        curErr = 0
        screenMultErr = 1
        renderBoard()
        renderChoices()
        renderPeices()
        renderEndure()
        
    }
    //c.fillText(secondMessage, canvas.width * 3/5 - addition, canvas.height/3)
}

//End of renders and error





