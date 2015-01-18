'use strict';

/* Services */

var specialEventServices = angular.module('specialEventServices', ['ngResource']);

specialEventServices.factory('specialEventService', ['$http',
  function($http){
    var root = {};      
    
    root.getSpecialEvents = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/specialevents/getSpecialEvents?callback=JSON_CALLBACK'
        };        
        return $http(conf);
        
    };
    
   
    
    return root;
  }]);


