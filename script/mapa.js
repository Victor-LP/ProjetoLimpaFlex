let map;
let marker;

function mapa() {
  map = L.map('map').setView([-23.55052, -46.633308], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
}
async function buscarEndereco() {
  const endereco = document.getElementById('address').value;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
  );

  const data = await response.json();

  if (data.length === 0) {
    alert('Endereço não encontrado');
    return;
  }

  const lat = data[0].lat;
  const lon = data[0].lon;

  map.setView([lat, lon], 16);

  if (marker) {
    map.removeLayer(marker);
  }
  //Mecher dps para adicionar os endereços das patroas no mapa
  marker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup(endereco)
    .openPopup();
}

window.onload = mapa;