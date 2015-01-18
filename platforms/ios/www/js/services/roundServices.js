'use strict';

/* Services */

var roundServices = angular.module('roundServices', ['ngResource']);

roundServices.factory('roundService', ['$http',
  function($http){
    var root = {};

    root.getRoundData = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/getRoundData?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };

    root.pushRoundPlayResults = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/pushRoundPlayResults?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };

    root.getNextRoundToPlay = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/round/getNextRoundToPlay?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    };

    

    return root;
  }]);


