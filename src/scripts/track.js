var map;
function initMap() {
    geocoder = new google.maps.Geocoder();
    
    var mapOptions = {
        zoom: 15,
        center: {lat: 28.6616556, lng: -106.0401853}
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        position: {lat: 28.6616556, lng: -106.0401853}, // Ubicación del marcador
        map: map, // Mapa al que se añadirá el marcador
        icon: '/src/icons/Mark2_64px.png',
        title: 'Current location' // Título del marcador (se muestra al pasar el mouse sobre él)
      });
}

function displayMap () {
    document.getElementById("map").classList.remove("hidden");
    document.getElementById("main").classList.add("hidden");
}