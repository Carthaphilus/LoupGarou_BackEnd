

angular.module('loupGarou_BackEnd').controller('EditParticipationController', function($scope, $routeParams, $location, flash, ParticipationResource , JoueurResource, RoleResource, PartieResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.participation = new ParticipationResource(self.original);
            JoueurResource.queryAll(function(items) {
                $scope.joueurIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        joueurId : item.joueurId
                    };
                    var labelObject = {
                        value : item.joueurId,
                        text : item.nom
                    };
                    if($scope.participation.joueurId && item.joueurId == $scope.participation.joueurId.joueurId) {
                        $scope.joueurIdSelection = labelObject;
                        $scope.participation.joueurId = wrappedObject;
                        self.original.joueurId = $scope.participation.joueurId;
                    }
                    return labelObject;
                });
            });
            RoleResource.queryAll(function(items) {
                $scope.roleIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        roleId : item.roleId
                    };
                    var labelObject = {
                        value : item.roleId,
                        text : item.libelle
                    };
                    if($scope.participation.roleId && item.roleId == $scope.participation.roleId.roleId) {
                        $scope.roleIdSelection = labelObject;
                        $scope.participation.roleId = wrappedObject;
                        self.original.roleId = $scope.participation.roleId;
                    }
                    return labelObject;
                });
            });
            PartieResource.queryAll(function(items) {
                $scope.partieIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        partieId : item.partieId
                    };
                    var labelObject = {
                        value : item.partieId,
                        text : item.resultat
                    };
                    if($scope.participation.partieId && item.partieId == $scope.participation.partieId.partieId) {
                        $scope.partieIdSelection = labelObject;
                        $scope.participation.partieId = wrappedObject;
                        self.original.partieId = $scope.participation.partieId;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The participation could not be found.'});
            $location.path("/Participations");
        };
        ParticipationResource.get({ParticipationId:$routeParams.ParticipationId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.participation);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The participation was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.participation.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Participations");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The participation was deleted.'});
            $location.path("/Participations");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.participation.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("joueurIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.participation.joueurId = {};
            $scope.participation.joueurId.joueurId = selection.value;
        }
    });
    $scope.$watch("roleIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.participation.roleId = {};
            $scope.participation.roleId.roleId = selection.value;
        }
    });
    $scope.$watch("partieIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.participation.partieId = {};
            $scope.participation.partieId.partieId = selection.value;
        }
    });
    $scope.chefList = [
        "true",
        "false"
    ];
    
    $scope.get();
});