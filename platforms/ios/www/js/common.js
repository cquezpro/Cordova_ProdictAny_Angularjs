//this function will always return the name or username depending upon the conditions, if display name is not available then always username will be returned 
function get_user_display_name(username, name)
{
    if(name!="")
    {
        return name;
    }
    else
    {
        return username;
    }
    
    return username;
}


function display_heading(complete_page_name, second_optional_param)
{
    //alert($(".snap-content").height()-2)
    var cHeight=$(".snap-content").height();
    //alert(cHieght)
     $(".content-area").height(cHeight);
	 $(".trans").height(cHeight);
   //  alert($(".content-area").height());
//if($(window).height() > $(".content-area").height()){
//
//    $(".content-area").height($(".content-area").height());
//    }
//    else{
//
//    $(".content-area").height($(window).height());
//    }
    
    $(".reply").click(function(){
		$(this).parent().next().slideToggle();
	});
    
   $("#header_center").css("font-size","18px");
   $("#shadow").hide();
   
     var arrayOfStrings = complete_page_name.split("/");
     
     var page_name = arrayOfStrings[1];
     $(".footer-bg").hide();
    switch(page_name) {
        case 'signup':
        case 'signup2':
            $("#header_center").html("Sign Up");
            break;
        case 'avtar':
            $("#header_center").html("Select Avatar");
            break;
        case 'home':
            $("#header_center").html("<img style=' margin-left:18px;padding: 1px 0;width: 60%;' class='img-responsive' src='img/pdlogo.png' />");
            break; 
        
        case 'category_l1':
        case 'category_l2':
        case 'category_l3':
            $("#header_center").html("Categories");
            break; 
        
        case 'user_discussion':
            $("#header_center").html("Discussions");
            break;   
        case 'discussion':
            if(arrayOfStrings[3])
            {
                var second_optional_param = "<span id='header_span_top_portion' style='font-size:10px;'>" + arrayOfStrings[3] + "</span><br>";
            }
            $("#header_center").html(second_optional_param + "Discussions");
            $("#header_center").css("font-size","12px");
            $("#header_span_top_portion").css("font-size","8px");
            $("#header_center").css("vertical-align", "top");
            $("#header_span_top_portion").css("vertical-align", "top");
            
            break;              
        
        case 'groups':
            if(arrayOfStrings[2]=="friends")
            {
                $("#header_center").html("Friends");
            }
            if(arrayOfStrings[2]=="invite")
            {
                $("#header_center").html("Friends");
            }
            if(arrayOfStrings[2]=="request")
            {
                $("#header_center").html("Friends");
            }
            if(arrayOfStrings[2]=="messages")
            {
                $("#header_center").html("Friends");
            }
            
            
            break;     
        
        case 'groupslist':
        case 'group_edit':
            $("#header_center").html("Groups");
            break;
        
        
        case 'alerts':
            $("#header_center").html("Alerts");
        break;
            
        case 'store':
            $("#header_center").html("Store");
        break;     
        
        case 'achievements':
            if(second_optional_param!="")
            {
                $("#header_center").html(second_optional_param);
            }
            else
            {
                $("#header_center").html("Achievements");
            }
            
            
//            $("#menu_placeholder_temp").html('<div class="share-button" style="margin:14px 5px">SHARE</div>');
            
        break;     
    
        case 'profile':
        if(arrayOfStrings[3])
        {
            $("#header_center").html(arrayOfStrings[3]);
        }
        
        $("#menu_placeholder_temp").show();
    break;       
        case 'my_profile':
            $("#header_center").html(_userObj.username);
    break; 
    
    break;       
        case 'journal':
            $("#header_center").html("Journal");
    break;    

    break;       
        case 'settings':
        case 'edit_profile':    
        case 'list_fav_cat':    
            $("#header_center").html("Settings");
    break;   
        case 'contributor':    
            $("#header_center").html("Submit Request");
            $("#header_center").css("font-size","16px");
    break;       
//    challenge_friend_group
    case 'round':  
            $("#header_wrap_up").hide();
            $(".footer-bg").hide();
            
           
    break;   

    case 'wrapup':    
            $(".footer-bg").hide();
            $("#header_wrap_up").show();
            $("#wrapUpFooterNextRound").show();
            
    break;  

    case 'challenge_group':    
            $(".footer-bg").hide();
            $("#challenge_friend_group").show();
    break;  

    case 'challenge_friend':    
            $(".footer-bg").hide();
            $("#challenge_friend_group").show();
    break;  


    case 'help':    
            $("#help_overlay").show();
            $("#shadow").show();
    break;       
    case 'test':    
            $("#header").hide();
    break;       
    
    case 'others_journal':
        if(arrayOfStrings[4])
        {
            $("#header_center").html(arrayOfStrings[4]);
        }
        
//        $("#menu_placeholder_temp").show();
    break;   
    
    default:
        $("#header_center").html("<img style=' margin-left:18px;padding: 1px 0;width: 60%;' class='img-responsive' src='img/pdlogo.png' />");
//        $(".footer-bg").hide();
}

  //alert($(".content-area").height())  
}

//var contact_name = wordwrap(contacts[i].name.formatted, 15, '<br/>\n', 1);
function wordwrap( str, width, brk, cut ) 
{
    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;
 
    if (!str) { return str; }
 
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
 
    return str.match( RegExp(regex, 'g') ).join( brk );
 
}

/*
 * 
 * @param {type} id
 * @returns {undefined}
 * if user makes a prediction store its count in localstorage  * 
 */
function increament_prediction_made_cnt(id){
    var p =  parseInt(localStorage.getItem("p_total_predictions_made"));
    var p_in_day = localStorage.getItem("p_prediction_count_today");
    
    if(id){
        if(!p || isNaN(p)){
            localStorage.setItem("p_total_predictions_made", 1);
        }
        else
        {
            localStorage.setItem("p_total_predictions_made", ++p);
        }
        
        var currentDate = moment().format("YYYYMMDD");
        var pred_day = {date:currentDate,pred_cnt:1};
        
        if(p_in_day && $.trim(p_in_day)){
            p_in_day = JSON.parse(p_in_day);
            if(p_in_day.date == currentDate){
                pred_day.pred_cnt = parseInt(p_in_day.pred_cnt)+1;                
            }            
        }
        localStorage.setItem("p_prediction_count_today", JSON.stringify(pred_day));
    }
    
}

/*
 * 
 * @param {type} id
 * @returns {undefined}
 * if user played round, store its count in localstorage  * 
 */
function increament_round_played_cnt(id){
    var p =  parseInt(localStorage.getItem("p_total_round_played"));
    var p_in_day = localStorage.getItem("p_round_count_today");
    
    if(id){
        if(!p || isNaN(p)){
            localStorage.setItem("p_total_round_played", 1);
        }
        else
        {
            localStorage.setItem("p_total_round_played", ++p);
        }
        
        var currentDate = moment().format("YYYYMMDD");
        var pred_day = {date:currentDate,cnt:1};
        
        if(p_in_day && $.trim(p_in_day)){
            p_in_day = JSON.parse(p_in_day);
            if(p_in_day.date == currentDate){
                pred_day.cnt = parseInt(p_in_day.cnt)+1;                
            }            
        }
        localStorage.setItem("p_round_count_today", JSON.stringify(pred_day));
    }
    
}

/*
 * 
 * @param count
 * @returns {undefined}
 * if user makes a prediction store its count in localstorage  * 
 */
function set_prediction_made_cnt(cnt){
    cnt = parseInt(cnt);
    if(!cnt || isNaN(cnt)){
        localStorage.setItem("p_total_predictions_made", 0);
    }
    else{
        localStorage.setItem("p_total_predictions_made", cnt);
    }
}

/*
 * @returns prediction_made_cnt
 */
function get_total_prediction_made_cnt(){
    return localStorage.getItem("p_total_predictions_made");
}

/*
 * @returns prediction_made_cnt
 */
function get_todays_prediction_made_cnt(){
    var currentDate = moment().format("YYYYMMDD");
    var p_in_day =  localStorage.getItem("p_prediction_count_today");
    
    if(p_in_day && $.trim(p_in_day)){
        p_in_day = JSON.parse(p_in_day);
        if(p_in_day.date == currentDate){
            return parseInt(p_in_day.pred_cnt);
        }
        else{
            return 0;
        }
    } 
    return localStorage.getItem("p_total_predictions_made");
}


function get_todays_round_played_cnt(){
    var currentDate = moment().format("YYYYMMDD");
    var p_in_day =  localStorage.getItem("p_round_count_today");
    
    if(p_in_day && $.trim(p_in_day)){
        p_in_day = JSON.parse(p_in_day);
        if(p_in_day.date == currentDate){
            return parseInt(p_in_day.cnt);
        }
        else{
            return 0;
        }
    } 
    return localStorage.getItem("p_round_count_today");
}

function get_login_series_cnt(){
    var obj = localStorage.getItem('p_login_series');
    if(obj){
        obj = JSON.parse(obj);
        return obj.series_count;
    }
    else{
        return 1;
    }
}

function alertDismissed() {
        // do something
        //alert("Inside Dismiss");
}

//showMessage('message1', '', 'This is title', 'OK');
function showMessage(message, callback, title, buttonName) {

    title = title || "Predictany";
    buttonName = buttonName || 'OK';

    if((navigator.userAgent.match(/iPhone/i)))
    {
        if(navigator.notification && navigator.notification.alert) 
        {

            navigator.notification.alert(
                    message,  // message
                    alertDismissed,         // callback
                    title,            // title
                    buttonName                  // buttonName
            );

        } 
        else 
        {
            alert(message);
        }
    }
    else 
    {

        alert(message);
//        callback();
    }

}

function confirmDismissed(buttonIndex) 
{
    alert("StartAlert" + buttonIndex);
    if(buttonIndex=="1")
    {
        alert(buttonIndex);
        return false;
    }
    else if(buttonIndex=="2")
    {
        alert(buttonIndex);
        return true;
    }
        
}

//showMessage('message1', '', 'This is title', 'OK');
function showConfirm(message, callback, title, buttonName) {

    title = title || "Predictany";
    buttonName = buttonName || 'Cancel,Ok';

    if((navigator.userAgent.match(/iPhone/i)))
    {
        if(navigator.notification && navigator.notification.confirm) {

            navigator.notification.confirm(
                                         message,  // message
                                         confirmDismissed,         // callback
                                         title,            // title
                                         buttonName                  // buttonName
                                         );

        } 
    }else {

        if(confirm(message))
        {
            return true;
        }
//        callback();
    }

}

function showConfirmModal()
{
    
}

function getTimeAgo(dt){
   var m = dt.substr(4,2),
    d = dt.substr(6,2),
    h = dt.substr(8,2),
    mm = dt.substr(10,2),
    ss = dt.substr(12,2);            
    return moment(Y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss).fromNow(true);
    
}

//show_message_on_top("Some message here", 3);
function show_message_on_top(message, time_to_hide)
{
    $("#message_display_area").html(message);
    $("#message_display_area").show();
    $("#message_display_area").fadeOut(time_to_hide*1000);    
}

var check_valid_username = function(string) {
  return /^[a-z0-9_]+$/i.test(string)
};

//var plugin = new CC.CordovaFacebook();

function replace_slashes_from_photos(path)
{
     var re = new RegExp('\/\/', 'g');
     path = path.replace(re, '\/');
     
     var re1 = new RegExp('http:/', 'g');
     path = path.replace(re1, 'http://');
     
     return path;
}

function removeLocalStorage()
    {

           var keys = Object.keys(localStorage),
            i = 0;

        for (; i < keys.length; i++) {
             localStorage.removeItem(keys[i]) ;
        }

    }
    
    function removeSessionStorage()
    {
           var keys = Object.keys(sessionStorage),
            i = 0;

        for (; i < keys.length; i++) {
             sessionStorage.removeItem(keys[i]) ;
        }

    }
    
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }    
    
function wordwrap( str, width, brk, cut ) {
 
 
    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;
 
    if (!str) { return str; }
 
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
 
    return str.match( RegExp(regex, 'g') ).join( brk );
 
}    