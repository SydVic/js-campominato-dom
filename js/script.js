const playBtn = document.getElementById("play-game");

playBtn.addEventListener("click", function() {

    const userDifficulty = document.getElementById("user-difficulty").value;
    console.log(userDifficulty);

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

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    for ( let i = 1; i <= boxQuantity; i++ ) {
    
        // assegno il numero al box
        const boxNumber = i;
        console.log(boxNumber);
        
        // creo l'elemento in html con il numero al suo interno
        const gridBox = document.createElement("div");
        gridBox.innerHTML = `<span>${boxNumber}</span>`;
    
        // aggiungo la classe css
        gridBox.classList.add("grid-box");
        gridBox.classList.add(boxSize);
    
        // gestione click elemento
        gridBox.addEventListener("click", function() {
            this.classList.add("clicked");
        })
    
        // inserisco gli elementi nel container
        gridContainer.append(gridBox);
    }
})
