'use strict';

/* Services */

var purchaseServices = angular.module('purchaseServices', ['ngResource']);

purchaseServices.factory('purchaseService', ['$http',
  function($http){
    var root = {};

    root.publicPoll = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/getPublicPoll?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };

    root.rePredict = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/rePredict?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };

    root.forfeit = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/forfeit?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };

    root.addBonusOnRound = function(params){
        var conf = {
         method : 'jsonp',
         params : params,
         url    :baseUrl+'/round/addBonusOnRound?callback=JSON_CALLBACK'
        };
        return $http(conf);

    };



    return root;
  }]);


