'use strict';

/* Services */

var statServices = angular.module('statServices', ['ngResource']);

statServices.factory('statService', ['$http',
  function($http){
    var root = {};      
    
    root.getCategoryStatistics = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/stat/getStatByCategory?callback=JSON_CALLBACK'
        };        
        return $http(conf);
        
    };
    
   
    
    return root;
  }]);


