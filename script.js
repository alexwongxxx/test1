function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.33031740207237, lng: 139.40676857217937 },
        zoom: 15,
        mapId: 'e582376b1751adb1'
    });
    directionsDisplay = new google.maps.DirectionsRenderer({ map });
    // Assuming you have localContextMapView defined somewhere
    localContextMapView = new LocalContextMapView(map); // Replace this line with the actual initialization of localContextMapView

    // Add this line to trigger the search
    localContextMapView.search();
}

if (navigator.geolocation) {
    // Use watchPosition to continuously monitor the user's location
    navigator.geolocation.watchPosition(function (position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        if (userMarker) {
            // If userMarker already exists, update its position
            userMarker.setPosition(newUserLocation);
        } else {
            // If userMarker doesn't exist, create a new one
            userMarker = new google.maps.Marker({
                position: newUserLocation,
                map: map,
                title: "現在地",
                animation: google.maps.Animation.DROP
            });

        const userInfowindow = new google.maps.InfoWindow({
            content: "現在地",
        });

        userMarker.addListener("click", () => {
            userInfowindow.open(map, userMarker);
        });
    }

        // Create markers at the second location
        const secondMarkers = [ // Use the correct variable name 'secondMarkers'
            [
                "茅ヶ崎市立小学校",
                35.32852016576156,
                139.4039231725753,
                "red.png",
                38,
                31,
                "名前:茅ヶ崎市立小学校"+"\n"+"説明"+"\n"+"所在地:茅ヶ崎市共恵一丁目10-23"
            ],
            [
                "茅ヶ崎市立西浜小学校",
                35.31850018921875,
                139.39710606413254,
                "red.png",
                38,
                31,
                "名前:"
            ], 
        ];

        for (let i = 0; i < secondMarkers.length; i++) {
            const currMarker = secondMarkers[i]; // Use 'secondMarkers' array

            const secondMarker = new google.maps.Marker({
                position: { lat: currMarker[1], lng: currMarker[2] },
                map: map,
                title: currMarker[0],
                icon: {
                    url: currMarker[3],
                    scaledSize: new google.maps.Size(currMarker[4], currMarker[5])
                },
                animation: google.maps.Animation.DROP
            });

            const secondInfowindow = new google.maps.InfoWindow({
                content: currMarker[6],
            });

            secondMarker.addListener("click", () => {
                secondInfowindow.open(map, secondMarker);
            });
        }
    });
} else {
    console.log('Geolocation is not supported by your browser.');
}

function calculateAndDisplayRoute() {
    const directionsService = new google.maps.DirectionsService();
    const start = new google.maps.LatLng(userLocation.lat, userLocation.lng); // Replace with the user's location
    const end = new google.maps.LatLng(DESTINATION_LATITUDE, DESTINATION_LONGITUDE); // Replace with the destination coordinates

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING // You can change the travel mode
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            console.error('Directions request failed: ' + status);
        }
    });
}
