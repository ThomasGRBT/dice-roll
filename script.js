let diceOne = document.getElementById('dice-one');
let btnOne = document.getElementById('dice-btn-one');
let diceResultText = document.getElementById('dice-result');

const diceMaxNumber = 6;

let lastNumber = 3;
let lastXRotation = 0;
let lastYRotation = 0;

let rotationDirection = "";

const arbitraryMaxXTurnNumber = 4;
const arbitraryMaxYTurnNumber = arbitraryMaxXTurnNumber; // Could be change
const arbitraryMaxNullTurnNumber = 3;

btnOne.addEventListener('click', () => {

    let randomNumber = randomMinMax(1, diceMaxNumber);

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

    // Not Used
    // let halfXDegree = 180 + randomXTurnsDegree;
    let halfYDegree = 180 + randomYTurnsDegree;

    console.log("random: " + randomNumber + " last: " + lastNumber + " boolean: " + randomBoolean);

    switch (randomNumber) {
        case 1:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");
                quarterXDegree = lastXRotation + 360;                
            }
            diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree +"deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing+"deg)";
            lastNumber = 1;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        case 2:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");
                quarterYDegree = lastYRotation + 360;                
            }
            diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(-" + quarterYDegree + "deg)";
            lastNumber = 2;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 3:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");
                quarterXDegree = lastXRotation + randomXTurnsDegree;
                quarterYDegree = lastYRotation + randomYTurnsDegree;
                diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + quarterXDegree + "deg) rotateY(" + quarterYDegree + "deg)";
                lastXRotation = quarterXDegree;
                lastYRotation = quarterYDegree;
            } else {
                diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + rotationDirection + rotateFullTurnsOrNothing + "deg)";
                lastXRotation = 0;
                lastYRotation = 0;
            }
            lastNumber = 3;
            break;
        case 4:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");             
                halfYDegree = lastYRotation + 360;              
            }
            diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(" + rotationDirection + rotateFullTurnsOrNothing + "deg) rotateY(" + halfYDegree + "deg)";
            lastNumber = 4;
            lastXRotation = 0;
            lastYRotation = halfYDegree;
            break;
        case 5:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");             
                quarterYDegree = lastYRotation + 360;              
            }
            diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX("+rotateFullTurnsOrNothing+"deg) rotateY(" + quarterYDegree + "deg)";
            lastNumber = 5;
            lastXRotation = 0;
            lastYRotation = quarterYDegree;
            break;
        case 6:
            // if roll result is equal to previous, instead of not moving, rolling is forced
            if ( randomNumber === lastNumber ) {
                console.log("may not move");             
                quarterXDegree = lastXRotation + 360;              
            }
            diceOne.style.transform = "translateZ( calc(var(--dice-half) * -1)) rotateX(-" + quarterXDegree +"deg) rotateY("+rotateFullTurnsOrNothing+"deg)";
            lastNumber = 6;
            lastXRotation = quarterXDegree;
            lastYRotation = 0;
            break;
        default:
            console.log("error");
            break;
    }

    diceResultText.innerHTML = "Résultat: " + randomNumber ;

});

function randomMinMax(min, max) {
    return  Math.floor(Math.random() * (max - min + 1) + min );
}