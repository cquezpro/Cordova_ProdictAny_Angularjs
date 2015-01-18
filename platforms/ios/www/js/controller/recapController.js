'use strict';

/* Controllers */

var recapController = angular.module('recapController', ['timer', 'angular-carousel']);

recapController.controller('recapCtrl', ['$rootScope', '$scope', '$timeout' , 'shareService', '$location', 'recapService','badgeDisplay',
  function($rootScope, $scope, $timeout, shareService, $location, recapService , badgeDisplay) {     
    recapService.makeRecapPages($scope);
    
  }]);

