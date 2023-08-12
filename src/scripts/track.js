var map;
function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(28.6140224, -106.125015);
    //var place = { lat: 28.6140224, lng: -106.125015 };

    var mapOptions = {
        zoom: 15,
        center: latlng
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}