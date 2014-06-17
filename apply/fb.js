// 初始化SDK (Application ID),(JavaScript Key)
Parse.initialize("LQXW7t4hRmWf8Lw4dLcPaNRDQbMoe24rctZE7G0z", "qVd2E2OB786ORKQ83hWg6OQRs17YLIPf9H0MdUTP");

var user_email;
var show_div;

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback:');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        console.log("1");
      // Logged into your app and Facebook.

            // show login 
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="inline-block";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="none";

        /*
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="inline-block";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="none";
        */
                    // get access token
            var ACCESS_TOKEN=response.authResponse.accessToken;

            // get user id
            var userid=response.authResponse.userID;
            console.log('userid: '+userid);

            /*
            var user_email;
            FB.api('/me', function(response) {
                console.log(response);
                user_email = response.email;
                console.log(response.email);
            });
            console.log("user_email~~~~",user_email);
            */

            console.log("***user_email,",user_email);
            addNewUser(userid,ACCESS_TOKEN);

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into this app.';

        // show logout
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        FB.logout(function(response){
            window.location.reload();  // refresh
        });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //  'into Facebook.';

        // show logout
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        FB.logout(function(response){
            window.location.reload();  // refresh
        });
    }
  }


  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      console.log("QQ");
      console.log(response);
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
/*
    FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {

        // show logout
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="inline-block";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="none";

        // get access token
        var ACCESS_TOKEN=response.authResponse.accessToken;
        //console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

            // get user id
        var userid=response.authResponse.userID;
        console.log('userid: '+userid);

        /*
            var user_email;
            FB.api('/me', function(response) {
                console.log(response);
                user_email = response.email;
                console.log(response.email);
            });
            console.log("user_email~~~~",user_email);
          

            addNewUser(userid,ACCESS_TOKEN);
    
  } else if (response.status === 'not_authorized') {
    //要求使用者登入，索取publish_actions權限
    FB.login(function (response) {

        // show logout
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        if (response.authResponse) { // if user login to your apps right after handle an event
            window.location.reload();
        };
    }, { scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'});
    
  } else {
    //同樣要求使用者登入
    FB.login(function (response) {

        // show login
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        if (response.authResponse) {
            window.location.reload();
        } else {
            //alertify.alert('An Error has Occurs,Please Reload your Pages');
        }
    });
  }
 });
*/


    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });


    // define the events when login status changed.
    FB.Event.subscribe('auth.login', function(response) {


            // show logout
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="inline-block";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="none";

/*
        if (response.status=="connected"){ // if logged in
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="inline-block";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="none";

            console.log("2");

            FB.api('/me', function(response) {
                console.log(response);
                user_email = response.email;
                console.log(response.email);
            });

        }
*/

    });
            
    FB.Event.subscribe('auth.logout', function(response) {
        if (response.status!="connected"){ // if logged out

            // show login
            var IfLoggedInDiv=document.getElementById("if-logged-in");
            IfLoggedInDiv.style.display="none";
            var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
            IfNotLoggedInDiv.style.display="inline-block";
            FB.logout(function(response){
                window.location.reload();  // refresh
            });
        }
    });

    $("#login-btn").click(function(){   

        //alert("click on login-btn"); 
        FB.login(function(response) {
            //console.log(response);
            if (response.status == "connected") {

                // show logout
                var IfLoggedInDiv=document.getElementById("if-logged-in");
                IfLoggedInDiv.style.display="inline-block";
                var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
                IfNotLoggedInDiv.style.display="none";

                show_div=1;
                
                console.log(response);

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope:'user_birthday,user_friends,user_photos,user_status,read_stream,export_stream'}); 
      
        window.location.reload();
    });

    $("#logout-btn").click(function(){
        console.log("click on logout-btn");
        //alert('You are logging out. Bye!');
        Parse.User.logOut();
        console.log("parse log out");
        
        FB.logout(function(response){
            location.reload();  // refresh
        });

        /*
        // show login
        var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";
        */

        show_div=0;
        
        //window.location.reload();
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
  







//(function(){


    function addNewUser(userid, ACCESS_TOKEN){
        console.log("in addNewUser()");
        var currentUser = Parse.User.current();
        console.log(currentUser);
        if (currentUser) {
            console.log("if is currentUser");
            // do stuff with the user
            // add new petition, edit the petition the user created
            
            Parse.User.logIn(userid, ACCESS_TOKEN, {
                success: function(user) {
                // Do stuff after successful login.
                    alert("login success!");
                },
                error: function(user, error) {
                // The login failed. Check error to see why.
                    alert("error login");
                }
            });

        } else {
            // add new user to parse.user
            console.log("userid: ",userid);
            console.log("ACCESS_TOKEN: ", ACCESS_TOKEN);

            var user = new Parse.User();
            user.set("username", userid);
            user.set("password", ACCESS_TOKEN);
            //user.set("email","100703020@nccu.edu.tw");

            // parse內建函式：新增一筆user
            user.signUp(null, {
                success: function(user) {
                // Hooray! Let them use the app now.
                    alert("sign up successfully.");
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
            
            /*
            user.save(null, {
                success: function(user) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + user.id);
                },
                error: function(user, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and description.
                    alert('Failed to create new object, with error code: ' + error.description);
                }
            });
            */

            /* 
            Parse.User.logIn("userid", "ACCESS_TOKEN", {
                success: function(user) {
                    // Do stuff after successful login.
                    alert("login success!");
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                    alert("fail to login. with error code: ", error.description);
                }
            });
            */

        }
    };



//})();