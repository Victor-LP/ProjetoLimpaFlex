document.addEventListener("DOMContentLoaded", function () {
    const listaPendentes = document.querySelector(".pagamentos-lista-pendentes");
    const listaPagos = document.querySelector(".pagamentos-lista-pagos");
    const valorPrincipal = document.querySelector(".valor-principal");
    const valorReceber = document.querySelector(".valor-receber strong");

    const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

    function salvarServicos() {
        localStorage.setItem("servicos", JSON.stringify(servicos));
    }

    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function calcularReceber() {
        let total = 0;

        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].pago !== true) {
                total += Number(servicos[i].valor || 0);
            }
        }

        return total;
    }

    function calcularRecebido() {
        let total = 0;

        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].pago === true) {
                total += Number(servicos[i].valor || 0);
            }
        }

        return total;
    }

    function criarCard(servico, indice) {
        const article = document.createElement("article");
        article.classList.add("artigo");
        article.classList.add("card-pagamento");

        if (servico.pago === true) {
            article.classList.add("card-pago");
        }

        article.innerHTML = `
            <header class="cliente-info">
                <img src="./assets/img/woman.png" alt="cliente" class="icon">
                <h3>${servico.nomeCliente || "Sem nome"}</h3>
            </header>

            <ul class="servicos-lista">
                <li>
                    <span>Serviço</span>
                    <span>${formatarMoeda(servico.valor)}</span>
                </li>
            </ul>

            <footer class="total-box">
                <strong>Total</strong>
                <strong class="${servico.pago ? "tag-pago" : "tag-pendente"}">
                    ${formatarMoeda(servico.valor)} (${servico.pago ? "Pago" : "Pendente"})
                </strong>
                <button type="button" class="botao-pagar">
                    ${servico.pago ? "Desmarcar como Pago" : "Marcar como Pago"}
                </button>
            </footer>
        `;

        const botao = article.querySelector(".botao-pagar");

        botao.addEventListener("click", function () {
            servicos[indice].pago = !servicos[indice].pago;
            salvarServicos();
            exibir();
        });

        return article;
    }

    function exibir() {
        listaPendentes.innerHTML = `
            <h2 class="titulo-secao">Pagamentos Pendentes</h2>
        `;

        listaPagos.innerHTML = `
            <h2 class="titulo-secao">Pagamentos Pagos</h2>
        `;

        valorPrincipal.textContent = formatarMoeda(calcularRecebido());
        valorReceber.textContent = formatarMoeda(calcularReceber());

        let temPendente = false;
        let temPago = false;

        for (let i = 0; i < servicos.length; i++) {
            const servico = servicos[i];
            const card = criarCard(servico, i);

            if (servico.pago === true) {
                temPago = true;
                listaPagos.appendChild(card);
            } else {
                temPendente = true;
                listaPendentes.appendChild(card);
            }
        }

        if (!temPendente) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum pagamento pendente.";
            mensagem.classList.add("sem-pagamentos");
            listaPendentes.appendChild(mensagem);
        }

        if (!temPago) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum pagamento realizado.";
            mensagem.classList.add("sem-pagamentos");
            listaPagos.appendChild(mensagem);
        }
    }

    exibir();
});