const tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function comecarJogo(x, o) {
    const jogoEl = document.querySelector("#game");

    const tabuleiroEl = document.createElement("div");
    tabuleiroEl.id = "game-board";

    const jogador1El = document.createElement("div");
    jogador1El.id = "player-1";
    jogador1El.className = "players";
    jogador1El.innerHTML = `<h2>Jogador 1</h2>`;

    const jogador2El = document.createElement("div");
    jogador2El.id = "player-2";
    jogador2El.className = "players";
    jogador2El.innerHTML = `<h2>Jogador 2</h2>`;

    if (x) {
        jogador1El.classList.add("active");
        jogador2El.classList.add("disabled");
    } else {
        jogador1El.classList.add("disabled");
        jogador2El.classList.add("active");
    }

    jogoEl.appendChild(jogador1El);
    jogoEl.appendChild(tabuleiroEl);
    jogoEl.appendChild(jogador2El);

    for (let i = 0; i < 3; i++) {
        const xEl = document.createElement("div");
        const oEl = document.createElement("div");

        xEl.className = "x-parts parts";
        oEl.className = "y-parts parts";

        xEl.id = "x-" + i;
        oEl.id = "o-" + i;

        xEl.draggable = x;
        oEl.draggable = o;

        jogador1El.appendChild(xEl);
        jogador2El.appendChild(oEl);
    }

    for (let i = 0; i < 9; i++) {
        const quadradoEl = document.createElement("div");
        quadradoEl.className = "squares";

        tabuleiroEl.appendChild(quadradoEl);
    }

    const pecasEl = document.querySelectorAll(".parts");
    const quadradosEl = document.querySelectorAll(".squares");

    pecasEl.forEach((peca) => {
        peca.ondragstart = function (e) {
            e.dataTransfer.setData("text", e.target.id);
            e.dataTransfer.effectAllowed = "move";
            window.navigator.vibrate(300);
        };
    });

    quadradosEl.forEach((quadrado, i) => {
        quadrado.ondragover = function (e) {
            e.preventDefault();
            if (quadrado.childElementCount < 1) {
                quadrado.style.backgroundColor = "#19875471";
            } else {
                quadrado.style.backgroundColor = "#dc354681";
            }
        };

        quadrado.ondragleave = (e) => {
            e.target.style.backgroundColor = "transparent";
        };

        quadrado.ondrop = function (e) {
            e.target.style.backgroundColor = "transparent";
            if (quadrado.childElementCount < 1) {
                const data = e.dataTransfer.getData("text");

                e.target.appendChild(document.getElementById(data));
                e.preventDefault();

                if (x) {
                    tabuleiro[i] = 1;
                } else {
                    tabuleiro[i] = 2;
                }

                quadradosEl.forEach((quadrado, i) => {
                    if (quadrado.childElementCount === 0) {
                        tabuleiro[i] = 0;
                    }
                });

                trocarJogador();
            }
        };
    });

    function trocarJogador() {
        const pecasEl = document.querySelectorAll(".parts");

        pecasEl.forEach((peca) => {
            peca.draggable = !peca.draggable;
        });

        x = !x;
        o = !o;

        if (x) {
            jogador1El.classList.remove("disabled");
            jogador1El.classList.add("active");
            jogador2El.classList.remove("active");
            jogador2El.classList.add("disabled");
        } else {
            jogador1El.classList.remove("active");
            jogador1El.classList.add("disabled");
            jogador2El.classList.remove("disabled");
            jogador2El.classList.add("active");
        }

        checarGanhador();
    }
}
