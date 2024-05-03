const modalInicialEl = $("#modal-inicial");

$(window).on("load", () => {
    modalInicialEl.modal("show");
});

let x = null;
let o = null;

const btnEscolhaXEl = document.querySelector("#btn-escolha-x");
const btnEscolhaOEl = document.querySelector("#btn-escolha-o");
const btnComecarEl = document.querySelector("#btn-iniciar");

btnEscolhaXEl.addEventListener("click", function () {
    btnEscolhaXEl.classList.add("selected");
    btnEscolhaOEl.classList.remove("selected");

    x = true;
    o = false;
});

btnEscolhaOEl.addEventListener("click", function () {
    btnEscolhaOEl.classList.add("selected");
    btnEscolhaXEl.classList.remove("selected");

    x = false;
    o = true;
});

btnComecarEl.addEventListener("click", () => {
    if (x !== null && o !== null) {
        comecarJogo(x, o);
        modalInicialEl.modal("hide");
    }
});

const pontuacoesEl = document.querySelector("#placares");

const modalPontuacoesEl = $("#modal-pontuacoes");
pontuacoesEl.addEventListener("click", () => {
    let pontuacaoX = localStorage.getItem("pontuacao-x");
    let pontuacaoO = localStorage.getItem("pontuacao-o");
    let nome1 = localStorage.getItem("nome-x");
    let nome2 = localStorage.getItem("nome-o");

    const conteudoModalPontuacoesEl = `
        <div class="jogador" id="jogador-1">
            <p class="nome" id="nome-1" contenteditable>${nome1}</p>
            <span class="vitorias">${pontuacaoX} vitórias</span>
        </div>
        <div class="jogador" id="jogador-2">
            <p class="nome" id="nome-2" contenteditable>${nome2}</p>
            <span class="vitorias">${pontuacaoO} vitórias</span>
        </div>
    `;

    const configuracaoModal = document.querySelector(".modal-body-configuracoes");

    configuracaoModal.innerHTML = conteudoModalPontuacoesEl;

    modalPontuacoesEl.modal("show");
});
