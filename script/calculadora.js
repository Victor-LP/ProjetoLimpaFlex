document.addEventListener("DOMContentLoaded", function () {
    const cadastro =document.querySelector(".artigo");
    const calculadora = document.querySelector(".calculadora-main");
    const botaoSimular =document.getElementById("simular");
    const campoPreco = document.getElementById("valor");
    const areaCalculadora =document.querySelector(".simulador");

    // começa escondendo a calculadora
    calculadora.style.display = "none";

    function mostrarCadastro() {
        cadastro.style.display = "flex";

        calculadora.style.display = "none";
    }

    function mostrarCalculadora() {

        cadastro.style.display = "none";

        calculadora.style.display = "flex";
    }

    areaCalculadora.style.cursor = "pointer";

    areaCalculadora.addEventListener(
        "click",
        mostrarCalculadora
    );

    botaoSimular.addEventListener(
        "click",
        function () {

            const inputsNumericos =
                calculadora.querySelectorAll(
                    'input[type="number"]'
                );

            const quartos =
                Number(inputsNumericos[0].value) || 0;

            const banheiros =
                Number(inputsNumericos[1].value) || 0;

            const moradia =
                document.querySelector(
                    'input[name="moradia"]:checked'
                );

            const extras =
                calculadora.querySelectorAll(
                    'input[type="checkbox"]'
                );

            // simulação
            let preco = 150;
            preco += quartos * 30;
            preco += banheiros * 20;
            if (moradia) {

                if (moradia.value === "casa") {
                    preco *= 1.5;
                }

                if (moradia.value === "apartamento") {
                    preco *= 1.2;
                }

                if (moradia.value === "studio") {
                    preco *= 1.1;
                }
            }
            for (let i = 0; i < extras.length; i++) {

                if (extras[i].checked) {

                    preco += 25;
                }
            }
            campoPreco.value =
                preco.toFixed(2);

            mostrarCadastro();
        }
    );
});