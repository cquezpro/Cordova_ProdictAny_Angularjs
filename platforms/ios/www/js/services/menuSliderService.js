'use strict';

/* Services */

var menuSliderService = angular.module('menuSliderService', ['snap']);

menuSliderService.factory('menuSlider', ['$location', 'snapRemote',
  function($location,snapRemote){   
      
      
      var root = {};
      root.enableMenuSlide = function(){
          //disable menu drag on this page
        snapRemote.getSnapper().then(function(snapper) {
            snapper.enable();      
        });
      };
      
      root.disableMenuSlide = function(){
        //disable menu drag on this page
        snapRemote.getSnapper().then(function(snapper) {
          snapper.disable();      
        });            
     }
      
      root.close = function(){          
        //disable menu drag on this page
        snapRemote.getSnapper().then(function(snapper) {            
          snapper.close();      
        });            
     }
      
      root.init = function(){
           var path =  $location.path(),
           arr = path.split('/');               
           if(jQuery.inArray( arr[1], disableSlideMenu ) != -1 )
            {   
                root.disableMenuSlide();
            }
            else
            {
                 root.enableMenuSlide();
            }
      }
      
      return root;
  }]);