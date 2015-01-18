'use strict';

/* Services */

var storeServices = angular.module('storeServices', ['ngResource']);


storeServices.factory('storeService', ['$http',
  function($http){
    var root = {};

    root.purchase = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/store/purchase?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    
    return root;
  }]);

