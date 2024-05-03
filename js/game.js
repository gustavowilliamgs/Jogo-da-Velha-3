const tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function comecarJogo(x, o) {
    let movimentos = 0;

    if (!(localStorage.getItem("pontuacao-x"))) {
        localStorage.setItem("pontuacao-x", 0);
        localStorage.setItem("pontuacao-o", 0);
    }

    if (!(localStorage.getItem("nome-x"))) {
        localStorage.setItem("nome-x", "Jogador 1");
        localStorage.setItem("nome-o", "Jogador 2");
    }

    let nome1 = localStorage.getItem("nome-x");
    let nome2 = localStorage.getItem("nome-o");

    const jogoEl = document.querySelector("#jogo");
    jogoEl.innerHTML = "";

    const tabuleiroEl = document.createElement("div");
    tabuleiroEl.id = "tabuleiro";

    const jogador1El = document.createElement("div");
    jogador1El.id = "jogador-1";
    jogador1El.className = "jogadores";
    jogador1El.innerHTML = `<h2 id="nome-jogador-1">${nome1}</h2>`;

    const jogador2El = document.createElement("div");
    jogador2El.id = "jogador-2";
    jogador2El.className = "jogadores";
    jogador2El.innerHTML = `<h2 id="nome-jogador-2">${nome2}</h2>`;

    jogoEl.appendChild(jogador1El);
    jogoEl.appendChild(tabuleiroEl);
    jogoEl.appendChild(jogador2El);
    
    let xEl;
    let oEl;

    for (let i = 0; i < 3; i++) {
        xEl = document.createElement("div");
        oEl = document.createElement("div");

        xEl.className = "peca-x pecas";
        oEl.className = "peca-o pecas";

        xEl.id = "x-" + i;
        oEl.id = "o-" + i;

        xEl.draggable = x;
        oEl.draggable = o;

        jogador1El.appendChild(xEl);
        jogador2El.appendChild(oEl);
    }

    if (x) {
        jogador1El.classList.add("ativo");
        jogador2El.classList.add("disativado");
    } else {
        jogador1El.classList.add("disativado");
        jogador2El.classList.add("ativo");
    }

    for (let i = 0; i < 9; i++) {
        const quadradoEl = document.createElement("div");
        quadradoEl.className = "quadrados";

        tabuleiroEl.appendChild(quadradoEl);
    }

    const pecasEl = document.querySelectorAll(".pecas");
    const quadradosEl = document.querySelectorAll(".quadrados");

    pecasEl.forEach((peca) => {
        peca.ondragstart = function (e) {
            e.dataTransfer.setData("text", e.target.id);
            e.dataTransfer.effectAllowed = "move";
            window.navigator.vibrate(300);
        };
    });

    quadradosEl.forEach((quadrado, i) => {
        quadrado.ondragover = function (e) {
            const data = e.dataTransfer.getData("text");
            const peca = document.getElementById(data);

            if (quadrado.childElementCount < 1) {
                quadrado.style.backgroundColor = "#19875471";
            } else {
                quadrado.style.backgroundColor = "#dc354681";
            }
    
            e.preventDefault();
        };

        
        quadrado.ondragleave = (e) => {
            e.target.style.backgroundColor = "transparent";
        };
        
        quadrado.ondrop = function (e) {
            e.target.style.backgroundColor = "transparent";
            if (quadrado.childElementCount < 1) {
                const data = e.dataTransfer.getData("text");
                const pecaTransferida = document.getElementById(data);

                if (movimentos < 6) {
                    pecaTransferida.draggable = false;
                }
                
                e.target.appendChild(pecaTransferida);
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
                
                movimentos++;
                trocarJogador();
            }

            quadrado.style.backgroundColor = "";
        };
    });

    function trocarJogador() {
        let pecasEl;
        
        x = !x;
        o = !o;
    
        if (movimentos < 6) {
            pecasEl = document.querySelectorAll(".jogadores .pecas");

            pecasEl.forEach((peca) => {
                peca.draggable = !peca.draggable;
            });
        } else if (movimentos === 6) {
            pecasEl = document.querySelectorAll(".pecas");

            let pecasXEl = document.querySelectorAll(".peca-x");
            let pecasOEl = document.querySelectorAll(".peca-o");

            pecasXEl.forEach((peca) => {
                peca.draggable = x;
            });

            pecasOEl.forEach((peca) => {
                peca.draggable = o;
            });
        } else {
            pecasEl = document.querySelectorAll(".pecas");

            pecasEl.forEach((peca) => {
                peca.draggable = !peca.draggable;
            });
        }

        if (x) {
            jogador1El.classList.remove("disativado");
            jogador1El.classList.add("ativo");
            jogador2El.classList.remove("ativo");
            jogador2El.classList.add("disativado");
        } else {
            jogador1El.classList.remove("ativo");
            jogador1El.classList.add("disativado");
            jogador2El.classList.remove("disativado");
            jogador2El.classList.add("ativo");
        }

        checarGanhador();
    }
}
