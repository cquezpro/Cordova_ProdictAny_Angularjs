'use strict';

/* Services */

var groupServices = angular.module('groupServices', ['ngResource']);


groupServices.factory('groupService', ['$http',
  function($http){
    var root = {};

    root.getFriends = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getFriends?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.getFriendsForChallenge = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getFriendsForChallenge?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };


    root.createGroup = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/create?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.getGroups = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/listGroups?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.getGroupsForChallenge = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getGroupsForChallenge?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };


    root.getGroupInfo = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getGroupInfo?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };


    root.deleteGroup = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/deleteGroup?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.EditGroup = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/editGroup?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.getGroupFriends = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getGroupFriends?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.getAllGroupsShort = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/group/getAllGroupsShort?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    return root;
  }]);
