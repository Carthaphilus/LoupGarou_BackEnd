angular.module('loupGarou_BackEnd').factory('ParticipationResource', function($resource){
    var resource = $resource('rest/participations/:ParticipationId',{ParticipationId:'@joueurId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});