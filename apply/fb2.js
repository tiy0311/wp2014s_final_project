// 初始化SDK (Application ID),(JavaScript Key)
Parse.initialize("LQXW7t4hRmWf8Lw4dLcPaNRDQbMoe24rctZE7G0z", "qVd2E2OB786ORKQ83hWg6OQRs17YLIPf9H0MdUTP");

var show_div;

function showDiv(show_div){
	console.log("in showDiv");
	console.log("show_div: ",show_div);
	if(show_div == 0){

		var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="none";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="inline-block";

	} else {

		var IfLoggedInDiv=document.getElementById("if-logged-in");
        IfLoggedInDiv.style.display="inline-block";
        var IfNotLoggedInDiv=document.getElementById("if-not-logged-in");
        IfNotLoggedInDiv.style.display="none";
	}
};

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

    $("#login-btn").click(function(){   
        //alert("click on login-btn"); 
        FB.login(function(response) {
            //console.log(response);
            if (response.status == "connected") {

                show_div = 1;
                showDiv(show_div);
                
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope:'user_birthday,user_friends,user_photos,user_status,friends_status,friends_checkins,friends_photos,read_stream,export_stream'}); 

    });

    $("#logout-btn").click(function(){
        //alert('You are logging out. Bye!');

        console.log("click on logout-btn");

        Parse.User.logOut();
        console.log("parse log out");

        show_div = 0;
        showDiv(show_div);
        /*
        FB.logout(function(response){
            location.reload();  // refresh
        });
    	*/		
    });

    FB.getLoginStatus(function(response) {
        console.log(response);
        console.log(response.authResponse);

        if(response.status=="connected"){
        	show_div=1;
        	showDiv(show_div);
        }

            // get access token
            var ACCESS_TOKEN=response.authResponse.accessToken;
            //console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

            // get user id
            var userid = response.authResponse.userID;
            console.log('userid: '+userid);


            


            var new_or_not = addNewUser(userid,ACCESS_TOKEN);	// new user: true, otherwise: false
            console.log(new_or_not);

            console.log("----------");

            var currentUser = Parse.User.current();
        	console.log(currentUser);


        	Parse.User.logIn(userid, ACCESS_TOKEN, {
                success: function(user) {
                // Do stuff after successful login.
                    alert("login success!");
                },
                error: function(user, error) {
                // The login failed. Check error to see why.
                    alert("error login:",error);
                }
            });

            var currentUser = Parse.User.current();
        	console.log(currentUser);
    });

};


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



    function addNewUser(userid, ACCESS_TOKEN){
        console.log("in addNewUser()");
        var currentUser = Parse.User.current();
        console.log(currentUser);

        if (currentUser) {
            console.log("if is currentUser");
            // do stuff with the user
            // add new petition, edit the petition the user created
            
            /*
            Parse.User.logIn(userid, ACCESS_TOKEN, {
                success: function(user) {
                // Do stuff after successful login.
                    alert("login success!");
                },
                error: function(user, error) {
                // The login failed. Check error to see why.
                    alert("error login:",error);
                }
            });
			*/
			return false;
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

            console.log("@@@@");
            var currentUser = Parse.User.current();
        	console.log(currentUser);

            return true;
            
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
            Parse.User.logIn(userid, ACCESS_TOKEN, {
                success: function(user) {
                    // Do stuff after successful login.
                    alert("login success!");
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                    alert("fail to login. with error code: ", error);
                }
            });
            */

        }
    };