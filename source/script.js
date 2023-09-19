// GLOBAL VARIABLES AND CONSTANTS
    // Do not change variables (yet)
    const diceMaxNumber = 6;

    let lastNumber = 3; // equal to the starting face
    let lastXRotation = 0;
    let lastYRotation = 0;

    let rotationDirection = "";

    // You can tune these ones
    const myDiceBoard = document.getElementById('wec-dice-roll-container');
    const arbitraryMaxXTurnNumber = 4;
    const arbitraryMaxYTurnNumber = arbitraryMaxXTurnNumber; // Could be change
    const arbitraryMaxNullTurnNumber = 3;

    // You will be interested in these one to be displayed in your HTML
    let resultBoard = []
    let score = 0

// CREATE DOM DICE ELEMENT
function createDice(diceLength, parentElem, optButton, optScore) {

    for ( i = 1; i <= diceLength; i++) {

        resultBoard.length = diceLength;

        const newDiceWrapper = document.createElement("div");
            newDiceWrapper.classList.add("dice-wrapper");

        const newDice = document.createElement("div");
            let diceId = "dice-"+i;
            newDice.setAttribute("id", diceId);
            newDice.classList.add("dice");
            newDice.classList.add("disable");

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

        // optional : show individual score
        if ( optScore ) {
            newDice.classList.add('show-dice-score');

            const newDiceScore = document.createElement("p");
                newDiceScore.classList.add('dice-score');
                newDiceScore.innerHTML = "Score: 0";
                newDiceWrapper.appendChild(newDiceScore);
        }

        // Set Animation
        newDice.addEventListener("click", function() {
            myDiceBoard.classList.remove('roll-all');
            rollDice(diceId, true, true);
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
            rollDice(diceId, true, true);
        });

    parentElem.appendChild(newButton);
}

// CREATE DOM BUTTON ELEMENT TO ROLL ALL DICES
function createRollAllButton(buttonId, parentElem, optScore) {

    const newButton = document.createElement("button");
       newButton.setAttribute("id", buttonId);
       newButton.classList.add("dice-btn");
       newButton.innerHTML = "Roll The Dice!"

       let diceList = getDiceList();

   newButton.addEventListener("click", function() {
        for ( k = 0 ; k < diceList.length ; k++ ) {
            let thisDiceId = diceList[k].getAttribute("id");
            myDiceBoard.classList.add('roll-all');
            rollDice(thisDiceId, false, false);
        }

   });

   parentElem.appendChild(newButton);

   // optional : show individual score
   if ( optScore ) {
    parentElem.classList.add('show-total-score');

    const newTotalDiceScore = document.createElement("p");
        newTotalDiceScore.classList.add('dice-score-total');
        newTotalDiceScore.innerHTML = "Total score: 0";
        parentElem.appendChild(newTotalDiceScore);
    }
}

// BASIC RANDOM MATH FUNCTION
function randomMinMax(min, max) {
    return  Math.floor(Math.random() * (max - min + 1) + min );
}

// LET'S ROLLE THE DICE !
function rollDice(diceId, optDisable, optNoSum) {

    let theDice = document.getElementById(diceId);

    // LIST ALL SIBLINGS
    let theDiceParent = theDice.parentElement;
    let theDiceParentSiblings = [];
    let theDiceParentSibling = theDiceParent.parentNode.firstChild;

        if(!theDiceParent.parentNode) {
            theDiceParentSiblings = [];
        }

        while (theDiceParentSibling) {
            if(theDiceParentSibling.nodeType === 1 && theDiceParentSibling !== theDiceParent) {
                theDiceParentSiblings.push(theDiceParentSibling);
            }
            theDiceParentSibling = theDiceParentSibling.nextSibling;
        }

    // OPTION: Visually disable other dice when rolling just one among many
    if ( optDisable ) {
        // TRUE : Used when clicking just one dice
        for ( g = 0 ; g < theDiceParentSiblings.length ; g ++) {

            let siblingDice = theDiceParentSiblings[g].getElementsByClassName('dice')[0];

            if ( typeof siblingDice !== 'undefined' ) {
                siblingDice.classList.add('disable');
            }  
        }

        theDice.classList.remove('disable');
    } else {
        // FALSE: Used when clicking the Roll All Dice button
        theDice.classList.remove('disable');
    }

    // OPTION: When rolling just one dice, reset all the others so the sum is equal to this dice result
    if ( optNoSum ) {
        for ( h = 0 ; h < theDiceParentSiblings.length ; h ++) {

            console.log(resultBoard[h]);

            if ( typeof siblingDice !== 'undefined' ) {
                
            }  
        }

    } else {

    }

    // CORE RANDOM
    let randomNumber = randomMinMax(1, diceMaxNumber);
    let diceResult = randomNumber;

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
            theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree +"deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing+"deg)";
            lastNumber = 1;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        case 2:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                quarterYDegree = lastYRotation + 360;                
            }
            theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(-" + quarterYDegree + "deg)";
            lastNumber = 2;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 3:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                quarterXDegree = lastXRotation + randomXTurnsDegree;
                quarterYDegree = lastYRotation + randomYTurnsDegree;
                theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree + "deg) rotateY(" + quarterYDegree + "deg)";
                lastXRotation = quarterXDegree;
                lastYRotation = quarterYDegree;
            } else {
                theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing + "deg)";
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
            theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + halfYDegree + "deg)";
            lastNumber = 4;
            lastXRotation = 0;
            lastYRotation = halfYDegree;
            break;
        case 5:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {            
                quarterYDegree = lastYRotation + 360;              
            }
            theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX("+rotateFullTurnsOrNothing+"deg) rotateY(" + quarterYDegree + "deg)";
            lastNumber = 5;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 6:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {            
                quarterXDegree = lastXRotation + 360;              
            }
            theDice.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(-" + quarterXDegree +"deg) rotateY("+rotateFullTurnsOrNothing+"deg)";
            lastNumber = 6;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        default:
            console.log("error");
            break;
    }

    updateScore(diceId, randomNumber, theDiceParentSiblings);

    console.log("Result Board: " + resultBoard)
    console.log("Score: " + score)

}

function updateScore(diceId, diceScore, diceSiblingsList){

    let diceSum = 0;

    let theDice = document.getElementById(diceId);
    let splittedId = diceId.split("dice-");  
    let diceIdNumber = parseInt(splittedId[1])
    let diceArrayNumber = diceIdNumber-1;
    
    // update the result board
    resultBoard[diceArrayNumber] = diceScore;

    // update all score
   

    // update dice score
    let theDiceWrapper = theDice.parentElement;
    let theDiceContainer = theDiceWrapper.parentElement;
    let theDiceList = theDiceContainer.getElementsByClassName('dice-wrapper');

     
        for ( n = 0 ; n < theDiceList.length ; n++) {

            // targetting the other dice
            if ( n !== diceArrayNumber ) {          
                if ( myDiceBoard.classList.contains('roll-all') ) {
                    // when clicking the roll all button, do nothing
                } else {
                    // otherwise, clicking one die will reset the others
                    resultBoard[n] = 0;
                }
            }

            // handle potential problem (might be deprecated now)
            if ( typeof resultBoard[n] === 'undefined' ) {
                resultBoard[n] = 0;
            }

            // calculate the sum
            diceSum = diceSum + resultBoard[n];
            
            // display individual score
            let diceScoreText = theDiceList[n].getElementsByClassName('dice-score')[0];
                diceScoreText.innerHTML = "Score: " + resultBoard[n];
        }

    score = diceSum;

    // display total score
    let textTotalScore = theDiceContainer.getElementsByClassName('dice-score-total')[0];
        textTotalScore.innerHTML = "Total score: " + score;   

}

// ADD THE DICE(S)
createDice(2, myDiceBoard, false, true);
createRollAllButton("my-button", myDiceBoard, true);
