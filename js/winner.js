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
    const lineEl = document.createElement("div");
    lineEl.classList.add("line");
    document.querySelector("#game-board").appendChild(lineEl);

    if (direction === "horizontal") {
        if (modo === 0) {
            lineEl.classList.add("line-00");
        } else if (modo === 1) {
            lineEl.classList.add("line-01");
        } else if (modo === 2) {
            lineEl.classList.add("line-02");
        } else {
            alert("Erro!");
        }
    } else if (direction === "vertical") {
        if (modo === 0) {
            lineEl.classList.add("line-10");
        } else if (modo === 1) {
            lineEl.classList.add("line-11");
        } else if (modo === 2) {
            lineEl.classList.add("line-12");
        } else {
            alert("Erro!");
        }
    } else if (direction === "diagonal") {
        if (modo === 0) {
            lineEl.classList.add("line-20");
        } else if (modo === 1) {
            lineEl.classList.add("line-21");
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

    const modalContentWinnerEl = document.querySelector(
        "#modal-content-winner"
    );

    modalContentWinnerEl.innerHTML = modalContent;

    "#Elmodal-winner".modal("show");
    document.querySelector("#game").innerHTML = "";

    const playAgainEl = document.querySelector("#btn-play-again");
    playAgainEl.addEventListener("click", () => {
        "#Elmodal-winner".modal("hide");
        "#Elmodal-inicial".modal("show");
    });
}
