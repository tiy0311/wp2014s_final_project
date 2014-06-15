var userid;
var ACCESS_TOKEN;

window.fbAsyncInit = function () {//facebook init
    
//輸入基本的Facebook init的狀態，與Facebook 連接，包括APP ID的設定
    FB.init({
        appId : '322780024547098',                    // App ID from the app dashboard  // wp2014s_final_project:322780024547098  // Lab:699947756683654
        cookie  : true,                                 // Allowed server-side to fetch fb auth cookie
        status  : true,                                 // Check Facebook Login status
        xfbml   : true,                                 // Look for social plugins on the page
        oauth   : true,
        version: 'v2.0'
    });

// define the events when login status changed.
    FB.Event.subscribe('auth.login', function(response) {

        if (response.status=="connected" && response.authResponse){ // if logged in
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="block";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="none";

            // get access token
            ACCESS_TOKEN=response.authResponse.accessToken;
            console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

            // get user id
            userid=response.authResponse.userID;
            console.log('userid: '+userid);
        }
    });
            
    FB.Event.subscribe('auth.logout', function(response) {
        if (response.status!="connected" && response.authResponse){ // if logged out
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="none";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="block";
        }
    });

/*
FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {

        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="block";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="none";

        // get access token
        ACCESS_TOKEN=response.authResponse.accessToken;
        //console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

        // get user id
        userid = response.authResponse.userID;
        //console.log('userid: '+userid);

        /*
        //呼叫api 放大頭照
        FB.api('/me/picture?type=small', function(response) {
            var my_picture_url = response.data.url;
            $("#profile_pic").attr('src', my_picture_url);
        });
        

    
  } else if (response.status === 'not_authorized') {
    //要求使用者登入，索取publish_actions權限
    FB.login(function (response) {
        // FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
        if (response.authResponse) { // if user login to your apps right after handle an event
            window.location.reload();
        };
    }, { scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'});
	
  } else {
    //同樣要求使用者登入
    FB.login(function (response) {
        if (response.authResponse) {
            window.location.reload();
        } else {
            //alertify.alert('An Error has Occurs,Please Reload your Pages');
        }
    });
  }
 });
*/
    $("#login-btn").click(function(){   
        alert("click on login-btn"); 
        FB.login(function(response) {
            if (response.authResponse) {
                /*
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.'); 
                });
                */
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope:'user_birthday,user_friends,user_checkins,user_photos,user_status,friends_status,friends_checkins,friends_photos,read_stream,export_stream'}); 
    });

    $("#logout-btn").click(function(){
        //alert('You are logging out. Bye!');
        FB.logout(function(response){
            location.reload();  // refresh
        });
    });

}; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end


//LOAD FACEBOOK SDK ASYNC，這是基本的東西，應該不用多說了吧
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; 
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  