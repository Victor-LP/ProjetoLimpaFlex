document.addEventListener("DOMContentLoaded", function () {

    const main = document.querySelector("main.destaque");

    const servicos =
        JSON.parse(localStorage.getItem("servicos"))||[];
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const data = document.getElementById("data");

    data.innerHTML = dataFormatada;

    function formatarData(dataHora) {

        if (!dataHora) {
            return "";
        }

        const data = new Date(dataHora);

        const dataFormatada = data.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const horaFormatada = data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });

        return dataFormatada + " - " + horaFormatada;
    }
    function montarEndereco(servico) {
        const e = servico.endereco || {};
        const partes = [];

        if (e.rua) {
            partes.push(e.rua);
        }

        if (e.numero) {
            partes.push(e.numero);
        }

        if (e.bairro) {
            partes.push(e.bairro);
        }

        return partes.join(", ");
    }

    function criarCard(servico) {

        const article = document.createElement("article");

        article.classList.add("artigo");

        article.innerHTML = `
            <img src="./assets/img/woman.png"
                 alt="cliente"
                 class="icon">

            <h2>
                ${servico.nomeCliente || "Sem nome"}
            </h2>

            <address>
                <a href="mapa.html">
                    ${montarEndereco(servico)}
                </a>
            </address>

            <time datetime="${servico.dataHora || ""}">
                ${formatarData(servico.dataHora)}
            </time>

            <p>
                Valor:
                R$ ${Number(servico.valor || 0).toFixed(2)}
            </p>

            <a href="#">
                Mais Detalhes sobre a Diaria
            </a>
        `;

        return article;
    }

    const cardsAntigos =
        document.querySelectorAll(".artigo");

    for (let i = 0; i < cardsAntigos.length; i++) {

        cardsAntigos[i].remove();
    }

    const servicosPendentes = [];

    for (let i = 0; i < servicos.length; i++) {

        if (servicos[i].pago !== true) {

            servicosPendentes.push(servicos[i]);
        }
    }

    if (servicosPendentes.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma diária pendente.";

        mensagem.classList.add("sem-diarias");

        main.appendChild(mensagem);

        return;
    }

    for (let i = 0; i < servicosPendentes.length; i++) {

        const card =
            criarCard(servicosPendentes[i]);

        main.appendChild(card);
    }
});