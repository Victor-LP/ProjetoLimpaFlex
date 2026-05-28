// Seleciona o iframe do mapa
const mapa = document.getElementById('map');

// Carrega o mapa usando latitude e longitude
function carregarMapa(lat, lon) {

    // Define o zoom aproximado
    const delta = 0.01;

    // Define a área exibida no mapa
    const bbox =
        `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;

    // Atualiza a URL do iframe
    mapa.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
        `&layer=mapnik` +
        `&marker=${lat}%2C${lon}`;
}

// Busca o endereço digitado, async permite executar tarefas sem bloquear o restante do programa enquanto espera uma resposta.
async function buscarEndereco() {
    // Pega o valor do input
    const input = document.getElementById('address');
    const endereco = input.value.trim();
    // Verifica se o campo está vazio
    if (!endereco) {
        alert('Digite um endereço');
        return;
    }
    try {
        // Faz a requisição para a API
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(endereco)}`
        );
        // Converte resposta em dicionário JSON
        const dados = await response.json();
        // Verifica se encontrou resultado
        if (!dados.length) {
            alert('Endereço não encontrado');
            return;
        }
        // Obtém latitude e longitude
        const lat = Number(dados[0].lat);
        const lon = Number(dados[0].lon);
        carregarMapa(lat, lon);
    } catch (erro) {
        // Trata erros
        console.error(erro);
        alert('Erro ao buscar endereço');
    }
}
// Carrega mapa inicial (São Paulo)
carregarMapa(-23.55052, -46.633308);