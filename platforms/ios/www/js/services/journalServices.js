'use strict';

/* Services */

var journalServices = angular.module('journalServices', ['ngResource']);

journalServices.factory('journalServices', ['$http',
  function($http){
    var root = {};

    root.getCoins = function(params)
    {
        var conf = {
         method :   'jsonp',
         url    :   baseUrl+'/journal/getCoins?callback=JSON_CALLBACK',
         params :   params
        };
        return $http(conf);

    };

    root.getUserCoins = function(params)
    {
        var conf = {
         method :   'jsonp',
         url    :   baseUrl+'/journal/getUserCoins?callback=JSON_CALLBACK',
         params :   params
        };
        return $http(conf);

    };
    
    root.getAlltimeJournal = function(params)
    {
        var conf = {
         method :   'jsonp',
         url    :   baseUrl+'/journal/getAlltimeJournal?callback=JSON_CALLBACK',
         params :   params
        };
        return $http(conf);
    };
    
    root.getRepredictData = function(params)
    {
        var conf = {
         method :   'jsonp',
         url    :   baseUrl+'/round/getRepredictData?callback=JSON_CALLBACK',
         params :   params
        };
        return $http(conf);
    };



    return root;
  }]);