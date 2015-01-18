var logoDirective = angular.module('logoDirective', []);

logoDirective.controller('logoController', ['$scope', '$location', function($scope, $location) 
{    
    $scope.customer = {
      name: _userObj.username,
      image: imageServerUrl + imageUserMini + _userObj.photo
    };
  }])
    
.directive('myLogo', ['$document', '$rootScope', '$location', function($document,$rootScope, $location){
    
        var myRegExp = /profile/;
    var myText = $location.path();
    if(myRegExp.test(myText))
    {
       var template = "<span style='text-align:center'><font color='white'>" + _userObj.username + "</font></span>";
    }
    else
    {
        var template = '<img style=" margin: 0 auto;padding: 1px 0;width: 25%;" class="img-responsive" src="img/pdlogo.png" />';
    }
return {
    restrict: 'AE',
    replace: true,
    template: template
  };
}]);