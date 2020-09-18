angular.module('loupGarou_BackEnd').factory('JoueurResource', function($resource){
    var resource = $resource('rest/joueurs/:JoueurId',{JoueurId:'@joueurId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});