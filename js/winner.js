function checkWinner() {
    let xWon = false;
    let oWon = false;

    xWon =
        (board[0] === 1 && board[4] === 1 && board[8] === 1) ||
        (board[2] === 1 && board[4] === 1 && board[6] === 1);
    oWon =
        (board[0] === 2 && board[4] === 2 && board[8] === 2) ||
        (board[2] === 2 && board[4] === 2 && board[6] === 2);

    for (let i = 0; i < board.length; i += 3) {
        let j = i / 3;
        if (board[i] === 1) {
            xWon ||= board[i + 1] === 1 && board[i + 2] === 1;
        }
        if (board[j] === 1) {
            xWon ||= board[j + 3] === 1 && board[j + 6] === 1;
        }
        if (board[i] === 2) {
            oWon ||= board[i + 1] === 2 && board[i + 2] === 2;
        }
        if (board[j] === 2) {
            oWon ||= board[j + 3] === 2 && board[j + 6] === 2;
        }
    }

    if (xWon) {
        if (localStorage.getItem("scores-x")) {
            const scores = parseInt(localStorage.getItem("scores-x"));
            localStorage.setItem("scores-x", scores + 1);
        }

        lineAnimation(1);
        setTimeout(() => { showWinner("x"); }, "1000");
    } else if (oWon) {
        if (localStorage.getItem("scores-o")) {
            const scores = parseInt(localStorage.getItem("scores-o"));
            localStorage.setItem("scores-o", scores + 1);
        }

        lineAnimation(2);
        setTimeout(() => { showWinner("o"); }, "1000");
    }
}

function lineAnimation(winner) {
    if (
        board[0] === winner &&
        board[1] === winner &&
        board[2] === winner
    ) {
        line("horizontal", 0);
    } else if (
        board[3] === winner &&
        board[4] === winner &&
        board[5] === winner
    ) {
        line("horizontal", 1);
    } else if (
        board[6] === winner &&
        board[7] === winner &&
        board[8] === winner
    ) {
        line("horizontal", 2);
    } else if (
        board[0] === winner &&
        board[3] === winner &&
        board[6] === winner
    ) {
        line("vertical", 0);
    } else if (
        board[1] === winner &&
        board[4] === winner &&
        board[7] === winner
    ) {
        line("vertical", 1);
    } else if (
        board[2] === winner &&
        board[5] === winner &&
        board[8] === winner
    ) {
        line("vertical", 2);
    } else if (
        board[0] === winner &&
        board[4] === winner &&
        board[8] === winner
    ) {
        line("diagonal", 0);
    } else if (
        board[2] === winner &&
        board[4] === winner &&
        board[6] === winner
    ) {
        line("diagonal", 1);
    }
}

function line(direction, modo) {
    const lineEl = document.createElement("div");
    lineEl.classList.add("line");
    document.querySelector("#board").appendChild(lineEl);

    if (direction === "horizontal") {
        if (modo === 0) {
            lineEl.classList.add("line-00");
        } else if (modo === 1) {
            lineEl.classList.add("line-01");
        } else if (modo === 2) {
            lineEl.classList.add("line--02");
        }
    } else if (direction === "vertical") {
        if (modo === 0) {
            lineEl.classList.add("line-10");
        } else if (modo === 1) {
            lineEl.classList.add("line-11");
        } else if (modo === 2) {
            lineEl.classList.add("line-12");
        }
    } else if (direction === "diagonal") {
        if (modo === 0) {
            lineEl.classList.add("line-20");
        } else if (modo === 1) {
            lineEl.classList.add("line-21");
        }
    }
}

function showWinner(winner) {
    let contentModal = null;
    if (winner === "x") {
        contentModal = `
                <div class="modal-header">
                    <h5 class="modal-title">X ganhou a partida</h5>
                </div>
                <div class="modal-body show-players">
                    <p>Jogador X ganhou a partida</p>
                    <div>
                        <img class="btn-selected" src="assets/svgs/x.svg">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-play-again" type="button" class="btn btn-primary">Jogar novamente</button>
                </div>
            `;
    } else if (winner === "o") {
        contentModal = `
                <div class="modal-header">
                    <h5 class="modal-title">O ganhou a partida</h5>
                </div>
                <div class="modal-body show-players">
                    <p>Jogador O ganhou a partida</p>
                    <div>
                        <img class="btn-selected" src="assets/svgs/o.svg">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-play-again" type="button" class="btn btn-primary">Jogar novamente</button>
                </div>
            `;
    }

    const modalContentWinnerEl = document.querySelector(
        "#show-content-winner"
    );

    modalContentWinnerEl.innerHTML = contentModal;

    $("#modal-show-players").modal("show");
    document.querySelector("#game").innerHTML = "";

    const jogarNovamenteEl = document.querySelector("#btn-play-again");
    jogarNovamenteEl.addEventListener("click", () => {
        $("#modal-show-players").modal("hide");
        $("#modal-main").modal("show");
    });
}
