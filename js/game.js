const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function startGame(x, o) {
    const gameEl = document.querySelector("#game");

    const gameBoardEl = document.createElement("div");
    gameBoardEl.id = "game-board";

    const player1El = document.createElement("div");
    player1El.id = "player-1";
    player1El.className = "players";
    player1El.innerHTML = `<h2>Jogador 1</h2>`;

    const player2El = document.createElement("div");
    player2El.id = "player-2";
    player2El.className = "players";
    player2El.innerHTML = `<h2>Jogador 2</h2>`;

    if (x) {
        player1El.classList.add("active");
        player2El.classList.add("disabled");
    } else {
        player1El.classList.add("disabled");
        player2El.classList.add("active");
    }

    gameEl.appendChild(player1El);
    gameEl.appendChild(gameBoardEl);
    gameEl.appendChild(player2El);

    for (let i = 0; i < 3; i++) {
        const xEl = document.createElement("div");
        const oEl = document.createElement("div");

        xEl.className = "x-parts parts";
        oEl.className = "y-parts parts";

        xEl.id = "x-" + i;
        oEl.id = "o-" + i;

        xEl.draggable = x;
        oEl.draggable = o;

        player1El.appendChild(xEl);
        player2El.appendChild(oEl);
    }

    for (let i = 0; i < 9; i++) {
        const squareEl = document.createElement("div");
        squareEl.className = "squares";

        gameBoardEl.appendChild(squareEl);
    }

    const partsEl = document.querySelectorAll(".parts");
    const squaresEl = document.querySelectorAll(".squares");

    partsEl.forEach((part) => {
        part.ondragstart = function (event) {
            event.dataTransfer.setData("text", event.target.id);
            event.dataTransfer.effectAllowed = "move";
            window.navigator.vibrate(300);
        };
    });

    squaresEl.forEach((square, i) => {
        square.ondragover = function (event) {
            event.preventDefault();
            if (square.childElementCount < 1) {
                event.target.style.backgroundColor = "#19875471";
            } else {
                event.target.style.backgroundColor = "#dc354681";
            }
        };

        square.ondragleave = (event) => {
            event.target.style.backgroundColor = "transparent";
        };

        square.ondrop = function (event) {
            event.target.style.backgroundColor = "transparent";
            if (square.childElementCount < 1) {
                const data = event.dataTransfer.getData("text");

                event.target.appendChild(document.getElementById(data));
                event.preventDefault();

                if (x) {
                    gameBoard[i] = 1;
                } else {
                    gameBoard[i] = 2;
                }

                squaresEl.forEach((square, i) => {
                    if (square.childElementCount === 0) {
                        gameBoard[i] = 0;
                    }
                });

                changePlayer();
            }
        };
    });

    function changePlayer() {
        const partsEl = document.querySelectorAll(".parts");

        partsEl.forEach((part) => {
            part.draggable = !part.draggable;
        });

        x = !x;
        o = !o;

        if (x) {
            player1El.classList.remove("disabled");
            player1El.classList.add("active");
            player2El.classList.remove("active");
            player2El.classList.add("disabled");
        } else {
            player1El.classList.remove("active");
            player1El.classList.add("disabled");
            player2El.classList.remove("disabled");
            player2El.classList.add("active");
        }

        checkChampion();
    }
}
