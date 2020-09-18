angular.module('loupGarou_BackEnd').factory('ChatResource', function($resource){
    var resource = $resource('rest/chats/:ChatId',{ChatId:'@chatId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});