const mapa = document.getElementById('map');

function carregarMapa(lat, lon) {

    const delta = 0.01;

    const bbox =
        `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;

    mapa.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
        `&layer=mapnik` +
        `&marker=${lat}%2C${lon}`;
}

async function buscarEndereco() {

    const input = document.getElementById('address');
    const endereco = input.value.trim();

    if (!endereco) {
        alert('Digite um endereço');
        return;
    }

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(endereco)}`
        );

        const dados = await response.json();

        if (!dados.length) {
            alert('Endereço não encontrado');
            return;
        }

        const lat = Number(dados[0].lat);
        const lon = Number(dados[0].lon);

        carregarMapa(lat, lon);

    } catch (erro) {

        console.error(erro);
        alert('Erro ao buscar endereço');

    }
}

/* mapa inicial */

carregarMapa(-23.55052, -46.633308);