
angular.module('loupGarou_BackEnd').controller('NewJoueurController', function ($scope, $location, locationParser, flash, JoueurResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.joueur = $scope.joueur || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The joueur was created successfully.'});
            $location.path('/Joueurs');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        JoueurResource.save($scope.joueur, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Joueurs");
    };
});