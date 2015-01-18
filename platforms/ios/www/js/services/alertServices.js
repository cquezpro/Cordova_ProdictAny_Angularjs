'use strict';

/* Services */

var alertServices = angular.module('alertServices', ['ngResource']);

alertServices.factory('alertService', ['$http',
  function($http){
    var root = {};
    root.getAlerts = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/alerts/getAlerts?callback=JSON_CALLBACK',
         params : params
        };
        
        return $http(conf);

    };

    return root;
  }]);