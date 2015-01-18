'use strict';

/* Services */

var categoryServices = angular.module('categoryServices', ['ngResource']);

categoryServices.factory('categoryService', ['$http',
  function($http){
    var root = {};

    root.getCategoriesL1 = function(catname){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getParentCategories?callback=JSON_CALLBACK&catname=' + catname
        };
        return $http(conf);
    };
    
    root.getSearchResults = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getSearchResults?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.getuserdiscussionService = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getUserDiscussion?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.block_category = function(params){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/block?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };


     root.getCategoriesL2 = function(params, catname){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getChildCategories?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };


     root.getCategoriesForRound = function(params, catname){
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getCategoriesForRound?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    root.saveAsFav = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/saveAsFav?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
     
    root.deleteFromFav = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/deleteFromFav?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };
    
    root.getFavCat = function(params)
    {
        var conf = {
         method : 'jsonp',
         url    :baseUrl+'/category/getFavCat?callback=JSON_CALLBACK',
         params : params
        };
        return $http(conf);

    };

    return root;
  }]);