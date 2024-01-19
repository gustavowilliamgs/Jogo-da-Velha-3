const modalInicialEl = $("#modal-inicial");

$(window).on("load", () => {
    modalInicialEl.modal("show");
});

let x = null;
let o = null;

const btnChoseXEl = document.querySelector("#btn-chose-x");
const btnChoseOEl = document.querySelector("#btn-chose-o");
const btnStartEl = document.querySelector("#btn-start");

btnChoseXEl.addEventListener("click", function () {
    btnChoseXEl.classList.add("selected");
    btnChoseOEl.classList.remove("selected");

    x = true;
    o = false;
});

btnChoseOEl.addEventListener("click", function () {
    btnChoseOEl.classList.add("selected");
    btnChoseXEl.classList.remove("selected");

    x = false;
    o = true;
});

btnStartEl.addEventListener("click", () => {
    if (x !== null && o !== null) {
        startGame(x, o);
        modalInicialEl.modal("hide");
    }
});
