function initMap() {
  // Localização do salão (latitude e longitude)
  const salaoLocation = { lat: -23.572360662185243, lng: -46.506408942329394 }; // Exemplo: São Paulo
  // Criação do mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15, // Nível de zoom
    center: salaoLocation, // Centro do mapa
  });
  // Adicionar um marcador
  const marker = new google.maps.Marker({
    position: salaoLocation,
    map: map,
    title: "Buffet Montello", // Texto ao passar o mouse
  });
}
