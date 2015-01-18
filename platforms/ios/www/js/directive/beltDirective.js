var progressPointsDirective = angular.module('beltDirective', ['statServices']);

progressPointsDirective.directive('belt', ['statService', '$rootScope', function(statService, $rootScope){
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    templateUrl: 'js/directive/template/belt.html',
    scope : {
        points : '@points',
        user_id : '@user',
        catId : '@catid',
        inline : '@inline',
        id : '@id',
        username : '@username',
        column : '@column',
        textonly:'@textonly',
        smallstar:'@smallstar',
        imgclass:'@imgclass'
    },

    /*link starts*/
    link: function(scope, elem, attrs) {
        
        var fnStatRespHandler = function(r){
            if(r.status == 1)
            {
                var res = r.result[0], beltColor = "";
                /*set default result*/
                $rootScope.predictability = "0";
                $rootScope.challenges_win = "0";
                $rootScope.challenges_tie = "0";
                $rootScope.challenges_loose = "0";
                $rootScope.friend_ranking = "1/1";
                $rootScope.o_cat_name = "";
                /*open popup and show result*/
                if(res.category_name)
                {
                    $rootScope.o_cat_name = res.category_name;
                }

                $rootScope.o_challenges_win = res.win_cnt ? res.win_cnt : 0;
                $rootScope.o_challenges_tie = res.tie_cnt ? res.tie_cnt : 0;
                $rootScope.o_challenges_loose = res.lost_cnt ? res.lost_cnt : 0;

                if(res.total_friends && res.ranking_in_friends)
                {
                    $rootScope.friend_ranking = res.ranking_in_friends+"/"+res.total_friends;
                }

                $rootScope.o_correct_predict_cnt = res.correct_predict_cnt ? res.correct_predict_cnt : 0;
                $rootScope.o_predict_played_cnt = res.predict_played_cnt ? res.predict_played_cnt : 0;

//                if(res.predict_played_cnt && res.correct_predict_cnt)
//                {
//                    $rootScope.o_predictability = (res.correct_predict_cnt/res.predict_played_cnt)* 100;
//                }
                
                if($rootScope.o_predict_played_cnt && $rootScope.o_correct_predict_cnt)
                {
                    $rootScope.predictability = $rootScope.o_predictability = ($rootScope.o_correct_predict_cnt/$rootScope.o_predict_played_cnt)* 100;
                }
               
//               alert($rootScope.o_predictability);
                switch(scope.belt_cls)
                {
                    case 'white-belt' : { beltColor = 'White'; break; }
                    case 'yellow-belt' : { beltColor = 'Yellow'; break; }
                    case 'orange-belt' : { beltColor = 'Orange'; break; }
                    case 'green-belt' : { beltColor = 'Green'; break; }
                    case 'purple-belt' : { beltColor = 'Purple'; break; }
                    case 'blue-belt' : { beltColor = 'Blue'; break; }
                    case 'red-belt' : { beltColor = 'Red'; break; }
                    case 'brown-belt' : { beltColor = 'Brown'; break; }
                    case 'black-belt' : { beltColor = 'Black'; break; }
                }
                
                if(scope.user_id != _userObj.id){
                    scope._belt_text = $rootScope.o_belt_text = scope.username+" is a " +scope.starsLoop.length+ "-Star "+beltColor+" Belt (Level "+scope.Level+")";    
                    
                }
                else{
                    if(scope.points == 0){
                       scope._belt_text =  $rootScope.o_belt_text = "Predict Now to Earn Some Stars!";
                        
                    }
                    else{
                        scope._belt_text = $rootScope.o_belt_text = "You are a " +scope.starsLoop.length+ "-Star "+beltColor+" Belt (Level "+scope.Level+")";    
                    }
                }
                
                $rootScope.o_belt_cls = scope.belt_cls;
                $rootScope.starsLoop = scope.starsLoop;
                
                ///////////////////
                var p = localStorage.getItem("p_user_fav_cat");
                window.predict_cat_id = $rootScope.statOverlayCatId = scope.catId;
                $rootScope.statOverlayIsFavCat = -1;
                if(p){
                    p = JSON.parse(p);
                    console.log(p);
                    console.log(scope.catId);                    
                    if(p.length && jQuery.inArray(scope.catId, p) != -1 ){
                        $rootScope.statOverlayIsFavCat = 1;
                    }
                    else{
                        $rootScope.statOverlayIsFavCat = 0;
                    }
                }
                else{
                    $rootScope.statOverlayIsFavCat = 0;
                }
                 console.log('$rootScope.statOverlayIsFavCat ' + $rootScope.statOverlayIsFavCat);   
                ///////////////////
                showOverlay("#stat_overlay");
                
            }
        };

        elem.on('click', function(event) {
            /*send request on server to get user statistics data*/
            var params = {userId :scope.user_id,catId : scope.catId  }
            statService.getCategoryStatistics(params).success(function(r, status){
                fnStatRespHandler(r);
            }).error(function(data, status) {});
        });
    },
    /*link end*/


    /*controller starts*/
    controller : function($scope,$rootScope) {

        var pre_points = 0, stars = [], cnt = 0;
        for( var i in _belt){
            cnt ++;
            if(parseInt($scope.points) < parseInt(i))
            {
                /* get stats from previous points */
                $scope.belt_cls = _belt[pre_points].cls;
                for(var j = 0 ; j < _belt[pre_points].star; j++)
                {
                    stars.push( _belt[pre_points].golden ? 'img/star.png' : 'img/star.png');
                }
                break;
            }
            else
            {
                pre_points = i;
            }
        }
        $scope.starsLoop = stars;
        $scope.Level = cnt;

        $scope.showInline = false;
        if($scope.inline){
            $scope.showInline = true;
        }
        
        $scope.showTextOnly = false;        
        if($scope.textonly){
            $scope.showTextOnly = true;
            
            var beltColor = '';
            switch($scope.belt_cls)
            {
                case 'white-belt' : { beltColor = 'White'; break; }
                case 'yellow-belt' : { beltColor = 'Yellow'; break; }
                case 'orange-belt' : { beltColor = 'Orange'; break; }
                case 'green-belt' : { beltColor = 'Green'; break; }
                case 'purple-belt' : { beltColor = 'Purple'; break; }
                case 'blue-belt' : { beltColor = 'Blue'; break; }
                case 'red-belt' : { beltColor = 'Red'; break; }
                case 'brown-belt' : { beltColor = 'Brown'; break; }
                case 'black-belt' : { beltColor = 'Black'; break; }
            }

            if($scope.user_id != _userObj.id){
                $scope._belt_text = $scope.username+" is a " +$scope.starsLoop.length+ "-Star "+beltColor+" Belt (Level "+$scope.Level+")";    

            }
            else{
                if($scope.points == 0){
                   $scope._belt_text = "Predict Now to Earn Some Stars!";

                }
                else{
                    $scope._belt_text = "You are a " +$scope.starsLoop.length+ "-Star "+beltColor+" Belt (Level "+$scope.Level+")";    
                }
            }
            
        }
        
        $scope.column_class ='col-xs-4';
        if($scope.column){
            $scope.column_class = $scope.column;
        }     
        

        $scope.img_class = 'stars';
        if($scope.imgclass){  
            $scope.img_class = $scope.img_class;        
        }    
        
    }
    /*controller ends */

    };
}]);



