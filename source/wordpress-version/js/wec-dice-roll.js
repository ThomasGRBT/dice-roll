// GLOBAL VARIABLES AND CONSTANTS
    // Do not change variables (yet)
    const diceMaxNumber = 6;

    let lastNumber = 3; // equal to the starting face
    let lastXRotation = 0;
    let lastYRotation = 0;

    let rotationDirection = "";

    // You can tune these ones
    const arbitraryMaxXTurnNumber = 4;
    const arbitraryMaxYTurnNumber = arbitraryMaxXTurnNumber; // Could be change
    const arbitraryMaxNullTurnNumber = 3;

    // You will be interested in these one to be displayed in your HTML
    let resultBoard = []
    let score = 0

// CREATE DOM DICE ELEMENT
function createDice(diceLength, parentElem, optButton) {

    for ( i = 1; i <= diceLength; i++) {

        const newDiceWrapper = document.createElement("div");
            newDiceWrapper.classList.add("dice-wrapper");

        const newDice = document.createElement("div");
            let diceId = "dice-"+i;
            newDice.setAttribute("id", diceId);
            newDice.classList.add("dice");

        // faces
        for ( j = 1; j <= 6 ; j++ ) {
            let newFace = document.createElement("div");
                newFace.classList.add("face", "face-"+j);
            
            let newFaceContent = document.createElement("div");
                newFaceContent.classList.add("face-content")
                newFaceContent.innerHTML = j;

            let newFaceInner = document.createElement("div");
                newFaceInner.classList.add("face", "face-inner", "face-inner-"+j)
                
                newDice.appendChild(newFace);
                    newFace.appendChild(newFaceContent);
                    newDice.insertBefore(newFaceInner, newFace);
        }
        
        // append dice to a parent
        parentElem.appendChild(newDiceWrapper);
            newDiceWrapper.appendChild(newDice);

        // optional : add button
        if ( optButton ) {
            createRollButton("dice-btn-one", "dice-"+i, myDiceBoard);
        }

        newDice.addEventListener("click", function() {
            rollDice(diceId);
        });
    }     
}

// COUNT HOW MANY DICE
function getDiceList() {
    let diceList = document.querySelectorAll(".dice");
    return diceList;
}

// CREATE DOM BUTTON ELEMENT
function createRollButton(buttonId, diceId, parentElem) {

     const newButton = document.createElement("button");
        newButton.setAttribute("id", buttonId);
        newButton.classList.add("dice-btn");
        newButton.innerHTML = "Let's Roll !!"

    newButton.addEventListener("click", function() {
            rollDice(diceId);
        });

    parentElem.appendChild(newButton);
}

// CREATE DOM BUTTON ELEMENT TO ROLL ALL DICES
function createRollAllButton(buttonId, parentElem) {

    const newButton = document.createElement("button");
       newButton.setAttribute("id", buttonId);
       newButton.classList.add("dice-btn");
       newButton.innerHTML = "Roll The Dice!"

       let diceList = getDiceList();

   newButton.addEventListener("click", function() {
        for ( k = 0 ; k < diceList.length ; k++ ) {
            let thisDiceId = diceList[k].getAttribute("id");
            rollDice(thisDiceId);
        } 
   });

   parentElem.appendChild(newButton);
}

// BASIC RANDOM MATH FUNCTION
function randomMinMax(min, max) {
    return  Math.floor(Math.random() * (max - min + 1) + min );
}

// LET'S ROLLE THE DICE !
function rollDice(diceId) {

    let elem = document.getElementById(diceId);

    let randomNumber = randomMinMax(1, diceMaxNumber);
    let diceResult = randomNumber;
    let totalResult = 0;

    let randomBoolean = randomMinMax(0, 1);
    if ( randomBoolean === 0 ) {
        rotationDirection = "-"
    } else {
        rotationDirection = ""
    }

    let randomXTurns = randomMinMax(1, arbitraryMaxXTurnNumber);
    let randomXTurnsDegree = randomXTurns * 360;

    let randomYTurns = randomMinMax(1, arbitraryMaxYTurnNumber);
    let randomYTurnsDegree = randomYTurns * 360;

    let quarterXDegree = 90 + randomXTurnsDegree;
    let quarterYDegree = 90 + randomYTurnsDegree;

    let randomNullTurns = randomMinMax(0, arbitraryMaxNullTurnNumber);
    let rotateFullTurnsOrNothing = randomNullTurns * 360;

    // not used, but .. well, could be
    // let halfXDegree = 180 + randomXTurnsDegree;

    let halfYDegree = 180 + randomYTurnsDegree;

    switch (randomNumber) {
        case 1:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                quarterXDegree = lastXRotation + 360;                
            }
            elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree +"deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing+"deg)";
            lastNumber = 1;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        case 2:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                quarterYDegree = lastYRotation + 360;                
            }
            elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(-" + quarterYDegree + "deg)";
            lastNumber = 2;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 3:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                quarterXDegree = lastXRotation + randomXTurnsDegree;
                quarterYDegree = lastYRotation + randomYTurnsDegree;
                elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree + "deg) rotateY(" + quarterYDegree + "deg)";
                lastXRotation = quarterXDegree;
                lastYRotation = quarterYDegree;
            } else {
                elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing + "deg)";
                lastXRotation = 0;
                lastYRotation = 0;
            }
            lastNumber = 3;
            break;
        case 4:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {          
                halfYDegree = lastYRotation + 360;              
            }
            elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + halfYDegree + "deg)";
            lastNumber = 4;
            lastXRotation = 0;
            lastYRotation = halfYDegree;
            break;
        case 5:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {            
                quarterYDegree = lastYRotation + 360;              
            }
            elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX("+rotateFullTurnsOrNothing+"deg) rotateY(" + quarterYDegree + "deg)";
            lastNumber = 5;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 6:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {            
                quarterXDegree = lastXRotation + 360;              
            }
            elem.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(-" + quarterXDegree +"deg) rotateY("+rotateFullTurnsOrNothing+"deg)";
            lastNumber = 6;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        default:
            console.log("error");
            break;
    }

    // Gather Results
    let splittedId = diceId.split("dice-");  
    let diceIdNumber = parseInt(splittedId[1])
    resultBoard[diceIdNumber-1] = randomNumber;

    for ( m = 0; m < resultBoard.length ; m++ ) {
        // when having multiple dices and rolling a dice that is not the first in the list, the sum may have a NaN
        if ( typeof resultBoard[m] === "undefined" ) {
            resultBoard[m] = 0;
        }
        totalResult = totalResult + resultBoard[m];
    }

    score = totalResult;

    console.log("Result Board: " + resultBoard)
    console.log("Score: " + score)

}

// ADD THE DICE(S)
let myDiceBoard = document.getElementById('wec-dice-roll-container');

createDice(2, myDiceBoard, false);
createRollAllButton("my-button", myDiceBoard);
