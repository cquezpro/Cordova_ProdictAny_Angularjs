
 angular.module('commonFilter', []).filter('numtodate', function() {
  return function(input) {

    if(!isNaN(input))
    {
        return getTimeAgo(input);
    }
    else 
    {
        return "NA";
    }
  };
});

var getTimeAgo = function(datetime){
            
            
            if(datetime.length<=4)
            {
                return "NA";
            }
            var c = datetime;
             
             var year = c.substr(0, 4);
             var month = c.substr(4, 2);
             var day = c.substr(6, 2);
             var hour = c.substr(8, 2);
             var minute = c.substr(10, 2);
             var seconds = c.substr(12, 2);
             
             var ago_str = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + seconds + "Z";
             
             return jQuery.timeago(ago_str)
             
        };