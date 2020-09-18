angular.module('loupGarou_BackEnd').factory('RoleResource', function($resource){
    var resource = $resource('rest/roles/:RoleId',{RoleId:'@roleId'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});