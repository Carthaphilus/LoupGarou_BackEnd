
angular.module('loupGarou_BackEnd').controller('NewChatController', function ($scope, $location, locationParser, flash, ChatResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.chat = $scope.chat || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The chat was created successfully.'});
            $location.path('/Chats');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        ChatResource.save($scope.chat, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Chats");
    };
});