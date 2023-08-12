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

//document.getElementById("reports").innerHTML = 
/*
function codeAddress() {
    var address  = document.getElementById('address').value;
    geocoder.geocode( { 'address': address }, function(results, status ) {
        if(status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successfull for the following reason: ' + status);
        }
    } );
}
*/