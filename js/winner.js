function checarGanhador() {
    let xGanhou = false;
    let oGanhou = false;

    xGanhou =
        (tabuleiro[0] === 1 && tabuleiro[4] === 1 && tabuleiro[8] === 1) ||
        (tabuleiro[2] === 1 && tabuleiro[4] === 1 && tabuleiro[6] === 1);
    oGanhou =
        (tabuleiro[0] === 2 && tabuleiro[4] === 2 && tabuleiro[8] === 2) ||
        (tabuleiro[2] === 2 && tabuleiro[4] === 2 && tabuleiro[6] === 2);

    for (let i = 0; i < tabuleiro.length; i += 3) {
        let j = i / 3;
        if (tabuleiro[i] === 1) {
            xGanhou ||= tabuleiro[i + 1] === 1 && tabuleiro[i + 2] === 1;
        }
        if (tabuleiro[j] === 1) {
            xGanhou ||= tabuleiro[j + 3] === 1 && tabuleiro[j + 6] === 1;
        }
        if (tabuleiro[i] === 2) {
            oGanhou ||= tabuleiro[i + 1] === 2 && tabuleiro[i + 2] === 2;
        }
        if (tabuleiro[j] === 2) {
            oGanhou ||= tabuleiro[j + 3] === 2 && tabuleiro[j + 6] === 2;
        }
    }

    if (xGanhou) {
        animacaoDoGanhador(1);
        setTimeout(() => {
            mostrarGanhador("x");
        }, "1000");
    } else if (oGanhou) {
        animacaoDoGanhador(2);
        setTimeout(() => {
            mostrarGanhador("o");
        }, "1000");
    }
}

function animacaoDoGanhador(ganhador) {
    if (
        tabuleiro[0] === ganhador &&
        tabuleiro[1] === ganhador &&
        tabuleiro[2] === ganhador
    ) {
        linha("horizontal", 0);
    } else if (
        tabuleiro[3] === ganhador &&
        tabuleiro[4] === ganhador &&
        tabuleiro[5] === ganhador
    ) {
        linha("horizontal", 1);
    } else if (
        tabuleiro[6] === ganhador &&
        tabuleiro[7] === ganhador &&
        tabuleiro[8] === ganhador
    ) {
        linha("horizontal", 2);
    } else if (
        tabuleiro[0] === ganhador &&
        tabuleiro[3] === ganhador &&
        tabuleiro[6] === ganhador
    ) {
        linha("vertical", 0);
    } else if (
        tabuleiro[1] === ganhador &&
        tabuleiro[4] === ganhador &&
        tabuleiro[7] === ganhador
    ) {
        linha("vertical", 1);
    } else if (
        tabuleiro[2] === ganhador &&
        tabuleiro[5] === ganhador &&
        tabuleiro[8] === ganhador
    ) {
        linha("vertical", 2);
    } else if (
        tabuleiro[0] === ganhador &&
        tabuleiro[4] === ganhador &&
        tabuleiro[8] === ganhador
    ) {
        linha("diagonal", 0);
    } else if (
        tabuleiro[2] === ganhador &&
        tabuleiro[4] === ganhador &&
        tabuleiro[6] === ganhador
    ) {
        linha("diagonal", 1);
    }
}

function linha(direction, modo) {
    const linhaEl = document.createElement("div");
    linhaEl.classList.add("line");
    document.querySelector("#game-board").appendChild(linhaEl);

    if (direction === "horizontal") {
        if (modo === 0) {
            linhaEl.classList.add("line-00");
        } else if (modo === 1) {
            linhaEl.classList.add("line-01");
        } else if (modo === 2) {
            linhaEl.classList.add("line-02");
        } else {
            alert("Erro!");
        }
    } else if (direction === "vertical") {
        if (modo === 0) {
            linhaEl.classList.add("line-10");
        } else if (modo === 1) {
            linhaEl.classList.add("line-11");
        } else if (modo === 2) {
            linhaEl.classList.add("line-12");
        } else {
            alert("Erro!");
        }
    } else if (direction === "diagonal") {
        if (modo === 0) {
            linhaEl.classList.add("line-20");
        } else if (modo === 1) {
            linhaEl.classList.add("line-21");
        } else {
            alert("Erro!");
        }
    } else {
        alert("Erro!");
    }
}

function mostrarGanhador(ganhador) {
    let modalContent = null;
    if (ganhador === "x") {
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
    } else if (ganhador === "o") {
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

    const conteudoModalVencedor = document.querySelector(
        "#modal-content-winner"
    );

    conteudoModalVencedor.innerHTML = modalContent;

    $("#modal-winner").modal("show");
    document.querySelector("#game").innerHTML = "";

    const jogarNovamenteEl = document.querySelector("#btn-play-again");
    jogarNovamenteEl.addEventListener("click", () => {
        $("#modal-winner").modal("hide");
        $("#modal-inicial").modal("show");
    });
}
