'use strict';

/* Services */

var friendsServices = angular.module('friendsServices', ['ngResource']);

friendsServices.factory('friendsServices', ['$http',
  function($http){
    var root = {};      
    
    root.getFriends = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/getFriends?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    root.getMessages = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/getMessages?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    root.sendMessage = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/sendMessage?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    
    root.sendGroupMessage = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/sendMessage?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    
    root.getRequests = function(params)
    {
         var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/getRequests?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    root.rejectFn = function(params)
    {
         var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/reject?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
    root.acceptChallengeFn = function(params)
    {
         var conf = {
         method : 'jsonp',
         url    :baseUrl+'/friends/acceptOrChallenge?callback=JSON_CALLBACK',
         params : params
        };        
        return $http(conf);
        
    };
    
        root.getInvitableFriends = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getInvitableFriends?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    }
    
    return root;
  }]);