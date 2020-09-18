angular.module('loupGarou_BackEnd').factory('MessageResource', function($resource){
    var resource = $resource('rest/messages/:MessageId',{MessageId:'@idMessage'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});