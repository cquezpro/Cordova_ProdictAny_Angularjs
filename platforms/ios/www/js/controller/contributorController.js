'use strict';

var contributorController = angular.module('contributorController', ['contributorServices']);

contributorController.controller('suggestCatrgoryCtrl', ['$scope','$rootScope', '$location', 'categoryService','contributorService','badgeDisplay',
    function($scope, $rootScope, $location,categoryService, contributorService, badgeDisplay) {
        
        $scope.catListL1 = [];
        $scope.selRole = "";
        $scope.selCat = "";
        $scope.otherCat = "";
        $scope.txtContribution = "";
        
        $scope.submitRequest = function(){
            
            if($scope.selRole == ""){
                showMessage("Please select role");
                return;
            }
            else if($scope.selCat == ""){
                showMessage("Please select category");
                return;
            }
            else if($scope.selCat == "0" && $.trim($scope.otherCat) == ""){
                showMessage("Please enter other category name");
                return;
            }
            else if($.trim($scope.txtContribution) == ""){
                showMessage("Please enter details about your contribution");
                return;
            }
            else if($scope.txtContribution.length > 500){
                showMessage("Maximum 500 characters allowed in about your contribution field");
                return;
            }
            else
            {
                //save data to server
                var p = {
                    category:$scope.selCat,
                    user_id:_userObj.id,
                    role:$scope.selRole,
                    txtContribution:$scope.txtContribution,
                    otherCat:$scope.otherCat
                };
                contributorService.sendData(p).success(function(r, status){
                    if(r.status == 1){
                       showMessage("Your contribution has been saved.\nThank you for your contribution.");                       
                        badgeDisplay.display_contributor_badge().then(function(){                            
                            $location.path('/category_l1');
                        },
                        function(){                            
                            $location.path('/category_l1');
                        },
                        function(){                            
                            $location.path('/category_l1');
                        });
                        
                    }
                    else
                    {
                        showMessage("Unable to save your contribution now, please try later");
                    }
                    
                }).error(function(data, status) {
                     showMessage("Unable to save your contribution now, please try later");
                });
            }
        };
        
         $rootScope.resolveBadgeDefer = function(){
            badgeDisplay.resolve();
        }
    
        //get all main level categories
        categoryService.getCategoriesL1($scope.txtCatname).success(function(r, status){
            $scope.catListL1 = r.categories;            
        }).error(function(data, status) {});
}]);
