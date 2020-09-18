
angular.module('loupGarou_BackEnd').controller('NewParticipationController', function ($scope, $location, locationParser, flash, ParticipationResource , JoueurResource, RoleResource, PartieResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.participation = $scope.participation || {};
    
    $scope.joueurIdList = JoueurResource.queryAll(function(items){
        $scope.joueurIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.joueurId,
                text : item.nom
            });
        });
    });
    $scope.$watch("joueurIdSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.participation.joueurId = {};
            $scope.participation.joueurId.joueurId = selection.value;
        }
    });
    
    $scope.roleIdList = RoleResource.queryAll(function(items){
        $scope.roleIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.roleId,
                text : item.libelle
            });
        });
    });
    $scope.$watch("roleIdSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.participation.roleId = {};
            $scope.participation.roleId.roleId = selection.value;
        }
    });
    
    $scope.partieIdList = PartieResource.queryAll(function(items){
        $scope.partieIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.partieId,
                text : item.resultat
            });
        });
    });
    $scope.$watch("partieIdSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.participation.partieId = {};
            $scope.participation.partieId.partieId = selection.value;
        }
    });
    
    $scope.chefList = [
        "true",
        "false"
    ];


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The participation was created successfully.'});
            $location.path('/Participations');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        ParticipationResource.save($scope.participation, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Participations");
    };
});