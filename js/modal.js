const mainModalEl = $("#modal-main");

$(window).on("load", () => {
    mainModalEl.modal("show");
});

let x = null;
let o = null;

const btnSelectedXEl = document.querySelector("#btn-selected-x");
const btnSelectedOEl = document.querySelector("#btn-selected-o");
const btnStartEl = document.querySelector("#btn-start");

btnSelectedXEl.addEventListener("click", function () {
    btnSelectedXEl.classList.add("selected");
    btnSelectedOEl.classList.remove("selected");

    x = true;
    o = false;
});

btnSelectedOEl.addEventListener("click", function () {
    btnSelectedOEl.classList.add("selected");
    btnSelectedXEl.classList.remove("selected");

    x = false;
    o = true;
});

btnStartEl.addEventListener("click", () => {
    if (x !== null && o !== null) {
        startGame(x, o);
        mainModalEl.modal("hide");
    }
});
