'use strict';

/* Controllers */

var predictionController = angular.module('predictionController', []);

predictionController.controller('predictionCtrl', ['$scope','$location',
  function($scope,$location) {
      
      $scope.layoutEvent = function(){
        showMessage(1);     
    }
    
    
    $scope.master = {};   
    $scope.test= "Home page under construction";
    
  }]);



