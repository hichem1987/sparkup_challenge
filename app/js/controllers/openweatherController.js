/* 
 * the author of the project
 * Hichem Hamdaoui
 * Email:hamdaoui.hichem@gmail.com
 */
app.controller('OpenWeatherCtrl',
        ['$scope', 'openWeatherMap', 'exampleLocations', 'stormLocations', 'ISO3166',
            function ($scope, openWeatherMap, exampleLocations, stormLocations, ISO3166) {
//                geocoding traitement
                var geocoder;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
                } else {
                    $scope.forecast = openWeatherMap.queryForecastDaily({
                        location: exampleLocations[ 0 ]
                    });
                }
//Get the latitude and the longitude;
                function successFunction(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;

                    codeLatLng(lat, lng);
                }

                function errorFunction(error) {
                    if (error.code == error.PERMISSION_DENIED) {
                        $scope.forecast = openWeatherMap.queryForecastDaily({
                            location: exampleLocations[ 0 ]
                        });
                    }
                    alert("Geocoder failed");
                }


                function codeLatLng(lat, lng) {

                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({'latLng': latlng}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {

                                //find country name
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                            //this is the object you are looking for
                                            city = results[0].address_components[i];
                                            break;
                                        }
                                    }
                                }
                                //city data
//                                alert(city.short_name + " city test " + city.long_name)
                                $scope.city_short_name = city.short_name;
                                if (typeof ($scope.city_short_name) !== "undefined" && $scope.city_short_name !== null) {

                                    $scope.forecast = openWeatherMap.queryForecastDaily({
                                        location: $scope.city_short_name
                                    });
                                } else {
                                    $scope.forecast = openWeatherMap.queryForecastDaily({
                                        location: exampleLocations[ 0 ]
                                    });
                                }
                            } else {
                                alert("No results found");
                            }
                        } else {
                            alert("Geocoder failed due to: " + status);
                        }
                    });
                }
                function init_geocoder() {

                    geocoder = new google.maps.Geocoder();
                }
                init_geocoder();
//                forecast traitement
                $scope.message = '';
                $scope.hasState = '';

                // Expose example locations to $scope
                $scope.exampleLocations = exampleLocations;
                $scope.stormLocations = stormLocations;
                $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';

                // On initialization load data for first example entry



                // Get forecast data for location as given in $scope.location
                $scope.getForecastByLocation = function () {

                    if ($scope.location == '' || $scope.location == undefined) {
                        $scope.hasState = 'has-warning';
                        $scope.message = 'Please provide a location';
                        return;
                    }

                    $scope.hasState = 'has-success';

                    $scope.forecast = openWeatherMap.queryForecastDaily({
                        location: $scope.location
                    });
                };

                // Set $scope.location and execute search on API
                $scope.setLocation = function (loc) {
                    $scope.location = loc;
                    $scope.getForecastByLocation();
                };

                // Get icon image url
                $scope.getIconImageUrl = function (iconName) {
                    return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
                };

            }])

