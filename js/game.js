const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function startGame(x, o) {
    let moves = 0;

    if (!(localStorage.getItem("scores-x"))) {
        localStorage.setItem("scores-x", 0);
        localStorage.setItem("scores-o", 0);
    }

    if (!(localStorage.getItem("name-x"))) {
        localStorage.setItem("name-x", "Jogador 1");
        localStorage.setItem("name-o", "Jogador 2");
    }

    const playerNameX = localStorage.getItem("name-x");
    const playerNameO = localStorage.getItem("name-o");

    const gameEl = document.querySelector("#game");
    gameEl.innerHTML = "";

    const boardEl = document.createElement("div");
    boardEl.id = "board";

    const plyerSideXEl = document.createElement("div");
    plyerSideXEl.id = "player-x";
    plyerSideXEl.className = "players";
    plyerSideXEl.innerHTML = `<h2 id="player-name-x">${playerNameX}</h2>`;

    const plyerSideOEl = document.createElement("div");
    plyerSideOEl.id = "player-o";
    plyerSideOEl.className = "players";
    plyerSideOEl.innerHTML = `<h2 id="player-name-o">${playerNameO}</h2>`;

    gameEl.appendChild(plyerSideXEl);
    gameEl.appendChild(boardEl);
    gameEl.appendChild(plyerSideOEl);
    
    let xEl;
    let oEl;

    for (let i = 0; i < 3; i++) {
        xEl = document.createElement("div");
        oEl = document.createElement("div");

        xEl.className = "piece-x pieces";
        oEl.className = "piece-o pieces";

        xEl.id = "x-" + i;
        oEl.id = "o-" + i;

        xEl.draggable = x;
        oEl.draggable = o;

        plyerSideXEl.appendChild(xEl);
        plyerSideOEl.appendChild(oEl);
    }

    if (x) {
        plyerSideXEl.classList.add("active");
        plyerSideOEl.classList.add("disabled");
    } else {
        plyerSideXEl.classList.add("disabled");
        plyerSideOEl.classList.add("active");
    }

    for (let i = 0; i < 9; i++) {
        const squareEl = document.createElement("div");
        squareEl.className = "squares";

        boardEl.appendChild(squareEl);
    }

    let piecesEl = document.querySelectorAll(".pieces");
    const squaresEl = document.querySelectorAll(".squares");

    piecesEl.forEach((piece) => {
        piece.ondragstart = function (e) {
            e.dataTransfer.setData("text", e.target.id);
            e.dataTransfer.effectAllowed = "move";
            window.navigator.vibrate(300);
        };
    });

    squaresEl.forEach((square, i) => {
        square.ondragover = function (e) {
            if (square.childElementCount < 1) {
                square.style.backgroundColor = "#19875471";
            } else {
                square.style.backgroundColor = "#dc354681";
            }
    
            e.preventDefault();
        };

        
        square.ondragleave = (e) => {
            e.target.style.backgroundColor = "transparent";
        };
        
        square.ondrop = function (e) {
            e.target.style.backgroundColor = "transparent";
            if (square.childElementCount < 1) {
                const data = e.dataTransfer.getData("text");
                const transferredPieceEl = document.getElementById(data);

                if (moves < 6) {
                    transferredPieceEl.draggable = false;
                }
                
                e.target.appendChild(transferredPieceEl);
                e.preventDefault();

                if (x) {
                    board[i] = 1;
                } else {
                    board[i] = 2;
                }

                squaresEl.forEach((square, i) => {
                    if (square.childElementCount === 0) {
                        board[i] = 0;
                    }
                });
                
                moves++;
                changeTurns();
            }

            square.style.backgroundColor = "";
        };
    });

    function changeTurns() {       
        x = !x;
        o = !o;
    
        if (moves < 6) {
            piecesEl = document.querySelectorAll(".players .pieces");

            piecesEl.forEach((piece) => {
                piece.draggable = !piece.draggable;
            });
        } else if (moves === 6) {
            piecesEl = document.querySelectorAll(".pieces");

            let piecesXEl = document.querySelectorAll(".piece-x");
            let piecesOEl = document.querySelectorAll(".piece-o");

            piecesXEl.forEach((piece) => {
                piece.draggable = x;
            });

            piecesOEl.forEach((piece) => {
                piece.draggable = o;
            });
        } else {
            piecesEl = document.querySelectorAll(".pieces");

            piecesEl.forEach((piece) => {
                piece.draggable = !piece.draggable;
            });
        }

        if (x) {
            plyerSideXEl.classList.remove("disabled");
            plyerSideXEl.classList.add("active");
            plyerSideOEl.classList.remove("active");
            plyerSideOEl.classList.add("disabled");
        } else {
            plyerSideXEl.classList.remove("active");
            plyerSideXEl.classList.add("disabled");
            plyerSideOEl.classList.remove("disabled");
            plyerSideOEl.classList.add("active");
        }

        checkWinner();
    }
}
