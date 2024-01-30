const modalInicialEl = $("#modal-inicial");

$(window).on("load", () => {
    modalInicialEl.modal("show");
});

let x = null;
let o = null;

const btnEscolhaXEl = document.querySelector("#btn-chose-x");
const btnEscolhaOEl = document.querySelector("#btn-chose-o");
const btnComecarEl = document.querySelector("#btn-start");

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

const pontuacoesEl = document.querySelector("#scores");

pontuacoesEl.addEventListener("click", () => {
    const modalPontuacoesEl = $("#modal-pontuacoes");
    const conteudoModalPontuacoesEl = document.querySelector(
        "#modal-content-pontuacoes"
    );
    modalPontuacoesEl.modal("show");
});
