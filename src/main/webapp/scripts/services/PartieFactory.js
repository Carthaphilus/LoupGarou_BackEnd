angular.module('loupGarou_BackEnd').factory('PartieResource', function($resource){
    var resource = $resource('rest/parties/:PartieId',{PartieId:'@partieId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});