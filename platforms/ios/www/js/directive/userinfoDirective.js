var userinfoDirective = angular.module('userinfoDirective', []);

userinfoDirective.controller('userinfoController', ['$scope', function($scope) 
{
    //if user is not logged in then returning from this place and not showing anything     
    if(typeof(_userObj.username)=="undefined")
    {
        return false;
    }
    
      var u = localStorage.getItem("user_data");
      u = JSON.parse(u);

    $scope.customer = {
      name: u.username,
      id: u.id,
      image: imageServerUrl + imageUserMini + _userObj.photo
    };
  }])
    
.directive('menuUsername', ['$document', '$rootScope', function($document,$rootScope){

return {
    restrict: 'AE',
    replace: true,
    template: '<a href="#/profile/327"><span>{{customer.name}}</span></a>'
  };
}])

.directive('menuImage', ['$document', '$rootScope', function($document,$rootScope){

return {
    restrict: 'AE',
    replace: true,
    template: '<img src="{{customer.image}}" class="img-responsive">'
  };
}]);