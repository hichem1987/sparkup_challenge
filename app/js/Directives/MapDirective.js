
app.directive('myMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;

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
//        initMap();

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
        var map;
        var geoJSON;
        var request;
        var gettingData = false;
        var openWeatherMapKey = "6388e90b5a8691a9f883c4d50992eafe"

        function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(46.227638, 2.213749),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('gmaps'),
                    mapOptions);
            // Add interaction listeners to make weather requests
            google.maps.event.addListener(map, 'idle', checkIfDataRequested);

            // Sets up and populates the info window with details
            var cities =[{"id":"1","city":"Paris","widget_id":"777533252349390848","content":"test"},{"id":"2","city":"Marseille","lat":"43.296482","long":"5.369780","content":"test"},{"id":"3","city":"Lyon","widget_id":"777556989165658112","lat":"45.764043","long":"4.835659","content":""},{"id":"4","city":"Toulouse","widget_id":"777544823846866945","lat":"43.604652","long":"1.444209","content":""},{"id":"5","city":"Nice","widget_id":"777558121959059456","lat":"43.710173","long":"7.261953","content":""},{"id":"6","city":"Nantes","widget_id":"777548931173613568","lat":"47.218371","long":"-1.553621","content":""},{"id":"7","city":"Bordeaux","widget_id":"777557711995203584","lat":"47.218371","long":"-1.553621","content":""},{"id":"8","city":"Brest","widget_id":"777558736286154752","lat":"47.218371","long":"-1.553621","content":""},{"id":"9","city":"Rennes","widget_id":"777559437837996032","lat":"47.218371","long":"-1.553621","content":""},{"id":"10","city":"Amiens","widget_id":"777559966832029697","lat":"47.218371","long":"-1.553621","content":""},{"id":"11","city":"Saint-Etienne","widget_id":"777560602826960896","lat":"47.218371","long":"-1.553621","content":""},{"id":"12","city":"Dijon","widget_id":"777561498281447424","lat":"47.218371","long":"-1.553621","content":""},{"id":"13","city":"Troyes","widget_id":"777562532705931265","lat":"47.218371","long":"-1.553621","content":""},{"id":"14","city":"Douai","widget_id":"777565555142385664","lat":"47.218371","long":"-1.553621","content":""}];
            map.data.addListener('click', function (event) {
                var widget_id = null;

                var city_name = event.feature.getProperty("city");
                city_name = event.feature.getProperty("city");
                for (var i = 0; i < cities.length; i++) {

                    if (cities[i].city === city_name) {
                        widget_id = cities[i].widget_id;
                        console.log('json ' + cities[i].city);
                        console.log('map ' + city_name);
//                        break;
                    }
                }
                infowindow.setContent(
                        "<div class='infowindow-content'> <img src=" + event.feature.getProperty("icon") + ">"
                        + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
                        + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
                        + "<br />" + event.feature.getProperty("weather") + "<br/> <a class='twitter-timeline' data-dnt='true' href='https://twitter.com/hashtag/meteo%23" + city_name + "' data-widget-id='" + widget_id + "'>Tweets sur #meteo#" + city_name + "</a> </div>"

                        );
                infowindow.setOptions({
                    position: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    },
                    pixelOffset: {
                        width: 0,
                        height: -15
                    }
                });
                infowindow.open(map);
            });
            google.maps.event.addListener(infowindow, 'domready', function () {

                !function (d, s, id) {
                                    console.log(' id '+id);
                    var js, fjs = d.getElementsByTagName(s)[0];
//                    if (d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
//                    }
                }(document, "script", "twitter-wjs");
            });
        }

        var checkIfDataRequested = function () {
            // Stop extra requests being sent
            while (gettingData === true) {
                request.abort();
                gettingData = false;
            }
//    getCoords();
            getWeather(50.97462179957645, 8.178704101562516, 42.16682285144556, -4.991163085937501);


        };

        // Get the coordinates from the Map bounds
//  var getCoords = function() {
//    var bounds = map.getBounds();
//    var NE = bounds.getNorthEast();
//    var SW = bounds.getSouthWest();
//   
//  };

        // Make the weather request
        var getWeather = function (northLat, eastLng, southLat, westLng) {
            gettingData = true;
            var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                    + westLng + "," + northLat + "," //left top
                    + eastLng + "," + southLat + "," //right bottom
                    + map.getZoom()
                    + "&cluster=yes&format=json"
                    + "&APPID=" + openWeatherMapKey;
            request = new XMLHttpRequest();
            request.onload = proccessResults;
            request.open("get", requestString, true);
            request.send();
        };

        // Take the JSON results and proccess them
        var proccessResults = function () {
            var array_cities = ['Koeln', 'Torino', 'Nevers', 'Plymouth', 'Brussels'];

            var results = JSON.parse(this.responseText);
            if (results.list.length > 0) {
                resetData();
                for (var i = 0; i < results.list.length; i++) {
                    console.log(results.list[i].name);
                    if (array_cities.indexOf(results.list[i].name) > -1) {
                        continue;
                    }
                    geoJSON.features.push(jsonToGeoJson(results.list[i]));
                }
                drawIcons(geoJSON);
            }
        };

        var infowindow = new google.maps.InfoWindow();

        // For each result that comes back, convert the data to geoJSON
        var jsonToGeoJson = function (weatherItem) {
            var feature = {
                type: "Feature",
                properties: {
                    city: weatherItem.name,
                    weather: weatherItem.weather[0].main,
                    temperature: weatherItem.main.temp,
                    min: weatherItem.main.temp_min,
                    max: weatherItem.main.temp_max,
                    humidity: weatherItem.main.humidity,
                    pressure: weatherItem.main.pressure,
                    windSpeed: weatherItem.wind.speed,
                    windDegrees: weatherItem.wind.deg,
                    windGust: weatherItem.wind.gust,
                    icon: "http://openweathermap.org/img/w/"
                            + weatherItem.weather[0].icon + ".png",
                    coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
                },
                geometry: {
                    type: "Point",
                    coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
                }
            };
            // Set the custom marker icon
            map.data.setStyle(function (feature) {
                return {
                    icon: {
                        url: feature.getProperty('icon'),
                        anchor: new google.maps.Point(25, 25)
                    }
                };
            });

            // returns object
            return feature;
        };

        // Add the markers to the map
        var drawIcons = function (weather) {
            map.data.addGeoJson(geoJSON);
            // Set the flag to finished
            gettingData = false;
        };

        // Clear data layer and geoJSON
        var resetData = function () {
            geoJSON = {
                type: "FeatureCollection",
                features: []
            };
            map.data.forEach(function (feature) {
                map.data.remove(feature);
            });
        };

        google.maps.event.addDomListener(window, 'load', initialize);
//        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});

