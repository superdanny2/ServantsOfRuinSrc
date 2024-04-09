//Creates the Express stuff
const express = require('express')
const path = require('path')
const app = express();
//End of Creates the Express stuff



//Express setup

app.use('/Public',express.static(path.join(__dirname,'Client_Side')))
app.use('/Mortal',express.static(path.join(__dirname,'Client_Side/Animation/Mortal')))
app.use('/Glider',express.static(path.join(__dirname,'Client_Side/Animation/Glider')))
app.use('/Selection',express.static(path.join(__dirname,'Client_Side/Animation/Selection')))
app.use('/Restless',express.static(path.join(__dirname,'Client_Side/Animation/Restless')))
app.use('/Horses',express.static(path.join(__dirname,'Client_Side/Animation/Horses')))
app.use('/Bishop',express.static(path.join(__dirname,'Client_Side/Animation/Bishop')))
app.use('/Guardian',express.static(path.join(__dirname,'Client_Side/Animation/Guardian')))
app.use('/Rook',express.static(path.join(__dirname,'Client_Side/Animation/Rook')))
app.use('/Sling',express.static(path.join(__dirname,'Client_Side/Animation/Sling')))
app.use('/Burst',express.static(path.join(__dirname,'Client_Side/Animation/Burst')))
app.use('/Core',express.static(path.join(__dirname,'Client_Side/Animation/Core')))
app.use('/Endure',express.static(path.join(__dirname,'Client_Side/Animation/Endure')))
app.use('/Pillar',express.static(path.join(__dirname,'Client_Side/Animation/Pillar')))
app.use('/Proven',express.static(path.join(__dirname,'Client_Side/Animation/Proven')))
app.use('/AddTime',express.static(path.join(__dirname,'Client_Side/Animation/AddTime')))

app.use('/Stella',express.static(path.join(__dirname,'Client_Side/Animation/Stella')))
app.use('/Ian',express.static(path.join(__dirname,'Client_Side/Animation/Ian')))

app.use('/MortalOp',express.static(path.join(__dirname,'Client_Side/Animation/MortalOp')))
app.use('/GliderOp',express.static(path.join(__dirname,'Client_Side/Animation/GliderOp')))
app.use('/RestlessOp',express.static(path.join(__dirname,'Client_Side/Animation/RestlessOp')))
app.use('/HorsesOp',express.static(path.join(__dirname,'Client_Side/Animation/HorsesOp')))
app.use('/BishopOp',express.static(path.join(__dirname,'Client_Side/Animation/BishopOp')))
app.use('/GuardianOp',express.static(path.join(__dirname,'Client_Side/Animation/GuardianOp')))
app.use('/RookOp',express.static(path.join(__dirname,'Client_Side/Animation/RookOp')))
app.use('/SlingOp',express.static(path.join(__dirname,'Client_Side/Animation/SlingOp')))
app.use('/BurstOp',express.static(path.join(__dirname,'Client_Side/Animation/BurstOp')))
app.use('/CoreOp',express.static(path.join(__dirname,'Client_Side/Animation/CoreOp')))
app.use('/ProvenOp',express.static(path.join(__dirname,'Client_Side/Animation/ProvenOp')))

app.use('/Sound',express.static(path.join(__dirname,'Client_Side/Sound')))

//app.use('/OtherPages',express.static(path.join(__dirname,'Client_Side/OtherPages')))
//Sound effects

//End of Sound Effects


//End of Express setup



//Gives the user the main GUI
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Client_Side','main.html'));
});
//End of gives the user the main GUI

//Gives the user the main GUI
app.get('/info.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'Client_Side','info.html'));
});
//End of gives the user the main GUI


//Set Up for Post
app.use(express.static('public'));
app.use(express.json({limit:'5mb'}));
//End of Set UP for Post



//Join a game request
var fs = require('fs');
app.post('/findGame', (req, res) => {
    //console.log("This is used")
    dir = req.body.name;
    message = validRoom(dir.split(''))
    if(message == true){
        let info = joinGame(dir)
        //console.log(info)
        //console.log(info.whichplayer)
        if(info.error == undefined){
            res.json({
                key: info.key,
                code: dir,
                player: info.whichplayer,
                height: info.height,
                width: info.width,
                one: info.one,
                two:info.two,
                all:info.all,
                error: info.error,
                power:info.power
            })
        }
        else{
            res.json({
                error: info.error
            }) 
        }
    }
    else{
        res.json({
            error: message
        }) 
    }
    
});
//End of Join a game request

function generateName(){
    //This deals with fixing the file if it is not there
    let currentStat = ""
    try{
        currentStat = fs.readFileSync("quickMatchId.txt",  'utf8')  
    }
    catch{
        fs.writeFileSync("quickMatchId.txt", "");
    }
    if(currentStat == ""){
        keepGen = true
        let pass
        while(keepGen){
            pass = "-" + makeid(7)
            if (!fs.existsSync("Games/" + pass + "/playerOne.txt")) {
                // Do something
                keepGen = false
            }
        }
        fs.writeFileSync("quickMatchId.txt", pass);
        return pass
    }
    else{
        let waitingTime = 0
        try{
            waitingTime = fs.readFileSync("Games/" + currentStat + "/waitingRoomQuickPlay.txt",  'utf8')
        }
        catch{}
        console.log(currentStat)
        let time = new Date().getTime()
        if(time - waitingTime < 5000){
            fs.writeFileSync("quickMatchId.txt", "");
            return currentStat
        }
        else{
            try{
                fs.writeFileSync("Games/" + currentStat + "/disconnected.txt","Took Too Long",  'utf8')
            }
            catch{
                
            }
            keepGen = true
            let pass
            while(keepGen){
                pass = "-" + makeid(7)
                if (!fs.existsSync("Games/" + pass + "/playerOne.txt")) {
                    // Do something
                    keepGen = false
                }
            }
            fs.writeFileSync("quickMatchId.txt", pass);
            return pass
        }
        
    }
}



//When the player gives up or surrenders
//Is it thursday yet... I mean is it your turn yet?
app.post('/surrender', (req, res) => {
    info = req.body;
    //console.log(info)
    let infoToReturn = {}
    let lost = false
    let won = false
    let dir = info.room
    if(checkPass(info.oneOrTwo, info.pass, info.room)){
        //console.log(dir)
        //console.log(currentQuickName)
        //console.log("-+-")
        let currentStat = fs.readFileSync("quickMatchId.txt",  'utf8')
        if(dir == currentStat){
            fs.writeFileSync("quickMatchId.txt", "");
        }
        if(info.oneOrTwo == 'one'){
            fs.appendFileSync("Games/" + dir + "/" + "twowins.txt", "A", function(err){if(err) throw err;})
            fs.appendFileSync("Games/" + dir + "/" + "surrender.txt", "A", function(err){if(err) throw err;})
            
        }
        else {
            fs.appendFileSync("Games/" + dir + "/" + "onewins.txt", "A", function(err){if(err) throw err;})
            fs.appendFileSync("Games/" + dir + "/" + "surrender.txt", "A", function(err){if(err) throw err;})
        }
        res.json({
            success:true
        })
    }
    else{
        res.json({
            error:"Password is wrong. either I am a bad programmer or you are trying to hack in. shame on you."
        })
}
});
//End of when the player gives up or surrenders


//Join a game request
app.post('/findQuickPlay', (req, res) => {
    dir = generateName()
    //console.log(dir)
    let info = joinGame(dir)
    //dir = req.body.name;
    //console.log(info)
    if(validRoom(dir.split(''))){
        //console.log(info)
        //console.log(info.whichplayer)
        if(info.error == undefined){
            //console.log("here was sent")
            res.json({
                key: info.key,
                code: dir,
                player: info.whichplayer,
                height: info.height,
                width: info.width,
                one: info.one,
                two:info.two,
                all:info.all,
                error: info.error,
                power:info.power
            })
        }
        else{
            //console.log("here was A")
            res.json({
                error: info.error
            }) 
        }
    }
        else{
            //console.log("here was B")
            res.json({
                error: info.error
            }) 
        }
    
});
//End of Join a game request


//Make a move request
app.post('/makeMove', (req, res) => {
    info = req.body;
    pass = info.pass
    dir = info.room
    moveInfo = info.moveSelected
    let infoToReturn
    let lost = false


    if(info.oneOrTwo == 'one'){
        lost = fs.existsSync("Games/" + dir +  "/two" + "wins.txt")
    }
    else{
        lost = fs.existsSync("Games/" + dir +  "/one" + "wins.txt")
    }
    if(!lost){
        /*
        console.log("Here")
        console.log(info.oneOrTwo)
        console.log(pass)
        console.log(info.room)
        console.log("Herea")
        */
        if(checkPass(info.oneOrTwo, pass, info.room)){
            //console.log("Something is fine here")
            infoToReturn = move(info)  
        
        res.json({
            you: infoToReturn.you,
            all: infoToReturn.all,
            them: infoToReturn.them,
            error: infoToReturn.error,
            victory:infoToReturn.victory,
            pillar: infoToReturn.pillar,
            selfPillar: infoToReturn.selfPillar,
            timeLeft: infoToReturn.timeLeft,
            timeLeftThem: infoToReturn.timeLeftThem,
            defeat: infoToReturn.defeat,
            power:infoToReturn.power
        })
        }
        else{
            res.json({
                error: "Invalid Password"
            })
        }
    }
    else{
        if(fs.existsSync("Games/" + dir +  "/surrender.txt")){
            res.json({
                error: "surrendered"
            })
        }
        else{
            res.json({
                error: "Game Already Concluded"
            })
        }
    }
});
//End of make a move request



//Make a move function
function move(info){
    let timeLeft = 180000
    let timeLeftThem = 180000
    let victory = false
    let defeat = false
    directory = ''
    oneOrTwo = info.oneOrTwo
    //console.log(oneOrTwo)
    if(oneOrTwo == 'one'){
        directory = '/onePeices' 
    }
    else{
        
        directory = '/twoPeices'
    }
    if(fs.readFileSync("Games/" + dir + '/turn.txt',  'utf8') == oneOrTwo){
        
        let pillarChange = 2
        let selfPillarChange = 2
        if(oneOrTwo == "one"){
            pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
            selfPillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
        }
        else{
            pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
            selfPillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
        }
        
        let content = JSON.parse(fs.readFileSync("Games/" + dir + directory + ".json", 'utf8'));
        let contentAll = JSON.parse(fs.readFileSync("Games/" + dir + "/peices.json", 'utf8'));
        let contentThem = {}
        let oneOrTwoDir
        if(oneOrTwo == 'one'){
            contentThem = JSON.parse(fs.readFileSync("Games/" + dir + '/twoPeices' + ".json", 'utf8'))
            oneOrTwoDir = "/twoPeices"
        }
        else{
            contentThem = JSON.parse(fs.readFileSync("Games/" + dir + '/onePeices' + ".json", 'utf8'))
            oneOrTwoDir = "/onePeices"
        }
        let boardIntel = JSON.parse(fs.readFileSync("Games/" + dir + "/boardInfo.json", 'utf8'));

        let boardPower = JSON.parse(fs.readFileSync("Games/" + dir + "/powerUp.json", 'utf8'));

        //console.log(boardIntel["width"])
        let turnNumber = fs.readFileSync("Games/" + dir + "/turnNumber.txt", 'utf8')
        let legal = legalMove(info, content, contentAll, contentThem, oneOrTwo, boardIntel["width"], boardIntel["height"], turnNumber, pillarChange) 
        if(legal == 1 || legal > 2){
            fs.writeFileSync("Games/" + dir + "/was.txt",   info.loc, function(err){if(err) throw err;})
            fs.writeFileSync("Games/" + dir + "/now.txt", info.moveSelected.x + " " + info.moveSelected.y , function(err){if(err) throw err;})

            fs.writeFileSync("Games/" + dir + "/peiceMoved.txt", contentAll[info.loc].name);
            let newTurn = parseInt(turnNumber) + 1
            fs.writeFileSync("Games/" + dir + '/turnNumber.txt', newTurn.toString());
            switch(legal){
                case 4:
                    if(contentThem[moveInfo.x + " " + moveInfo.y] != undefined){
                        if(contentThem[moveInfo.x + " " + moveInfo.y].name == "core"){
                            victory = true
                        } 
                        else if (contentThem[moveInfo.x + " " + moveInfo.y].pillar != undefined){
                            if(oneOrTwo == "one"){
                                //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                pillarChange--
                                fs.writeFileSync("Games/" + dir + "/twoPillar.txt", pillarChange.toString());
                            }
                            else{
                                //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                pillarChange--
                                fs.writeFileSync("Games/" + dir + "/onePillar.txt", pillarChange.toString());
                            }
                            
                        }
                    }
                    contentThem[moveInfo.x + " " + moveInfo.y] = undefined
                    contentAll[moveInfo.x + " " + moveInfo.y] = undefined
                    content[info.loc].lastMove = turnNumber
                    fs.writeFileSync("Games/" + dir + "/peiceMoved.txt", contentAll[info.loc].name + " s");
                    break
                case 5:
                    content[info.loc].lastMove = turnNumber
                    let where = info.loc.split(" ")
                    where[0] = parseInt(where[0])
                    where[1] = parseInt(where[1])
                    let one = ''
                    let two = ''
                    let three = ''
                    if(moveInfo.x - where[0] == 2){
                        one = (where[0] + 2) + " " + (where[1] + 1)
                        two = (where[0] + 2) + " " + (where[1] - 1)
                        three = (where[0] + 2) + " " + (where[1])
                    }
                    else if(moveInfo.x - where[0] == -2){
                        one = (where[0] - 2) + " " + (where[1] + 1)
                        two = (where[0] - 2) + " " + (where[1] - 1)
                        three = (where[0] - 2) + " " + (where[1])
                    }
                    else if(moveInfo.y - where[1] == -2){
                        one = (where[0] - 1) + " " + (where[1] - 2)
                        two = (where[0] + 1) + " " + (where[1] - 2)
                        three = (where[0]) + " " + (where[1] - 2)
                    }
                    else if(moveInfo.y - where[1] == 2){
                        one = (where[0] - 1) + " " + (where[1] + 2)
                        two = (where[0] + 1) + " " + (where[1] + 2)
                        three = (where[0]) + " " + (where[1] + 2)
                    }
                    
                    
                    if(contentThem[one] != undefined){
                        if(contentThem[one].name == "core"){
                            victory = true
                        } 
                    }
                    if(contentThem[two] != undefined){
                        if(contentThem[two].name == "core"){
                            victory = true
                        } 
                    }
                    if(contentThem[three] != undefined){
                        if(contentThem[three].name == "core"){
                            victory = true
                        } 
                    }
                    
                    
                    if(contentThem[one] != undefined){
                        if(contentThem[one].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (contentThem[one].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", pillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", pillarChange.toString());
                                    }
                                
                                }  
                                contentThem[one] = undefined
                                contentAll[one] = undefined      
                            }
                    }
                    if(content[one] != undefined){
                        if(content[one].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (content[one].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", selfPillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", selfPillarChange.toString());
                                    }
                                
                                }  
                                content[one] = undefined
                                contentAll[one] = undefined      
                            }
                    }

                    if(contentThem[two] != undefined){
                        if(contentThem[two].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (contentThem[two].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", pillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", pillarChange.toString());
                                    }
                                
                                }  
                                contentThem[two] = undefined
                                contentAll[two] = undefined      
                            }
                    }
                    if(content[two] != undefined){
                        if(content[two].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (content[two].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", selfPillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", selfPillarChange.toString());
                                    }
                                
                                }  
                                content[two] = undefined
                                contentAll[two] = undefined      
                            }
                    }

                    if(contentThem[three] != undefined){
                        if(contentThem[three].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (contentThem[three].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", pillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        pillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", pillarChange.toString());
                                    }
                                
                                }  
                                contentThem[three] = undefined
                                contentAll[three] = undefined      
                            }
                    }
                    if(content[three] != undefined){
                        if(content[three].name == "core"){
                            //victory = true
                        } 
                        else 
                            {
                                if (content[three].pillar != undefined){
                                    if(oneOrTwo == "one"){
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/onePillar.txt", selfPillarChange.toString());
                                    }
                                    else{
                                        //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                        selfPillarChange--
                                        fs.writeFileSync("Games/" + dir + "/twoPillar.txt", selfPillarChange.toString());
                                    }
                                
                                }  
                                content[three] = undefined
                                contentAll[three] = undefined      
                            }
                    }
                    fs.writeFileSync("Games/" + dir + "/peiceMoved.txt", contentAll[info.loc].name + " s");
                    break
                default:
                    content[moveInfo.x + " " + moveInfo.y] = info.peice;
                    content[moveInfo.x + " " + moveInfo.y].first = false;
                    content[info.loc] = undefined
                    



                    if(contentThem[moveInfo.x + " " + moveInfo.y] != undefined){
                        if(contentThem[moveInfo.x + " " + moveInfo.y].name == "core"){
                            victory = true
                        }
                        else if (contentThem[moveInfo.x + " " + moveInfo.y].pillar != undefined){
                            if(oneOrTwo == "one"){
                                //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/twoPillar.txt", 'utf8'))
                                pillarChange--
                                fs.writeFileSync("Games/" + dir + "/twoPillar.txt", pillarChange.toString());
                            }
                            else{
                                //pillarChange = parseInt(fs.readFileSync("Games/" + dir + "/onePillar.txt", 'utf8'))
                                pillarChange--
                                fs.writeFileSync("Games/" + dir + "/onePillar.txt", pillarChange.toString());
                            }
                            
                        }
                        contentThem[moveInfo.x + " " + moveInfo.y] = undefined
                    }
                    if(legal == 3){
                        content[moveInfo.x + " " + moveInfo.y].lastMove = turnNumber
                        fs.writeFileSync("Games/" + dir + "/peiceMoved.txt", contentAll[info.loc].name + " s");
                    }
                    
                    contentAll[moveInfo.x + " " + moveInfo.y] = info.peice;
                    contentAll[info.loc] = undefined

                    if(legal == 6){
                        content[moveInfo.x + " " + moveInfo.y].name = "proven"
                        contentAll[moveInfo.x + " " + moveInfo.y].name = "proven";
                        fs.writeFileSync("Games/" + dir + "/peiceMoved.txt",  "proven s");
                    }

                    //This part deals with adding more time
                    if (boardPower[moveInfo.x + " " + moveInfo.y] == "time"){
                        if(oneOrTwo == 'one'){
                            fs.writeFileSync("Games/" + dir + "/oneTimeLeft.txt", "180000", function(err){if(err) throw err; })
                        }
                        else{
                            fs.writeFileSync("Games/" + dir + "/twoTimeLeft.txt", "180000", function(err){if(err) throw err; })
                        }
                        boardPower[moveInfo.x + " " + moveInfo.y] = undefined

                        possible_moves = {}
                    let powerUp = {}

                    let xLoc = moveInfo.x
                    let yLoc = moveInfo.y
                    let flippingPower = 1
                    if(oneOrTwo == "one"){
                        flippingPower = -1
                    }
                    let width = boardIntel["width"]
                    let height = boardIntel["height"]
                    let a = 1
                    for(let i = 1; i < 101; i++){
                        let yLoc = moveInfo.y + (a * flippingPower)
                        a += 1
                        if(yLoc > height - 1){
                            /*
                            if(height%2 == 0){
                                powerUp["0 " + height/2] = "time"
                                powerUp["0 " + (height/2 - 1)] = "time"
                            }
                            else{
                                powerUp["0 " + (height/2 + .5)] = "time"
                                powerUp["0 " + (height/2 - 1.5)] = "time"
                            }
                            */
                            xLoc += 1
                            if(height % 2 == 0){
                                yLoc = (height/2 - 1)
                            }
                            else{
                                yLoc = (height/2 - 1.5)
                            }
                            a = 1
                            if(xLoc > width - 1){
                                xLoc = 0
                            }
                        }
                        else if (yLoc < 0){
                            xLoc += 1
                            if(height % 2 == 0){
                                yLoc = (height/2)
                            }
                            else{
                                yLoc = (height/2 + .5)
                            }
                            a = 1
                            if(xLoc > width - 1){
                                xLoc = 0
                            }
                        }
                        
                        if(contentAll[xLoc + " " + yLoc] == undefined && boardPower[xLoc + " " + yLoc] == undefined){
                            boardPower[xLoc + " " + yLoc] = "time"
                            i = 2000
                        }
                    }
                    
                    /*
                    for(let i = 0; i < boardIntel["width"]; i++){
                        for(let j = 0; j < boardIntel["height"]; j++){
                            if(contentAll[i + " " + j] == undefined && boardPower[i + " " + j] == undefined){
                                possible_moves[i + " " + j] = "possible"
                            }
                        }
                    }

                    for(let i = 0; i < 1; i++){
                        let number = Object.keys(possible_moves).length
                        let tar = Math.floor(Math.random() * number);
                        //console.log(number)
                        let it = 0
                        for(key in possible_moves){
                            if(it == tar){
                                boardPower[key] = "time"
                                delete possible_moves[key]
                                it = number + 2
                            }
                            else{
                                it++
                            }
                        } 
                    }
                    
                    }
                    */
                }
                    //End of this part deals with time
                    break
                //content[info.loc].lastMove = turnNumber


            }
            fs.writeFileSync("Games/" + dir + directory + ".json", JSON.stringify(content));
            fs.writeFileSync("Games/" + dir + oneOrTwoDir + ".json", JSON.stringify(contentThem));
            fs.writeFileSync("Games/" + dir + "/peices.json", JSON.stringify(contentAll));



            fs.writeFileSync("Games/" + dir + "/powerUp.json", JSON.stringify(boardPower));
            
            let timeSince = parseInt(fs.readFileSync("Games/" + dir + "/timeSinceStart.txt", 'utf8'))
            //console.log(timeSince)
            //console.log("Here")
            if(oneOrTwo == 'one'){
                timeNow = Date.now()
                timeWaited = timeNow - timeSince
                timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/oneTimeLeft.txt", 'utf8'))
                timeLeftThem = parseInt(fs.readFileSync("Games/" + dir + "/twoTimeLeft.txt", 'utf8'))
                timeChange = timeLeft - timeWaited
                //console.log(timeWaited + "Time Since")
                fs.writeFileSync("Games/" + dir + "/oneTimeLeft.txt", timeChange.toString());
                //console.log(timeChange + "Change in time!")
                if(timeChange < 0){
                    defeat = true
                }
                fs.writeFileSync("Games/" + dir + '/turn.txt', 'two');
                timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/oneTimeLeft.txt", 'utf8'))
                fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", Date.now().toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
                
            }
            else{
                timeNow = Date.now()
                timeWaited = timeNow - timeSince
                timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/twoTimeLeft.txt", 'utf8'))
                timeLeftThem = parseInt(fs.readFileSync("Games/" + dir + "/oneTimeLeft.txt", 'utf8'))
                timeChange = timeLeft - timeWaited
                //console.log(timeChange)
                if(timeChange < 0){
                    defeat = true
                }
                fs.writeFileSync("Games/" + dir + "/twoTimeLeft.txt", timeChange.toString());
                fs.writeFileSync("Games/" + dir + '/turn.txt', 'one');
                timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/twoTimeLeft.txt", 'utf8'))
                fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", Date.now().toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
            }

            
        }
        else if(legal == 0){
            return {error: "Not A Legal Move"}
        }
        else if (legal == 2){
            return {error: "Still On Cooldown"}
        }
        //console.log(victory)
        if(victory == true){
            fs.appendFileSync("Games/" + dir + "/" + oneOrTwo + "wins.txt", "A", function(err){if(err) throw err;})
        }
        if(defeat){
            if(oneOrTwo == "one"){
                fs.appendFileSync("Games/" + dir + "/" + "twowins.txt", "A", function(err){if(err) throw err;})
            }
            else{
                fs.appendFileSync("Games/" + dir + "/" + "onewins.txt", "A", function(err){if(err) throw err;})
            }
        }
        
        //console.log(timeLeft)
        return {you: content, all:contentAll, them: contentThem, error:undefined, victory:victory, pillar:pillarChange, selfPillar:selfPillarChange, timeLeft:timeLeft, timeLeftThem:timeLeftThem, defeat: defeat, power:boardPower}
    }
    
    else{
        return {error: "Not Your Turn"}
    }
}
//End of make a move function

var moveSet = require("./peiceMovesetServer.js");
const { createCipheriv } = require('crypto');


//When you get a move, is it legit?
//1 means true for simple abilities, 0 means illegal move for simple abilities, 2 means that the endure ability is still on cooldown. 3 means that it's legal, but add a cooldown
//4 means that it is sling's special
//5 means that it is burst's special
//6 means that it is a mortal, which means that it could become proven
function legalMove(info, content, contentAll, contentThem, oneOrTwo, width, height, turnNumber, pillarChange){
    let res = moveSet.check(info, content, contentAll, contentThem, oneOrTwo, width, height, pillarChange)
    //console.log(res)
    //console.log(res)
    let answer = info.moveSelected.x + " " + info.moveSelected.y
    //console.log(answer + "Answer")
    //console.log(res)

    if(info.moveSelected.x < 0 || info.moveSelected.x >= width || info.moveSelected.y < 0 || info.moveSelected.y >= height){
        return 0
    }
    
    if(res.error != undefined){
        if(res.error == 404){
            return 0
        }
    }
    for(const key in res.simple){
        if(info.peice.name == "mortal"){
            if(oneOrTwo == 'one'){
                if(info.moveSelected.y == 0){
                    //console.log("triggereda")
                    return 6
                }
            }
            else{
                if(info.moveSelected.y == (height - 1)){
                    //console.log("triggereda")
                    return 6
                }
            }
        }

        if (key == (answer)){
            return 1
        }
    }
    if(res.endure != undefined){
        for(const key in res.endure){
            if (key == (answer)){
                let peiceInfo = contentAll[info.loc]
                //console.log("Triggered Endure Move")
                //console.log(info)
                //console.log(info.peice.lastMove)
                if(turnNumber - info.peice.lastMove > info.peice.rate){
                    if(res.special != undefined){
                        if(res.special == "sling"){
                            return 4
                        }
                        else if(res.special == "burst"){
                            
                            return 5
                        }
                    }
                    return 3
                }
                else{
                    return 2
                }
            }  
        }   
    }
    return 0
}
//End of When you get a move, is it legit?


//Is it thursday yet... I mean is it your turn yet?
app.post('/checkTurn', (req, res) => {
    info = req.body;
    //console.log(info)
    let infoToReturn = {}
    let lost = false
    let won = false
    let dir = info.room
    let was = "0 0"
    let now = "0 0"
    surrendered = false
    //console.log("turn checking")
    if(checkPass(info.oneOrTwo, info.pass, info.room)){
        
        if(!fs.existsSync("Games/" + info.room +  "/" + info.oneOrTwo + "wins.txt")){
            
            if(info.answer == true){
                fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", Date.now().toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
            }
            else{
                if(info.oneOrTwo == 'one'){
                    let timeSince = parseInt(fs.readFileSync("Games/" + dir + "/timeSinceStart.txt", 'utf8'))
                    timeNow = Date.now()
                    timeWaited = timeNow - timeSince
                    timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/twoTimeLeft.txt", 'utf8'))
                    timeChange = timeLeft - timeWaited
                    //console.log(timeChange + " Time LEft")
                    //console.log(timeChange)
                    if(isNaN(parseFloat(timeChange)) || timeChange < 0){
                        
                        won = true
                        //console.log("Trigged")
                        fs.appendFileSync("Games/" + dir + "/" + "onewins.txt", "A", function(err){if(err) throw err;})
                    }
                    fs.writeFileSync("Games/" + dir + "/twoTimeLeft.txt", timeChange.toString());
                    fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", timeNow.toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
                }
                else{
                        let timeSince = parseInt(fs.readFileSync("Games/" + dir + "/timeSinceStart.txt", 'utf8'))
                        timeNow = Date.now()
                        timeWaited = timeNow - timeSince
                        timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/oneTimeLeft.txt", 'utf8'))
                        //timeLeftThem = parseInt(fs.readFileSync("Games/" + dir + "/twoTimeLeft.txt", 'utf8'))
                        timeChange = timeLeft - timeWaited
                        //console.log(timeWaited + " Time Waited")
                        //console.log(timeLeft + " Time Left")
                        //console.log(timeChange + "TimeLeft!")
                        fs.writeFileSync("Games/" + dir + "/oneTimeLeft.txt", timeChange.toString());
                        //console.log(timeChange + " Time LEft")
                        //console.log(isNaN(parseFloat(timeChange)))
                        //console.log(timeChange)
                        if(isNaN(parseFloat(timeChange)) || timeChange < 0 ){
                            //console.log("youi should have won")
                            won = true
                            fs.appendFileSync("Games/" + dir + "/" + "twowins.txt", "A", function(err){if(err) throw err;})
                        }
                    // console.log(timeChange)
                        fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", timeNow.toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
                
                    
                    
                }
            }
        }
        else{
        won = true
            if(fs.existsSync("Games/" + info.room +  "/surrender.txt")){
                surrendered = true
            }
        }




        
        infoToReturn = getTurn(info)  

        
        
        if(info.oneOrTwo == 'one'){
            lost = fs.existsSync("Games/" + info.room +  "/two" + "wins.txt")
            //won = fs.existsSync("Games/" + info.room +  "/one" + "wins.txt")

        }
        else{
            lost = fs.existsSync("Games/" + info.room +  "/one" + "wins.txt")
            //won = fs.existsSync("Games/" + info.room +  "/two" + "wins.txt")
        }
        //console.log(won)

        
    peicePlayed = (fs.readFileSync("Games/" + dir + "/peiceMoved.txt", 'utf8'))
    res.json({
        peiceMoved: peicePlayed,
        you: infoToReturn.you,
        all: infoToReturn.all,
        them: infoToReturn.them,
        answer: infoToReturn.answer,
        lost : lost,
        won: won,
        pillar: infoToReturn.pillar,
        selfPillar: infoToReturn.selfPillar,
        timeLeft: infoToReturn.timeLeft,
        timeLeftThem: infoToReturn.timeLeftThem,
        power: infoToReturn.power,
        surrendered: surrendered,
        was:infoToReturn.was,
        now:infoToReturn.now
    })
}
else{
    res.json({
        error:"Password is wrong. either I am a bad programmer or you are trying to hack in. shame on you."
    })
}
});

function getTurn(info){
    let you = {}
    let them = {}
    let all = {}
    let power = {}
    let timeLeft = 2000000
    let timeLeftThem = 2000000
    was = "0 0"
    now = "0 0"
    answer = true
    pillarChange = 20
    pillarSelf = 20
    if(fs.readFileSync("Games/" + info.room + '/turn.txt',  'utf8') == info.oneOrTwo){
        if(info.oneOrTwo == 'one'){
            //console.log(fs.readFileSync("Games/" + info.room + '/onePeices' + ".json", 'utf8'))
            you = JSON.parse(fs.readFileSync("Games/" + info.room + '/onePeices' + ".json", 'utf8'))
            them = JSON.parse(fs.readFileSync("Games/" + info.room + '/twoPeices' + ".json", 'utf8'))
            all = JSON.parse(fs.readFileSync("Games/" + info.room + "/peices.json", 'utf8'));
            pillarChange = parseInt(fs.readFileSync("Games/" + info.room + "/twoPillar.txt", 'utf8'))
            pillarSelf = parseInt(fs.readFileSync("Games/" + info.room + "/onePillar.txt", 'utf8'))
            timeLeft = parseInt(fs.readFileSync("Games/" + info.room + "/oneTimeLeft.txt", 'utf8'))
            timeLeftThem = parseInt(fs.readFileSync("Games/" + info.room + "/twoTimeLeft.txt", 'utf8'))
            
        }
        else{
            pillarChange = parseInt(fs.readFileSync("Games/" + info.room + "/onePillar.txt", 'utf8'))
            you = JSON.parse(fs.readFileSync("Games/" + info.room + '/twoPeices' + ".json", 'utf8'))
            them = JSON.parse(fs.readFileSync("Games/" + info.room + '/onePeices' + ".json", 'utf8'))
            all = JSON.parse(fs.readFileSync("Games/" + info.room + "/peices.json", 'utf8'));
            pillarSelf = parseInt(fs.readFileSync("Games/" + info.room + "/twoPillar.txt", 'utf8'))
            timeLeft = parseInt(fs.readFileSync("Games/" + info.room + "/twoTimeLeft.txt", 'utf8'))
            timeLeftThem = parseInt(fs.readFileSync("Games/" + info.room + "/oneTimeLeft.txt", 'utf8'))
        }
        was = fs.readFileSync("Games/" + info.room + "/was.txt", 'utf8')
        now = fs.readFileSync("Games/" + info.room + "/now.txt", 'utf8')
        power = JSON.parse(fs.readFileSync("Games/" + info.room + '/powerUp.json', 'utf8'))
        return{you:you, them:them, all:all, answer: answer, pillar:pillarChange, selfPillar: pillarSelf, timeLeft:timeLeft, timeLeftThem: timeLeftThem, power:power, was:was, now:now}
    }
    else{
        answer = false
        return{you:you, them:them, all:all, answer: answer, pillar:pillarChange, selfPillar: pillarSelf, timeLeft:timeLeft, timeLeftThem: timeLeftThem, power:power, was:was, now:now}
    }
}
//End of is it thursday yet... I mean is it your turn yet?



//Has an opponet been found?
app.post('/foundOpponet', (req, res) => {
    
    dir = req.body.room;
    //console.log(req.body)
    let info = checkOpponet(dir)
    let boardInfo = null
    
    if(info){
        res.json({
            found : info,
            boardInfo : BoardLayout(dir),
            board: Board(dir)
        })
    }
    else{
        res.json({
            found : info
        })
    }
   
});
//End of has an opponet been found?

function haveYouLost(dir){
    let timeLeft = 0
    //dir = dir
    //console.log(dir)
    room = dir.room
    if(!fs.existsSync("Games/" + room +  "/surrender.txt")){
        if(dir.oneOrTwo == "one"){
            timeLeft = parseInt(fs.readFileSync("Games/" + room + "/oneTimeLeft.txt", 'utf8'))
            //console.log(timeLeft)
            if(timeLeft < 0 || isNaN(parseFloat(timeLeft))){
                return true
            }
            else{
                return false
            }
            //return timeLeft < 0
        }
        else{
            timeLeft = parseInt(fs.readFileSync("Games/" + room + "/twoTimeLeft.txt", 'utf8'))
            //console.log(timeLeft)
            if(timeLeft < 0 || isNaN(parseFloat(timeLeft))){
                return true
            }
            else{
                return false
            }
        }
    }
    else{
        return "surrendered"
    }
}

//Has the player lost yet?
app.post('/didYouLose', (req, res) => {
    
    dir = req.body.room;
    info = req.body
    //console.log(req.body)
    //let info = checkOpponet(dir)
    //let boardInfo = null
    if(checkPass(info.oneOrTwo, info.pass, info.room)){
        //console.log("Passed")
        didYou = haveYouLost(info)
        //console.log(didYou)
        res.json({
            didYouLostYet: didYou
        })

    }
    else{
        res.json({
            error: "Wrong password detected. Either I am a bad programmer or you are trying to hack into the system. Shame on you :("
        })
    }
   
});
//End of has the player lost yet?


//Quick Rejoin
app.post('/rejoin', (req, res) => {    
    //console.log("trig")
    dir = req.body.room;
    info = req.body
    //console.log(req.body)
    //let info = checkOpponet(dir)
    //let boardInfo = null
    try{
        if(checkPass(info.oneOrTwo, info.pass, info.room)){
            let rejoinInfo = {}
            try{
                rejoinInfo = rejoin(info)
            }
            catch{
                rejoinInfo.inGame = false
            }
            //console.log(rejoinInfo)
            res.json({
                information: rejoinInfo
            })
    
        }
        else{
            res.json({
                error: "Wrong password detected. Either I am a bad programmer or you are trying to hack into the system. Shame on you :("
            })
        }
    }
    catch{
        res.json({
            inGame: false
        })
    }
   
});

function rejoin(info){
    dir = info.room
    inGame = true
    let disconnected = false
    if(fs.existsSync("Games/" + dir + "/disconnected.txt")){
        //console.log(dir)
        disconnected = true
        return {disconnected: true}
    }
    oneOrTwo = info.oneOrTwo
    flipped = flip(oneOrTwo)
    let peicesYou
    let peicesAll
    let timeLeft
    let peicesThem 
    let timeLeftThem 
    let board 
    let powers 
    let victory = false 
    let defeat = false
    let width
    let turn
    let height
    let pillarsYou
    let pillarsThem
    try{
        peicesYou = JSON.parse(fs.readFileSync("Games/" + dir + '/' + oneOrTwo + 'Peices.json', 'utf8'))
        peicesAll = JSON.parse(fs.readFileSync("Games/" + dir + '/' + flipped + 'Peices.json', 'utf8'))
        timeLeft = parseInt(fs.readFileSync("Games/" + dir + "/" + oneOrTwo +"TimeLeft.txt", 'utf8'))
        peicesThem = JSON.parse(fs.readFileSync("Games/" + dir + '/' + flipped + 'Peices.json', 'utf8'))
        timeLeftThem = parseInt(fs.readFileSync("Games/" + dir + "/" + flipped +"TimeLeft.txt", 'utf8'))
        board = JSON.parse(fs.readFileSync("Games/" + dir + '/boardInfo.json', 'utf8'))
        width = board.width
        height = board.height
        powers = JSON.parse(fs.readFileSync("Games/" + dir + '/powerUp.json', 'utf8'))
        victory =  fs.existsSync("Games/" + dir + "/" + oneOrTwo +  "wins.txt")
        defeat = fs.existsSync("Games/" + dir + "/" + flipped +  "wins.txt")
        pillarsYou = fs.readFileSync("Games/" + dir + '/' + oneOrTwo + 'Pillar.txt', 'utf8')
        pillarsThem = fs.readFileSync("Games/" + dir + '/' + flipped + 'Pillar.txt', 'utf8')
        
        turn = fs.readFileSync("Games/" + dir + '/turn.txt', 'utf8')
        turnNumber = fs.readFileSync("Games/" + dir + '/turnNumber.txt', 'utf8')
        console.log(turn)

        
    }
    catch{
        inGame = false
    }
    return {you: peicesYou, all:peicesAll, them:peicesThem, timeLeft:timeLeft, timeLeftThem: timeLeftThem, height: height, width:width, power:powers, victory:victory, defeat:defeat, inGame: inGame, turn:turn, pillarsYou:pillarsYou, pillarsThem:pillarsThem, turnNumber:turnNumber, disconnected:disconnected}
}

function flip(oneOrTwo){
    if(oneOrTwo == "one"){
        return "two"
    }
    return "one"
}

//End of Quick Rejoin




//Check Security
function checkPass(player, pass, dir){
    if(player == 'one'){
        if(fs.readFileSync("Games/" + dir + "/playerOne.txt", 'utf8') == pass){
            return true
        }
        else{
            return false
        }
    }
    else{
        //console.log(fs.readFileSync("Games/" + dir + "/playerTwo.txt", 'utf8'))
        if(fs.readFileSync("Games/" + dir + "/playerTwo.txt", 'utf8') == pass){
            return true
        }
        else{
            return false
        }
    }
}
//End of check security



function Board(dir){
    let dataOne = {}
    let dataTwo = {}
    let dataAll = {}
    try {
        dataOne = fs.readFileSync("Games/" + dir + "/onePeices.json", 'utf8');
        dataTwo = fs.readFileSync("Games/" + dir + "/twoPeices.json", 'utf8');
        dataAll = fs.readFileSync("Games/" + dir + "/peices.json", 'utf8');
        dataPower = fs.readFileSync("Games/" + dir + "/powerUp.json", 'utf8');
      } catch (err) {
        console.error(err);
    }
    return {one: dataOne, two:dataTwo, all:dataAll, power:dataPower}
}

function BoardLayout(dir){
    let data = {}
    try {
        data = fs.readFileSync("Games/" + dir + "/boardInfo.json", 'utf8');
        
      } catch (err) {
        console.error(err);
    }
    return data
}
//Has a second player joined?
function checkOpponet(dir){
    if (fs.existsSync("Games/" + dir + "/playerTwo.txt")) { 
        //fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", Date.now().toString(), err => {if (err) {console.log('Error writing file', err)} else {}})
        return true
      }
      else{
        let time = new Date().getTime()
        fs.writeFileSync("Games/" + dir + "/waitingRoomQuickPlay.txt",  time.toString(), function(err){if(err) throw err;})
        return false
      }
}
//End of has a second player joined





//This creates a password that proves the player making the move is who they say they are
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
//End of This creates a password that proves the player making the move is who they say they are

//Is this a valid username?
function validRoom(room) {
    let validChar = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '1','2','3','4','5','6','7','8','9','0','-']
    if(room.length < 5){
        return "too short (atleast 5 characters)"
    }
    else if(room.length > 10){
        return "too long (no more than 10 characters)"
    }
    for(char of room){
        let good = false
        for (valid of validChar) {
            if(valid == char.toLowerCase()){
                good = true
                break
            }
        }
        if(!good){
            //console.log(char)
            return "Don't Use Special Characters"
        }
    }
    //console.log("Return true")
    return true;
}
//End of Is this a valid username

function randomPeice(num){
    switch(num){
        case 1:
            return {name:"sling", lastMove:-10, rate: 7}
            break
        case 2:
            return {name:"restless", lastMove:-10, rate: 5}
            break
        case 3:
            return {name:"horses" }
            break
        case 4:
            return {name:"bishop" }
            break
        case 5:
            return {name:"burst", lastMove:-10, rate: 9}
            break
        case 6:
            return {name:"guardian", lastMove:-10, rate: 3}
            break
        case 7:
            return {name:"rook" }
            break
        case 8:
            return {name:"glider"}
            break
    }
}



function startGame(dir){
    //the current board
    const listOfOnePeices = {};
    const listOfTwoPeices = {};
    const listOfEveryone = {};
    //End of the current board
    //console.log("Game Started")
    //console.log(dir)
    width = Math.floor(Math.random() * 3 + 6);
    height = Math.floor(Math.random() * 5 + 6);
    const boardInfo = {
        width: width,
        height: height
    }
    const jsonString = JSON.stringify(boardInfo)
    fs.writeFileSync("Games/" + dir + "/boardInfo.json", jsonString, err => {if (err) {console.log('Error writing file', err)} else {}})

    //console.log("Still working!")
    //This part creates the board with the peices
    for(let i = 0; i < width; i++){
        listOfEveryone[i + " " + (height - 2)] = {name: "mortal", first:true}
        listOfOnePeices[i + " " + (height - 2)] = {name: "mortal", first:true}
        listOfEveryone[i + " " + 1] =  {name:"mortal", first:true}
        listOfTwoPeices[i + " " + 1] = {name:"mortal", first:true}
    }
    let peicesAdded = {}
    let peiceToAdd = {}
    for (let i = 0; i < (width/2); i++){
        let unique = false
        while(unique == false){
            num = Math.floor(Math.random() * 8 + 1)
            peiceToAdd = randomPeice(num)
            unique = true
            if(peicesAdded[num] != undefined){
                unique = false
            }
            peicesAdded[num] = true 
        }
        //console.log(peiceToAdd)
        listOfEveryone[i + " " + 0] = peiceToAdd
        listOfTwoPeices[i + " " + 0] = peiceToAdd
        listOfEveryone[i + " " + (height - 1)]  = peiceToAdd
        listOfOnePeices[i + " " + (height - 1)] = peiceToAdd

        listOfEveryone[(width - i - 1) + " " + 0] = peiceToAdd
        listOfTwoPeices[(width - i - 1) + " " + 0] = peiceToAdd
        listOfEveryone[(width - i - 1) + " " + (height - 1)]  = peiceToAdd
        listOfOnePeices[(width - i - 1) + " " + (height - 1)] = peiceToAdd

        if(i == 0){      
            /* 
            //Test Code For New Peices
                listOfEveryone[i + " " + 0].name = "proven"
                listOfTwoPeices[i + " " + 0].name = "proven"
                listOfEveryone[i + " " + (height - 1)].name  = "proven"
                listOfOnePeices[i + " " + (height - 1)].name = "proven"

                listOfEveryone[(width - i - 1) + " " + 0].pillar = "proven"
                listOfTwoPeices[(width - i - 1) + " " + 0].pillar = "proven"
                listOfEveryone[(width - i - 1) + " " + (height - 1)].pillar  = "proven"
                listOfOnePeices[(width - i - 1) + " " + (height - 1)].pillar = "proven"
            */

            listOfEveryone[i + " " + 0].pillar = true
            listOfTwoPeices[i + " " + 0].pillar = true
            listOfEveryone[i + " " + (height - 1)].pillar  = true
            listOfOnePeices[i + " " + (height - 1)].pillar = true

            listOfEveryone[(width - i - 1) + " " + 0].pillar = true
            listOfTwoPeices[(width - i - 1) + " " + 0].pillar = true
            listOfEveryone[(width - i - 1) + " " + (height - 1)].pillar  = true
            listOfOnePeices[(width - i - 1) + " " + (height - 1)].pillar = true
        }
    }
    listOfEveryone[Math.floor(width/2) + " " + 0] = {name:'core'}
    listOfTwoPeices[Math.floor(width/2) + " " + 0] = {name:'core'}
    listOfEveryone[Math.floor(width/2) + " " + (height - 1)]  = {name:'core'}
    listOfOnePeices[Math.floor(width/2) + " " + (height - 1)] = {name:'core'}

    /*
    listOfEveryone[1 + " " + 0] = {name:"glider"}
    listOfTwoPeices[1 + " " + 0] = {name:"glider"}
    listOfEveryone[1 + " " + (height - 1)]  = {name:"glider"}
    listOfOnePeices[1 + " " + (height - 1)] = {name: "glider"}

    listOfEveryone[0 + " " + 0] = {name:"restless", lastMove:-10, rate: 5}
    listOfTwoPeices[0 + " " + 0] = {name:"restless", lastMove:-10, rate: 5}
    listOfEveryone[0 + " " + (height - 1)]  = {name:"restless", lastMove:-10, rate: 5}
    listOfOnePeices[0 + " " + (height - 1)] = {name: "restless", lastMove:-10, rate: 5}

    listOfEveryone[2 + " " + 0] = {name:"horses" }
    listOfTwoPeices[2 + " " + 0] = {name:"horses"}
    listOfEveryone[2 + " " + (height - 1)]  = {name:"horses"}
    listOfOnePeices[2 + " " + (height - 1)] = {name: "horses"}
    
    listOfEveryone[3 + " " + 0] = {name:"bishop" }
    listOfTwoPeices[3 + " " + 0] = {name:"bishop"}
    listOfEveryone[3 + " " + (height - 1)]  = {name:"bishop"}
    listOfOnePeices[3 + " " + (height - 1)] = {name: "bishop"}
    
    listOfEveryone[3 + " " + 0] = {name:"burst", lastMove:-10, rate: 5}
    listOfTwoPeices[3 + " " + 0] = {name:"burst", lastMove:-10, rate: 5}
    listOfEveryone[3 + " " + (height - 1)]  = {name:"burst", lastMove:-10, rate: 5}
    listOfOnePeices[3 + " " + (height - 1)] = {name: "burst", lastMove:-10, rate: 5}

    listOfEveryone[4 + " " + 0] = {name:"guardian", lastMove:-10, rate: 3}
    listOfTwoPeices[4 + " " + 0] = {name:"guardian", lastMove:-10, rate: 3}
    listOfEveryone[4 + " " + (height - 1)]  = {name:"guardian", lastMove:-10, rate: 3}
    listOfOnePeices[4 + " " + (height - 1)] = {name: "guardian", lastMove:-10, rate: 3}

    listOfEveryone[5 + " " + 0] = {name:"rook" }
    listOfTwoPeices[5 + " " + 0] = {name:"rook"}
    listOfEveryone[5 + " " + (height - 1)]  = {name:"rook"}
    listOfOnePeices[5 + " " + (height - 1)] = {name: "rook"}

    listOfEveryone[6 + " " + 0] = {name:"sling", lastMove:-10, rate: 7}
    listOfTwoPeices[6 + " " + 0] = {name:"sling", lastMove:-10, rate: 7}
    listOfEveryone[6 + " " + (height - 1)]  = {name:"sling",lastMove:-10, rate: 7}
    listOfOnePeices[6 + " " + (height - 1)] = {name: "sling",lastMove:-10, rate: 7}
    */
    possible_moves = {}
    let powerUp = {}

    if(height%2 == 0){
        powerUp["0 " + height/2] = "time"
        powerUp["0 " + (height/2 - 1)] = "time"
    }
    else{
        powerUp["0 " + (height/2 + .5)] = "time"
        powerUp["0 " + (height/2 - 1.5)] = "time"
    }

    /*
    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            if(listOfEveryone[i + " " + j] == undefined){
                possible_moves[i + " " + j] = "possible"
            }
        }
    }

    for(let i = 0; i < 2; i++){
        let number = Object.keys(possible_moves).length
        let tar = Math.floor(Math.random() * number);
        //console.log(number)
        let it = 0
        for(key in possible_moves){
            if(it == tar){
                powerUp[key] = "time"
                delete possible_moves[key]
                it = number + 2
            }
            else{
                it++
            }
        } 
    }
    */
    //console.log(listOfOnePeices)
    //console.log(listOfTwoPeices)
    const powerUpJSON = JSON.stringify(powerUp)
    fs.writeFileSync("Games/" + dir + "/powerUp.json", powerUpJSON, err => {if (err) {console.log('Error writing file', err)} else { }})
    const oneJSON = JSON.stringify(listOfOnePeices)
    fs.writeFileSync("Games/" + dir + "/onePeices.json", oneJSON, err => {if (err) {console.log('Error writing file', err)} else { }})
    const twoJSON = JSON.stringify(listOfTwoPeices)
    fs.writeFileSync("Games/" + dir + "/twoPeices.json", twoJSON, err => {if (err) {console.log('Error writing file', err)} else { }})
    const allJSON = JSON.stringify(listOfEveryone)
    fs.writeFileSync("Games/" + dir + "/peices.json", allJSON, err => {if (err) {console.log('Error writing file', err)} else { }})
    fs.writeFileSync("Games/" + dir + "/onePillar.txt", "2", function(err){if(err) throw err; })
    fs.writeFileSync("Games/" + dir + "/twoPillar.txt", "2", function(err){if(err) throw err; })
    fs.writeFileSync("Games/" + dir + "/oneTimeLeft.txt", "180000", function(err){if(err) throw err; })
    fs.writeFileSync("Games/" + dir + "/twoTimeLeft.txt", "180000", function(err){if(err) throw err; })

    return {width: width, height: height, one:listOfOnePeices, two:listOfTwoPeices, all: listOfEveryone, power:powerUp}
}




//Actual Join
function joinGame(dir){
    //console.log(dir)
    try {
        //console.log(!fs.existsSync("Games/" + dir))
        if (!fs.existsSync("Games/" + dir)) {
            fs.mkdirSync("Games/" + dir);
            let key = makeid(5);
            fs.writeFileSync("Games/" + dir + "/playerOne.txt", key, function(err){if(err) throw err;})
            let time = new Date().getTime()
            //fs.appendFileSync("Games/" + dir + "/playerOneLastTime.txt", time + '', function(err){if(err) throw err;})
            fs.appendFileSync("Games/" + dir + "/turn.txt",  'one' , function(err){if(err) throw err;})
            fs.writeFileSync("Games/" + dir + "/waitingRoomQuickPlay.txt",  time.toString() , function(err){if(err) throw err;})
            fs.appendFileSync("Games/" + dir + "/boardInfo.json", '', function(err){if(err) throw err; })
            fs.appendFileSync("Games/" + dir + "/onePeices.json", '', function(err){if(err) throw err; })
            fs.appendFileSync("Games/" + dir + "/peices.json", '', function(err){if(err) throw err; })
            fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", time.toString())
            fs.writeFileSync("Games/" + dir + "/peiceMoved.txt", "");
            fs.appendFileSync("Games/" + dir + "/was.txt",  '0 0' , function(err){if(err) throw err;})
            fs.appendFileSync("Games/" + dir + "/now.txt",  '0 0' , function(err){if(err) throw err;})
            return {key: key, whichplayer: 'one'}
        }
        else if (!fs.existsSync("Games/" + dir + "/playerTwo.txt")){
            getBoard = startGame(dir)
            //console.log(getBoard)
            let key = makeid(5);
            fs.appendFileSync("Games/" + dir + "/playerTwo.txt", key, function(err){if(err) throw err; })
            let time = Date.now()
            fs.writeFileSync("Games/" + dir + "/timeSinceStart.txt", time.toString())
            //fs.appendFileSync("Games/" + dir + "/playerTwoLastTime.txt", time + '', function(err){if(err) throw err; })
            fs.appendFileSync("Games/" + dir + "/twoPeices.json", '', function(err){if(err) throw err; })
            fs.appendFileSync("Games/" + dir + "/turnNumber.txt", "0", function(err){if(err) throw err; })
            //fs.appendFileSync("Games/" + dir + "/turnNumber.txt", "0", function(err){if(err) throw err; })
            return {key: key, whichplayer: 'two', width:getBoard.width, height:getBoard.height, one: getBoard.one, two:getBoard.two, all:getBoard.all, yourTime: 180000, theirTime:180000, power:getBoard.power}
        }
        else{
            return {error:'full'}
        }
    } catch (err) {console.error(err);}
}
//End of Actual Join

//This deletes all the finished games
var minutes = 60, the_interval = minutes * 60 * 1000;
setInterval(function() {
    //console.log("triggered")
    fs.readdir("Games", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        //console.log(files)
        for(let i = 0; i < files.length; i++){
            try{
                timeSinceLast = parseInt(fs.readFileSync("Games/" + files[i] + "/timeSinceStart.txt", 'utf8'))
                if((Date.now() - timeSinceLast) > 6000000){
                    console.log("deleted " + files[i])
                    fs.rmSync("Games/" + files[i], { recursive: true, force: true });
                }
            }
            catch{

            }
            //if("Games/" + files[i] + )
        }
    });
  // do your stuff here
}, the_interval);
//End of this deletes all the finished games


//What are we listening on?
app.listen(8080)





