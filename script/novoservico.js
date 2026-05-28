document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar =
        document.getElementById("btn-salvar");
    btnSalvar.addEventListener("click", function () {
        // Captura dos dados
        const nomeCliente =
            document.getElementById("nome-cliente").value;

        const favorito =
            document.querySelector(
                'input[name="favorito"]:checked'
            ).value;

        const rua =
            document.getElementById("rua").value;

        const numero =
            document.getElementById("numero").value;

        const bairro =
            document.getElementById("bairro").value;

        const temComplemento =
            document.querySelector(
                'input[name="tem-complemento"]:checked'
            ).value;

        const complemento =
            document.getElementById("complemento").value;

        const dataHora =
            document.getElementById("data-hora").value;

        const valor =
            document.getElementById("valor").value;

        // VALIDAÇÃO
        if (
            nomeCliente === "" ||
            rua === "" ||
            numero === "" ||
            bairro === "" ||
            dataHora === "" ||
            valor === ""
        ) {

            alert("Preencha todos os campos obrigatórios!");

            return;
        }

        // complemento obrigatório
        if (
            temComplemento === "sim" &&
            complemento === ""
        ) {

            alert("Preencha o complemento!");

            return;
        }

        // objeto do serviço
        const servico = {

            nomeCliente: nomeCliente,

            favorito: favorito,

            endereco: {

                rua: rua,

                numero: numero,

                bairro: bairro,

                complemento:
                    temComplemento === "sim"
                    ? complemento
                    : ""
            },

            dataHora: dataHora,

            valor: valor,

            pago: false
        };

        // pega serviços existentes
        const servicos =
            JSON.parse(localStorage.getItem("servicos"))
            || [];

        // adiciona novo
        servicos.push(servico);

        // salva
        localStorage.setItem(
            "servicos",
            JSON.stringify(servicos)
        );

        alert("Serviço salvo com sucesso!");

        // limpa formulário
        const inputs =
            document.querySelectorAll("input");

        for (let i = 0; i < inputs.length; i++) {

            const input = inputs[i];

            if (input.type === "radio") {

                if (input.value === "nao") {

                    input.checked = true;
                }

            } else {

                input.value = "";
            }
            window.location.href = "index.html";
        }
    });
});