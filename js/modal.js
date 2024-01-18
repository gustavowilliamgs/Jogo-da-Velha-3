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
