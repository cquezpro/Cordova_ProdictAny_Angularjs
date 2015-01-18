
angular.module('predictAnyApp.rightMenuCtrl', [])

  .controller('ExRemoteCtrl', function($scope, snapRemote, logger) {
    'use strict';
    snapRemote.getSnapper().then(function(snapper) {
        
      snapper.on('open', function() {

        console.log('Opened!');

      });

      snapper.on('close', function() {
        console.log('Closed!');
      });
    });
  })

  .controller('ExOptionsCtrl', function($scope) {
    'use strict';
    $scope.snapOpts = {
      disable: 'none'
    };

    $scope.disable = function(side) {
      $scope.snapOpts.disable = side;

    };

    $scope.enable = function() {
      $scope.snapOpts.disable = 'none';
       
    };
  })

  // That's all folks
  ;
