'use strict';

angular.module('loupGarou_BackEnd',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Chats',{templateUrl:'views/Chat/search.html',controller:'SearchChatController'})
      .when('/Chats/new',{templateUrl:'views/Chat/detail.html',controller:'NewChatController'})
      .when('/Chats/edit/:ChatId',{templateUrl:'views/Chat/detail.html',controller:'EditChatController'})
      .when('/Joueurs',{templateUrl:'views/Joueur/search.html',controller:'SearchJoueurController'})
      .when('/Joueurs/new',{templateUrl:'views/Joueur/detail.html',controller:'NewJoueurController'})
      .when('/Joueurs/edit/:JoueurId',{templateUrl:'views/Joueur/detail.html',controller:'EditJoueurController'})
      .when('/Messages',{templateUrl:'views/Message/search.html',controller:'SearchMessageController'})
      .when('/Messages/new',{templateUrl:'views/Message/detail.html',controller:'NewMessageController'})
      .when('/Messages/edit/:MessageId',{templateUrl:'views/Message/detail.html',controller:'EditMessageController'})
      .when('/Participations',{templateUrl:'views/Participation/search.html',controller:'SearchParticipationController'})
      .when('/Participations/new',{templateUrl:'views/Participation/detail.html',controller:'NewParticipationController'})
      .when('/Participations/edit/:ParticipationId',{templateUrl:'views/Participation/detail.html',controller:'EditParticipationController'})
      .when('/Parties',{templateUrl:'views/Partie/search.html',controller:'SearchPartieController'})
      .when('/Parties/new',{templateUrl:'views/Partie/detail.html',controller:'NewPartieController'})
      .when('/Parties/edit/:PartieId',{templateUrl:'views/Partie/detail.html',controller:'EditPartieController'})
      .when('/Roles',{templateUrl:'views/Role/search.html',controller:'SearchRoleController'})
      .when('/Roles/new',{templateUrl:'views/Role/detail.html',controller:'NewRoleController'})
      .when('/Roles/edit/:RoleId',{templateUrl:'views/Role/detail.html',controller:'EditRoleController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
