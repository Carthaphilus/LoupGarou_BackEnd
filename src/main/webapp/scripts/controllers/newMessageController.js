
angular.module('loupGarou_BackEnd').controller('NewMessageController', function ($scope, $location, locationParser, flash, MessageResource , JoueurResource, PartieResource, ChatResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.message = $scope.message || {};
    
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
            $scope.message.joueurId = {};
            $scope.message.joueurId.joueurId = selection.value;
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
            $scope.message.partieId = {};
            $scope.message.partieId.partieId = selection.value;
        }
    });
    
    $scope.chatIdList = ChatResource.queryAll(function(items){
        $scope.chatIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.chatId,
                text : item.libelleChat
            });
        });
    });
    $scope.$watch("chatIdSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.message.chatId = {};
            $scope.message.chatId.chatId = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The message was created successfully.'});
            $location.path('/Messages');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        MessageResource.save($scope.message, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Messages");
    };
});