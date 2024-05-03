document.querySelector("#btn-salvar").addEventListener("click", () => {
    let nome1 = document.querySelector("#nome-1").innerText;
    let nome2 = document.querySelector("#nome-2").innerText;

    document.querySelector("#nome-jogador-1").innerText = nome1;
    document.querySelector("#nome-jogador-2").innerText = nome2;

    localStorage.setItem("nome-x", nome1);
    localStorage.setItem("nome-o", nome2);
});
