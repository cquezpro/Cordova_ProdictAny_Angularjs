'use strict';

/* Controllers */

var alertsController = angular.module('alertsController', ['chatServices', 'userServices', 'categoryServices', 'friendsServices']);

alertsController.controller('alertListCtrl', ['$rootScope','$scope','alertService','$location','CommonCode',
  function($rootScope,$scope,alertService,$location, CommonCode) {
    
    
    
    
    $scope.getAlerts = function()
    {
        var params = {userId : _userObj.id, name : $scope.name};
        var groups_added=0;
//        if(!$scope.catListL1.length)
        {
            //get all main level categories
            alertService.getAlerts(params).success(function(r, status)
            {
                
                 $scope.AlertList = [];
                 var ago_str = "";
                 
                 
                 for (var i=0; i< r.records.length; i++)
                 {
                     
                     var obj = {};
                     
                     obj.data = r.records[i].data;

                     obj.id = r.records[i].id;
                     obj.image = r.records[i].image;
                     obj.url = r.records[i].url;
                     
                     
                     
                     
                     $scope.AlertList.push(obj);
                 }
            }).error(function(data, status) {});
            
            
        }
    }
   
    var user_id = _userObj.id;
    $scope.getAlerts();
  }]);
 