Parse.initialize("LQXW7t4hRmWf8Lw4dLcPaNRDQbMoe24rctZE7G0z", "qVd2E2OB786ORKQ83hWg6OQRs17YLIPf9H0MdUTP")


/*加入搜尋的id<input type="text" class="form-control" id="search_text">*/

function search(){
	console.log("in search");


	var search_text document.getElementById("search_text").value;




	var Petition = Parse.Object.extend("Petition");
	var query = new Parse.Query(Petition);
	query.select("title");
	query.find().then(function(results) {
  		// each of results will only have the selected fields available.
  		console.log(results);
	});


};