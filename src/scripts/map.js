var geocoder;
var map;
function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(28.6140224, -106.125015);
    //var place = { lat: 28.6140224, lng: -106.125015 };

    var mapOptions = {
        zoom: 13,
        center: latlng
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}


//document.getElementById("reports").innerHTML =
/*
fetch('https://paw-seekers-api-vented5.vercel.app/api/missing_nearby/12')
    .then(response => {
        if(!response.ok){
            throw new Error('Error en la llamada de la apu');
        }
        return response.json();
    })
    .then(data => {
        //Aqui se despliega
        document.getElementById("reports").innerHTML += "<img src='"+ data.pets[0].imgUrl +"'>"
        console.log(data.pets[0].imgUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    }); 
*/
async function missingPetsFeed () {
        
    try {
        const response = await fetch('https://paw-seekers-api-vented5.vercel.app/api/missing_nearby/12');
        if(!response.ok){
            throw new Error('Error en la llamada de la api');
        }

        const data = await response.json();
        const reportCards = data.pets.map(item => generateReportCard(item)).join('');
        document.getElementById("reports").innerHTML += reportCards;
    } catch (error) {
        console.error('Error:', error);
    }

}



function generateReportCard (cardData) {
    console.log(cardData.coordinates);
    var marker = new google.maps.Marker({
        position: cardData.coordinates, // Ubicación del marcador
        map: map, // Mapa al que se añadirá el marcador
        icon: '/src/icons/Mark2_64px.png',
        title: cardData.name // Título del marcador (se muestra al pasar el mouse sobre él)
      });
    return `
        <div class="flex  border border-teal-400 rounded-xl">
            <img src="${cardData.imgUrl}" alt="${cardData.name}_photo" class="h-40 w-40 rounded-l-xl">
            <div class="m-2">
                <h1 class="text-xl">${cardData.name}</h1>
                <p>${cardData.color}</p>
                <p>${cardData.characteristics}</p>
                <p>${cardData.accesories}</p>
                <p>${cardData.lastLocation}</p>
                <p>Ultima vez visto:</p>
                <p></p>
            </div>

        </div>
    `;
}

missingPetsFeed();

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