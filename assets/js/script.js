var brewBaseUrl = 'https://api.openbrewerydb.org/breweries'
var brewZip = ''
var map;
var service;
var infowindow;

function initMap(zip) {
    var sydney = new google.maps.LatLng(-33.867, 151.195);

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
    });

    var request = {
        query: "Bars",
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    var marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}

function search(eventObj) {
    eventObj.preventDefault();
    // var zipcode = document.querySelector('.input').value
    var zip = $('.input').val();
    initMap(zip);
}

function init() {

    // window.initMap = initMap;

    document.querySelector('.form-box')
    $('.form-box').submit(search);
}

init();
