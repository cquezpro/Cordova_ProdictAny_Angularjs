'use strict';

/* Services */

var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('loginService', ['$resource',
  function($resource){      
    return $resource(baseUrl+'/user/login', {callback: 'JSON_CALLBACK'},{
      jsonp_query: {
        method: 'JSONP'        
      }
    });
  }]);

userServices.factory('registerService', ['$resource',
  function($resource){      
    return $resource(baseUrl+'/user/register', {callback: 'JSON_CALLBACK'},{
      jsonp_query: {
        method: 'JSONP'        
      }
    });
  }]);


userServices.factory('getprofileService', ['$resource',
  function($resource){      
    return $resource(baseUrl+'/user/profile', {callback: 'JSON_CALLBACK'},{
      jsonp_query: {
        method: 'JSONP'        
      }
    });
  }]);


userServices.factory('userService', ['$http',
  function($http){
    var root = {};

    root.validate_fb_login = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/processFBLogin?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.block = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/block?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.friend_unfriend = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/friend_unfriend?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.getUserCompleteDetails = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/getUserCompleteDetails?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.updateProfile = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/updateProfile?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    
    root.register = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/register?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.check_duplicate_user = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/check_duplicate_user?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.update_avtar = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/update_avtar?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
//    root.getLocationInfo = function(params){
//        
//        var conf = {
//         method : 'jsonp',
//         url    :"https://maps.googleapis.com/maps/api/geocode/json?latlng=18.446,73.8055&key=AIzaSyBpvUIxzppLo-iNmxlZAz6z-HKf0fLAS8s&callback=JSON_CALLBACK",
//         params : params
//        };
//        
//        
//        return $http(conf);
//
//    };    
    
    root.saveAsHome = function(params){
        
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/saveUserLocation?callback=JSON_CALLBACK',
         params : params
        };
        
        
        return $http(conf);

    };    
    
    root.removeLocation = function(params){
        
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/removeLocation?callback=JSON_CALLBACK',
         params : params
        };
        
        
        return $http(conf);

    }; 
    
    root.updatePhoto = function(params){
        
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/user/update_avtar?callback=JSON_CALLBACK',
         params : params
        };
        
        
        return $http(conf);

    }; 
    
    return root;
  }]);

