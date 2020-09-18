

angular.module('loupGarou_BackEnd').controller('EditMessageController', function($scope, $routeParams, $location, flash, MessageResource , JoueurResource, PartieResource, ChatResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.message = new MessageResource(self.original);
            JoueurResource.queryAll(function(items) {
                $scope.joueurIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        joueurId : item.joueurId
                    };
                    var labelObject = {
                        value : item.joueurId,
                        text : item.nom
                    };
                    if($scope.message.joueurId && item.joueurId == $scope.message.joueurId.joueurId) {
                        $scope.joueurIdSelection = labelObject;
                        $scope.message.joueurId = wrappedObject;
                        self.original.joueurId = $scope.message.joueurId;
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
                    if($scope.message.partieId && item.partieId == $scope.message.partieId.partieId) {
                        $scope.partieIdSelection = labelObject;
                        $scope.message.partieId = wrappedObject;
                        self.original.partieId = $scope.message.partieId;
                    }
                    return labelObject;
                });
            });
            ChatResource.queryAll(function(items) {
                $scope.chatIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        chatId : item.chatId
                    };
                    var labelObject = {
                        value : item.chatId,
                        text : item.libelleChat
                    };
                    if($scope.message.chatId && item.chatId == $scope.message.chatId.chatId) {
                        $scope.chatIdSelection = labelObject;
                        $scope.message.chatId = wrappedObject;
                        self.original.chatId = $scope.message.chatId;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The message could not be found.'});
            $location.path("/Messages");
        };
        MessageResource.get({MessageId:$routeParams.MessageId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.message);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The message was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.message.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Messages");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The message was deleted.'});
            $location.path("/Messages");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.message.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("joueurIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.message.joueurId = {};
            $scope.message.joueurId.joueurId = selection.value;
        }
    });
    $scope.$watch("partieIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.message.partieId = {};
            $scope.message.partieId.partieId = selection.value;
        }
    });
    $scope.$watch("chatIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.message.chatId = {};
            $scope.message.chatId.chatId = selection.value;
        }
    });
    
    $scope.get();
});