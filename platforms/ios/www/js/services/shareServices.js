'use strict';

/* Services */

var shareServices = angular.module('shareServices', ['ngResource']);

shareServices.factory('shareService', ['$http',
  function($http){
    var root = {};      
    this.data = {};
    root.set = function(d){
        this.data = d;
    };
    
    root.get = function(){
        return this.data;
    };
    
    root.clean = function(d){
        this.data = {};
    };
    
   
    
    return root;
  }]);


