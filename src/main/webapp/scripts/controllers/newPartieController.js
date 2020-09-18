
angular.module('loupGarou_BackEnd').controller('NewPartieController', function ($scope, $location, locationParser, flash, PartieResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.partie = $scope.partie || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The partie was created successfully.'});
            $location.path('/Parties');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        PartieResource.save($scope.partie, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Parties");
    };
});