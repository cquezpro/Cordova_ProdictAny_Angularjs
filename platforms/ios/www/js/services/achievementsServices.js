'use strict';

/* Services */

var achievementsServices = angular.module('achievementsServices', ['ngResource']);


achievementsServices.factory('achievementsService', ['$http',
  function($http){
    var root = {};

    root.getBelts = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/achievements/getBelts?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    
    root.getBadges = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/achievements/getUserBadges?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    }
    
    
    root.getCatStats = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/achievements/getCatStats?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    }
    
    root.getCatSingleStats = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/achievements/getCatSingleStats?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);
    }
    
    
    
    
    return root;
  }]);
