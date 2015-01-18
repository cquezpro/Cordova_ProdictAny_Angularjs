var disableSlideMenu  = [
    'page43','page44',"page31","page45","page46","page48","starEarned","friends","page62", "/groups/friends","recap" 
];

var prod_test = 0;//make it 0 if you want to point to local server

if((navigator.userAgent.match(/iPhone/i)))
{
    prod_test = 1;
    var baseUrl = "http://m.predictany.com/";
        
    var imageServerUrl = "http://predictany.s3.amazonaws.com";

}
else if(window.location.hostname=="localhost"){
    var baseUrl = "http://m.predictany.com/";
//    var imageServerUrl = "http://predictweb.advocatesadvise.com";
    var imageServerUrl = "http://predictany.s3.amazonaws.com";
}


else if(prod_test==1 || window.location.hostname=="predictweb.advocatesadvise.com")
{
    var baseUrl = "http://m.predictany.com/";
    var imageServerUrl = "http://predictany.s3.amazonaws.com";
}
else if(window.location.hostname=="predict_mob_client" || window.location.hostname=="predict_mobile" || window.location.hostname=="predictany_mobclient" )
{

    var baseUrl = "http://dev.predictany.com/mobile_webservice/predictany_services/";
    var baseUrl = "http://m.predictany.com/";
//    var baseUrl = "http://predictany_mobile";
    
    
    var imageServerUrl = "http://predictany.s3.amazonaws.com";
}
else
{
    var baseUrl = "http://m.predictany.com/";
    
    var imageServerUrl = "http://predictany.s3.amazonaws.com";
}

var disableSlideMenu  = [
    'test','category_l1', 'category_l2', 'category_l3', 'groups', 'login', 'signup', 'signup2', 'terms',  'avtar_list', "recap"
],

imageCatSmall = "/images/category/small/",
imageCatBig = "/images/category/big/",
imageUserBig = "/images/user/big/",
imageUserSmall = "/images/user/small/",
imageUserMini = "/images/user/mini/";



//       $arrCatDetails['image_server_path'] = category_small_image_httppath;
//       $arrCatDetails['image_server_url'] = image_server_host;

/*position of points in array represents level*/
var _pointsLevel = [
     0
     ,20         ,60         ,120        ,200       ,300
     ,420        ,560        ,720        ,900       ,1100
     ,1320       ,1560       ,1820       ,2100      ,2400
     ,2720       ,3600       ,3420       ,3800      ,4200
     ,4620       ,5060       ,5520       ,6000      ,6500
     ,7020       ,7560       ,8120       ,8700      ,9300
    ,9920       ,10560      ,11220      ,11900      ,12600
    ,13320      ,14060      ,14820      ,15600      ,16400
    ,17220      ,18060      ,18920      ,19800      ,20700
    ,21620      ,22560      ,23520      ,24500      ,25500
];



var _level_color_map = ['#FFF','#FFD700', '#FF8C00', '#006400', '#00008B', '#4B0082', '#8B0000', '#5C2C0C', '#000000'],
_level_cls = ['white-belt','yellow-belt', 'orange-belt','green-belt', 'blue-belt', 'purple-belt','red-belt', 'brown-belt', 'black-belt', 'black-belt', 'black-belt'], _belt = {};

var color_cnt=0, loop_cnt = 0;
for(var i in _pointsLevel)
{
    if(i == 0)
    {
        _belt[_pointsLevel[i]] = {star: 0, golden:0,  cls : _level_cls[color_cnt]};
    }
    else
    {
        loop_cnt++
        _belt[_pointsLevel[i]] = {star: loop_cnt, golden:0,  cls : _level_cls[color_cnt]};

        if(color_cnt >= 9)
        {
            _belt[_pointsLevel[i]].golden = 1;
        }
        if(loop_cnt == 5)
        {
            loop_cnt = 0;
            color_cnt++;
        }
    }

}


/*level : array represents each star on belt*/
var _levelConfig = {}, star = 0, temp_cnt, temp_cnt2, bg_color ;
_levelConfig[0] = [
    {bg : '#FFF', star : 0},
    {bg : '#FFF', star : 0},
    {bg : '#FFF', star : 0},
    {bg : '#FFF', star : 0},
    {bg : '#FFF', star : 0}
];

temp_cnt2 = temp_cnt = 0;
temp_cnt2=1;
for(var i=1; i <=50; i++)
{
        if(temp_cnt2 >= 10)
        {
            temp_cnt2 = 0;
        }
        bg_color = _level_color_map[temp_cnt2];
        if(i %5 == 0)
        {
            temp_cnt2++;
        }

        if(temp_cnt == 5)
        {
            temp_cnt = 0;
        }



        arr = [];
        for(var j =0; j < 5; j++)
        {
            if(i == 50 && j <= temp_cnt)
            {
                star = 2; /* 2 is for gold star */
            }
            else if(j <= temp_cnt)
            {
                star = 1;
            }
            else
            {
                star = 0;
            }
            arr.push({bg : bg_color, star : star});
        }

        temp_cnt++;
        temp_cnt2++;
    _levelConfig[i] = arr;
}

var _config = {
     db_name : 'predictany',
     inner_db_name : "predict_mobile",
     db_storage : 20000000,
     db_version : "1.0",
     query_transaction_timeout:500,
     real_version : 0,
     app_info_id  : 1,
     request_timeout : 20000,

     public_poll : 100,
     public_poll_display  : '1,00',

     re_predict : 500,
     re_predict_display  : '5,00',

     forfeit : 1000,
     forfeit_display  : '1,000',

     X2 : 1000,
     x2_display  : '1,000',

     X3 : 2000,
     x3_display  : '2,000',

     X4 : 3000,
     x4_display  : '3,000',
     
    imageCatSmall : "/images/category/small/",
    imageCatBig : "/images/category/big/",
    imageUserBig : "/images/user/big/",
    imageUserSmall : "/images/user/small/",
    imageUserMini : "/images/user/mini/",
    imagePredBig : "/images/prediction/",
    imageServerUrl : imageServerUrl,
    
    
    getCatOnline : 1,
    
    facebook_app_id : 797564646954607
};

