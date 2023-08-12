var geocoder;
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


function codeAddress() {
    var address  = document.getElementById('address').value;
    geocoder.geocode( { 'address': address }, function(results, status ) {
        if(status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            document.getElementById("lat").value = marker.getPosition().lat();
            document.getElementById("lng").value = marker.getPosition().lng();
        } else {
            alert('Geocode was not successfull for the following reason: ' + status);
        }
    } );
}