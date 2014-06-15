(function(){

	// 初始化SDK (Application ID),(JavaScript Key)
    Parse.initialize("LQXW7t4hRmWf8Lw4dLcPaNRDQbMoe24rctZE7G0z", "qVd2E2OB786ORKQ83hWg6OQRs17YLIPf9H0MdUTP");

    //編譯template engine函數();
	var templates = {};
	["loginView", "catalogTemplate", "catalogPaginationTemplate", "petitionView", "updateSuccessView"].forEach(function (e) {
		templateCode = document.getElementById(e).text;
		templates[e] = doT.template(templateCode);
	});

  	var commons = {
    	loginRequiredView: function (ViewFunction) {
    		return function () {
    			var currentUser = Parse.User.current();
	        	if (currentUser) {
    	    		ViewFunction();
        		} else {
        			// 重新導向到登入頁面，登入後會回到商品
        			window.location.hash = "login/" + window.location.hash;
        		}
      		}
    	},
  	}


  	// 可選-編寫共用函數();
	var handlers = {
    	navbar: function () {
      		var currentUser = Parse.User.current();
      	
      		if (currentUser) {	// 登入時，顯示哪些buttons(logout,evaluation)
        		//document.getElementById("loginButton").style.display = "none";
        		//document.getElementById("logoutButton").style.display = "block";
        		//document.getElementById("evaluationButton").style.display = "block";
        		//document.getElementById('user_id').innerHTML = currentUser.get('username');
      		} else {	// 未登入時，顯示哪些buttons(login,evaluation)
        		//document.getElementById("loginButton").style.display = "block";
        		//document.getElementById("logoutButton").style.display = "none";
        		//document.getElementById("evaluationButton").style.display = "none";
      		}
      	
      		// 登出時
      		document.getElementById("logoutButton").addEventListener('click', function () {
        		Parse.User.logOut();
        		handlers.navbar();
        		// 重新導向到登入頁面
        		window.location.hash = 'login/';
      		});
    	},	// end navbar function

    	catalog: function(page){	//page: 現在的頁數
    		window.scrollTo(0,0);	// 移動到文件最上方

      		// To support pagination.
      		var limit = 16;		// 每頁顯示16筆
      		var skip = (page-1) * limit;	// 第二頁要略過第一頁的多少筆資料

      		var Petition = Parse.Object.extend("Petition");	// 取得parse的Petition class
      		var query = new Parse.Query(Petition);	// 創造一個查找Petition的query物件
      		query.limit(limit);		// 設定query條件
      		query.skip(skip);

      		query.descending("createdAt");	// 按照創造時間順序降冪排列（ 新-->舊 ）

      		// 執行query（網路連結直到此處才會觸發）
      		query.find({
        		success: function(results) {	// 處理回傳結果，results變數指向回傳的 物件列表

          			var objList = results.map(function(e){ return e.toJSON() });	// 將物件列表轉化成版型能消化的格式
          			document.getElementById('content').innerHTML = templates.catalogTemplate(objList);	// 呼叫型錄的模板函數
          			query.limit(0);
          			query.skip(0);	// 設成0 才能找到所有Petition物件總數
          			var option = {};
          
          			// To support pagination.
          			query.count({
              			success: function(count){
              				var totalPage = Math.ceil(count / limit);
              				var currentPage = parseInt(page);
              				option = {
                				// Watch out the limit.
                				'previous': (currentPage === 1) ? 1 : currentPage-1,
                				'next': (currentPage === totalPage) ? currentPage : currentPage+1,	// 不可超過最前最後頁
                				'current': currentPage,
                				'last': totalPage,
              				};

              				document.getElementById('pagination').innerHTML = templates.catalogPaginationTemplate(option);	// 呼叫分頁的模板函數
            			}, error: function(err){
      
            			}  
          			});
       			}
      		});
    	},	// end catalog

    	petitionView: commons.loginRequiredView(function () {
    		var Petition = Parse.Object.extend('Petition');		// 取得parse的Petition Class
      		var currentUser = Parse.User.current();

      		var PetitionACL = new Parse.ACL();	// ACL:Access Control List
      		PetitionACL.setPublicReadAccess(false);
      		PetitionACL.setPublicWriteAccess(false);
      		PetitionACL.setReadAccess(currentUser, true);
      		PetitionACL.setWriteAccess(currentUser, true);

      		// 設定查詢參數()
      		var query = new Parse.Query(Petition);	// 創一個查Petition的Query物件
      		query.equalTo('user', currentUser);

      		// 問看看Parse有沒有這個使用者之前提交過的peer review物件(
      		// 執行query
      		query.first({
        		success: function(petition){

        			// the petition object is not created, yet. (Notice petition.setACL, and relational data.)
          			if(petition === undefined){
          				petiton = new Petition();
              			//petition.set('user', user);
              			//petition.set('dress', dress);
              			//petiton.setACL(orderACL);
          			}

    	    	}, error: function(object, err){
        
				}
      		}); 
    	}),

    	loginView: function (redirect) {
    	
    	}
  	};

  	var Router = Parse.Router.extend({
  		// 路徑匹配
    	routes: {
      		"": "indexView",
      		'page/:page/': 'catalog',
      		'dress/:dress_id/': 'dress_detail',
      		//"peer-evaluation/": "petitionView",
      		"login/*redirect": "loginView",
    	},

    	// 呼叫handler裡的函數:

    	// If frontpage is requested, show the first page of catalog.
    	index: function(){
      		return handlers.catalog(1);
    	},
    	catalog: handlers.catalog,
    	dress_detail: handlers.dress_detail,
    	indexView: handlers.evaluationView,
    	petitionView: handlers.petitionView,
    	loginView: handlers.loginView,
  	});

  	// 讓router活起來();	
  	this.Router = new Router();
  	Parse.history.start();

  	// 根據user登入與否，顯示navbar內容
  	handlers.navbar();

})()