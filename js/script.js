const playBtn = document.getElementById("play-game");

playBtn.addEventListener("click", function() {

    // SELEZIONE DELLA DIFFICOLTA' E ASSEGNAZIONE DIMENSIONE GRIGLIA 
    const userDifficulty = document.getElementById("user-difficulty").value;

    let boxQuantity = 0;
    let boxSize = "";

    if (userDifficulty === "easy") {
        boxQuantity = 100;
        boxSize = "easy";
    } else if (userDifficulty === "hard") {
        boxQuantity = 81;
        boxSize = "hard";
    } else if (userDifficulty === "crazy") {
        boxQuantity = 49;
        boxSize = "crazy";
    }

    // GENERAZIONE RANDOM BOMBE
    const bombsQuantity = 16;
    const maxBoxQuantity = boxQuantity;
    const bombsPlacement = generateUniqueRndNumbers(bombsQuantity, maxBoxQuantity);
    console.log("bombsPlacement", bombsPlacement);

    // array dove salvare le celle "liberate" e calcolare quidni il punteggio + condizione di vittoria
    const clearedCells = [];
    const winningCondition = boxQuantity - bombsQuantity;

    // CREAZIONE ELEMENTI GRIGLIA E REST ELEMENTI PRESENTI
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    let gameResult = document.getElementById("game-result");
    gameResult.innerHTML ="";

    for ( let i = 1; i <= boxQuantity; i++ ) {
    
        // assegno il numero al box
        const boxNumber = i;
        
        // creo l'elemento in html con il numero al suo interno
        const gridBox = document.createElement("div");
        gridBox.innerHTML = `<span>${boxNumber}</span>`;
    
        // aggiungo la classe css
        gridBox.classList.add("grid-box");
        gridBox.classList.add(boxSize);
    
        // gestione click elemento
        gridBox.addEventListener("click", function() {
            
            const clickedNumber = parseInt(this.querySelector("span").textContent);
            const score = clearedCells.length;
            gameResult = document.getElementById("game-result");
            if (bombsPlacement.includes(clickedNumber)) {
                this.classList.add("bomb");
                gameResult.innerHTML = `Hai perso!Il tuo punteggio é ${score}`;
            } else {
                this.classList.add("clicked");
                this.style.pointerEvents = "none";
                clearedCells.push(clickedNumber);
                console.log("clearedCells", clearedCells);
                if (clearedCells.length >= winningCondition) {
                    gameResult.innerHTML = `Hai vinto!!!`;
                }
            }
        })
        // inserisco gli elementi nel container
        gridContainer.append(gridBox);
    }
})
// FUNCTION

/**
 * Description generate X unique random number with a max limit range and create an array containing them
 * @param {Number} numberQuantity -> quantity of number you want to generate
 * @param {Number} maxLimit -> max value the number can get
 * @returns {Array} -> the array with the random unique numbers
 */
function generateUniqueRndNumbers(numberQuantity, maxLimit) {
    const randomsUniqueNumbersArray = [];
    while (randomsUniqueNumbersArray.length < numberQuantity) {
        const randomNumber = getRndInteger(1, maxLimit);
        if ( !randomsUniqueNumbersArray.includes(randomNumber)) {
            randomsUniqueNumbersArray.push(randomNumber);
        }
    }
    return randomsUniqueNumbersArray;
}

// UTILITY FUNCTION
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }