const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function startGame(x, o) {
    const $game = document.querySelector("#game");

    const $gameBoard = document.createElement("div");
    $gameBoard.id = "game-board";

    const $player1 = document.createElement("div");
    $player1.id = "player-1";
    $player1.className = "players";
    $player1.innerHTML = `<h2>Jogador 1</h2>`;

    const $player2 = document.createElement("div");
    $player2.id = "player-2";
    $player2.className = "players";
    $player2.innerHTML = `<h2>Jogador 2</h2>`;

    if (x) {
        $player1.classList.add("active");
        $player2.classList.add("disabled");
    } else {
        $player1.classList.add("disabled");
        $player2.classList.add("active");
    }

    $game.appendChild($player1);
    $game.appendChild($gameBoard);
    $game.appendChild($player2);

    for (let i = 0; i < 3; i++) {
        const $x = document.createElement("div");
        const $o = document.createElement("div");

        $x.className = "x-parts parts";
        $o.className = "y-parts parts";

        $x.id = "x-" + i;
        $o.id = "o-" + i;

        $x.draggable = x;
        $o.draggable = o;

        $player1.appendChild($x);
        $player2.appendChild($o);
    }

    for (let i = 0; i < 9; i++) {
        const $square = document.createElement("div");
        $square.className = "squares";

        $gameBoard.appendChild($square);
    }

    const $parts = document.querySelectorAll(".parts");
    const $squares = document.querySelectorAll(".squares");

    $parts.forEach((part) => {
        part.ondragstart = function (event) {
            event.dataTransfer.setData("text", event.target.id);
            event.dataTransfer.effectAllowed = "move";
            window.navigator.vibrate(300);
        };
    });

    $squares.forEach((square, i) => {
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

                $squares.forEach((square, i) => {
                    if (square.childElementCount === 0) {
                        gameBoard[i] = 0;
                    }
                });

                changePlayer();
            }
        };
    });

    function changePlayer() {
        const $parts = document.querySelectorAll(".parts");

        $parts.forEach((part) => {
            part.draggable = !part.draggable;
        });

        x = !x;
        o = !o;

        if (x) {
            $player1.classList.remove("disabled");
            $player1.classList.add("active");
            $player2.classList.remove("active");
            $player2.classList.add("disabled");
        } else {
            $player1.classList.remove("active");
            $player1.classList.add("disabled");
            $player2.classList.remove("disabled");
            $player2.classList.add("active");
        }

        checkChampion();
    }
}
