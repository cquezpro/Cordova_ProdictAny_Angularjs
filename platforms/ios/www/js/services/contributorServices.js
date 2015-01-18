'use strict';

/* Services */

var contributorServices = angular.module('contributorServices', ['ngResource']);

contributorServices.factory('contributorService', ['$http',
  function($http){
    var root = {};

    root.sendData = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/contribution/save?callback=JSON_CALLBACK'
        };
        return $http(conf);
    };
    
    return root;
  }]);


