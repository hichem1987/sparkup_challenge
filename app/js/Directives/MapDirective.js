app.directive('myMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(46.227638, 2.213749),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
//        function setMarker(map, position, title, content) {
//            var marker;
//            var markerOptions = {
//                position: position,
//                map: map,
//                title: title,
//                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
//            };
//
//            marker = new google.maps.Marker(markerOptions);
//            markers.push(marker); // add marker to array
//            
//            google.maps.event.addListener(marker, 'click', function () {
//                // close window if not undefined
//                if (infoWindow !== void 0) {
//                    infoWindow.close();
//                }
//                // create new window
//                var infoWindowOptions = {
//                    content: content
//                };
//                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
//                infoWindow.open(map, marker);
//            });
//        }

        // show the map and place some markers
        initMap();

        /*         setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
         setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content'); */
        var markers = [
            {
                "id": "1",
                "city": "Paris",
                "lat": "48.856614",
                "long": "2.352222",
                "content": "test"
            },
            {
                "id": "2",
                "city": "Marseille",
                "lat": "43.296482",
                "long": "5.369780",
                "content": "non"
            },
            {
                "id": "3",
                "city": "Lyon",
                "lat": "45.764043",
                "long": "4.835659",
                "content": "ok"
            },
            {
                "id": "4",
                "city": "Toulouse",
                "lat": "43.604652",
                "long": "1.444209",
                "content": "test"
            },
            {
                "id": "5",
                "city": "Nice",
                "lat": "43.710173",
                "long": "7.261953",
                "content": "test"
            },
            {
                "id": "6",
                "city": "Nantes",
                "lat": "47.218371",
                "long": "-1.553621",
                "content": "test"
            }

        ];
var infowindow = null;
/* now inside your initialise function */
infowindow = new google.maps.InfoWindow({
content: "holding..."
});        
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var markerOptions = {
                position: new google.maps.LatLng(marker.lat, marker.long),
                map: map,
                title: marker.city,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);

            google.maps.event.addListener(marker, 'click', function () {
// where I have added .html to the marker object.
                infowindow.setContent(this.content);
                infowindow.open(map, this);
            });
        }

//        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});

