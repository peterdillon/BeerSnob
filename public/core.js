var createBrewery = angular.module('createBrewery', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all breweries and show them
    $http.get('/api/breweries')
        .success(function(data) {
            $scope.breweries = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createBrewery = function() {
        $http.post('/api/breweries', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.breweries = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a brewery after checking it
    $scope.deleteBrewery = function(id) {
        $http.delete('/api/breweries/' + id)
            .success(function(data) {
                $scope.breweries = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
