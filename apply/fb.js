var userid;
var ACCESS_TOKEN;

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="inline-block";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="none";
      //testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into this app.';
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        FB.logout(function(response){
            location.reload();  // refresh
        });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into Facebook.';
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        FB.logout(function(response){
            location.reload();  // refresh
        });
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function () {//facebook init
    
//輸入基本的Facebook init的狀態，與Facebook 連接，包括APP ID的設定
    FB.init({
        appId : '699947756683654',                    // App ID from the app dashboard  // wp2014s_final_project:322780024547098  // Lab:699947756683654
        cookie  : true,                                 // Allowed server-side to fetch fb auth cookie
        status  : true,                                 // Check Facebook Login status
        xfbml   : true,                                 // Look for social plugins on the page
        oauth   : true,
        version: 'v2.0'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });


    // define the events when login status changed.
    FB.Event.subscribe('auth.login', function(response) {

        if (response.status=="connected"){ // if logged in
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="inline-block";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="none";

            // get access token
            ACCESS_TOKEN=response.authResponse.accessToken;
            //console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

            // get user id
            userid=response.authResponse.userID;
            console.log('userid: '+userid);
        }
    });
            
    FB.Event.subscribe('auth.logout', function(response) {
        if (response.status!="connected"){ // if logged out
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="none";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="inline-block";
            FB.logout(function(response){
                location.reload();  // refresh
            });
        }
    });

    $("#login-btn").click(function(){   
        //alert("click on login-btn"); 
        FB.login(function(response) {
            //console.log(response);
            if (response.status == "connected") {
                var IfLoggedInDiv=document.getElementById("if-logged-in");
                IfLoggedInDiv.style.display="inline-block";
                var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
                IfNotLoggedInDiv.style.display="none";
                
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope:'user_birthday,user_friends,user_photos,user_status,friends_status,friends_checkins,friends_photos,read_stream,export_stream'}); 
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
  