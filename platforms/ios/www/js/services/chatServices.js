'use strict';

/* Services */

var chatServices = angular.module('chatServices', ['ngResource']);

chatServices.factory('addchatService', ['$resource',
  function($resource){      
    return $resource(baseUrl+'/chat/add', {callback: 'JSON_CALLBACK'},{
      jsonp_query: {
        method: 'JSONP'        
      }
    });
  }]);


chatServices.factory('getchatService', ['$resource',
  function($resource){      
    return $resource(baseUrl+'/chat/get', {callback: 'JSON_CALLBACK'},{
      jsonp_query: {
        method: 'JSONP' 
        , isArray: true
      }
    });
  }]);