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
    if (x !== null && o !== null) {
        startGame(x, o);
        $modalInicial.modal("hide");
    }
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
            window.navigator.vibrate(200);
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

    function checkChampion() {
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
                xChampion ||= gameBoard[i + 1] === 1 && gameBoard[i + 2] === 1;
            }
            if (gameBoard[j] === 1) {
                xChampion ||= gameBoard[j + 3] === 1 && gameBoard[j + 6] === 1;
            }
            if (gameBoard[i] === 2) {
                oChampion ||= gameBoard[i + 1] === 2 && gameBoard[i + 2] === 2;
            }
            if (gameBoard[j] === 2) {
                oChampion ||= gameBoard[j + 3] === 2 && gameBoard[j + 6] === 2;
            }
        }

        if (xChampion) {
            animeWin(1);
            setTimeout(() => {
                showWin("x");
            }, "1000");
        } else if (oChampion) {
            animeWin(2);
            setTimeout(() => {
                showWin("o");
            }, "1000");
        }
    }

    function animeWin(winner) {
        if (
            gameBoard[0] === winner &&
            gameBoard[1] === winner &&
            gameBoard[2] === winner
        ) {
            lineWin("horizontal", 0);
        } else if (
            gameBoard[3] === winner &&
            gameBoard[4] === winner &&
            gameBoard[5] === winner
        ) {
            lineWin("horizontal", 1);
        } else if (
            gameBoard[6] === winner &&
            gameBoard[7] === winner &&
            gameBoard[8] === winner
        ) {
            lineWin("horizontal", 2);
        } else if (
            gameBoard[0] === winner &&
            gameBoard[3] === winner &&
            gameBoard[6] === winner
        ) {
            lineWin("vertical", 0);
        } else if (
            gameBoard[1] === winner &&
            gameBoard[4] === winner &&
            gameBoard[7] === winner
        ) {
            lineWin("vertical", 1);
        } else if (
            gameBoard[2] === winner &&
            gameBoard[5] === winner &&
            gameBoard[8] === winner
        ) {
            lineWin("vertical", 2);
        } else if (
            gameBoard[0] === winner &&
            gameBoard[4] === winner &&
            gameBoard[8] === winner
        ) {
            lineWin("diagonal", 0);
        } else if (
            gameBoard[2] === winner &&
            gameBoard[4] === winner &&
            gameBoard[6] === winner
        ) {
            lineWin("diagonal", 1);
        }
    }

    function lineWin(direction, modo) {
        const $line = document.createElement("div");
        $line.classList.add("line");
        $gameBoard.appendChild($line);

        if (direction === "horizontal") {
            if (modo === 0) {
                $line.classList.add("line-00");
            } else if (modo === 1) {
                $line.classList.add("line-01");
            } else if (modo === 2) {
                $line.classList.add("line-02");
            } else {
                alert("Erro!");
            }
        } else if (direction === "vertical") {
            if (modo === 0) {
                $line.classList.add("line-10");
            } else if (modo === 1) {
                $line.classList.add("line-11");
            } else if (modo === 2) {
                $line.classList.add("line-12");
            } else {
                alert("Erro!");
            }
        } else if (direction === "diagonal") {
            if (modo === 0) {
                $line.classList.add("line-20");
            } else if (modo === 1) {
                $line.classList.add("line-21");
            } else {
                alert("Erro!");
            }
        } else {
            alert("Erro!");
        }
    }

    function showWin(winner) {
        let modalContent = null;
        if (winner === "x") {
            modalContent = `
                <div class="modal-header">
                    <h5 class="modal-title">X ganhou a partida</h5>
                </div>
                <div class="modal-body" id="modal-body-choice">
                    <p>Jogador X ganhou a partida</p>
                    <div>
                        <img class="btn-chose" src="assets/svgs/x.svg">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-play-again" type="button" class="btn btn-primary">Jogar novamente</button>
                </div>
            `;
        } else if (winner === "o") {
            modalContent = `
                <div class="modal-header">
                    <h5 class="modal-title">O ganhou a partida</h5>
                </div>
                <div class="modal-body" id="modal-body-choice">
                    <p>Jogador O ganhou a partida</p>
                    <div>
                        <img class="btn-chose" src="assets/svgs/o.svg">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-play-again" type="button" class="btn btn-primary">Jogar novamente</button>
                </div>
            `;
        }

        const $modalContentWinner = document.querySelector(
            "#modal-content-winner"
        );

        $modalContentWinner.innerHTML = modalContent;

        $("#modal-winner").modal("show");
        $game.innerHTML = "";

        const $playAgain = document.querySelector("#btn-play-again");
        $playAgain.addEventListener("click", () => {
            $("#modal-winner").modal("hide");
            $("#modal-inicial").modal("show");
        });
    }
}
