const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const $modalInicial = $("#modal-inicial");

$(window).on("load", () => {
    $modalInicial.modal("show");
});

let x = null;
let o = null;

const $btnChoseX = document.querySelector("#btn-chose-x");
const $btnChoseO = document.querySelector("#btn-chose-o");
const $btnStart = document.querySelector("#btn-start");

$btnChoseX.addEventListener("click", function () {
    $btnChoseX.classList.add("selected");
    $btnChoseO.classList.remove("selected");

    x = true;
    o = false;
});

$btnChoseO.addEventListener("click", function () {
    $btnChoseO.classList.add("selected");
    $btnChoseX.classList.remove("selected");

    x = false;
    o = true;
});

$btnStart.addEventListener("click", () => {
    $modalInicial.modal("hide");
    startGame(x, o);
});

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
        };
    });

    $squares.forEach((square) => {
        square.ondragover = function (event) {
            event.preventDefault();
        };
    });

    $squares.forEach((square, i) => {
        square.ondrop = function (event) {
            if (square.childElementCount < 1) {
                const data = event.dataTransfer.getData("text");

                event.target.appendChild(document.getElementById(data));
                event.preventDefault();

                if (x) {
                    gameBoard[i] = 1;
                } else {
                    gameBoard[i] = 2;
                }

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

        checkChampion(gameBoard);
    }

    function checkChampion(gameBoard) {
        let xChampion = false;
        let oChampion = false;

        xChampion =
            (gameBoard[0] === 1 && gameBoard[4] === 1 && gameBoard[8] === 1) ||
            (gameBoard[2] === 1 && gameBoard[4] === 1 && gameBoard[6] === 1);
        oChampion =
            (gameBoard[0] === 2 && gameBoard[4] === 2 && gameBoard[8] === 2) ||
            (gameBoard[2] === 2 && gameBoard[4] === 2 && gameBoard[6] === 2);

        for (let i = 0; i < gameBoard.length; i += 3) {
            let j = i / 3;
            if (gameBoard[i] === 1) {
                xChampion ||=
                    (gameBoard[i + 1] === 1 && gameBoard[i + 2] === 1) ||
                    (gameBoard[j] === 1 &&
                        gameBoard[j + 3] === 1 &&
                        gameBoard[j + 6] === 1);
            }
            if (gameBoard[i] === 2) {
                oChampion ||=
                    (gameBoard[i + 1] === 2 && gameBoard[i + 2] === 2) ||
                    (gameBoard[j] === 2 &&
                        gameBoard[j + 3] === 2 &&
                        gameBoard[j + 6] === 2);
            }
        }

        if (xChampion) {
            alert("x ganhou");
        } else if (oChampion) {
            alert("o ganhou");
        }
    }
}
