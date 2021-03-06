(function () {
    function GetApi($http) {
        var weatherData = {
            city: "-",
            temp: "0",
            weather: "-",
            icon: "http://icons.wxug.com/i/c/k/sunny.gif"
        }

        return {
            returnResults: returnResults,
            searchWeather: searchWeather
        };

        function searchWeather(city) {
            city = city.replace(/ /g,'_');
            weatherData.city = "";
            
            return $http({
                method: 'GET',
                url: 'http://api.wunderground.com/api/6223b2f5321ee9e1/conditions/q/michigan/' + city + '.json'
            }).then(function successfulCallback(response) {
                console.log(city);
                weatherData.city = response.data.current_observation.display_location.full;
                weatherData.temp = response.data.current_observation.temp_f;
                weatherData.temp = parseInt(weatherData.temp);
                weatherData.temp = Math.floor(weatherData.temp);
                weatherData.weather = response.data.current_observation.weather;
                weatherData.icon = response.data.current_observation.icon_url;
                console.log(weatherData.city);
            }, function (error) {
                console.log(error);
            });
        }

        function returnResults() {
            return weatherData;
        }
    }

    angular
        .module("app")
        .factory("GetApi", GetApi);
})();