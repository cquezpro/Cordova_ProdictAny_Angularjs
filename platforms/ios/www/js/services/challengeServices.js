'use strict';

/* Services */

var challengeServices = angular.module('challengeServices', ['ngResource']);

challengeServices.factory('challengeService', ['$http',
  function($http){
    var root = {};

    root.getChallengesOnRound = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/challenge/getChallengesOnRound?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };

    root.getAllChallenges = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/challenge/getAllChallenges?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };

    root.acceptChallenge = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/challenge/acceptChallenge?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };
    
    root.sendChallenge = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/challenge/sendChallenge?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };

    root.sendChallengeRandom = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/challenge/sendChallengeRandom?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };

    return root;
  }]);


