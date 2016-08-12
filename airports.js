var getPictures = function(){

	var url = "https://api.flickr.com/services/rest/"
	var params = {
	api_key: "0dab42ac0e7c52a4fbfa582473fa7366",
	format: "json",
	method: "flickr.photos.search",
	tags: "Los Angeles"
	}

	$.ajax({
		url: url,
		data: params,
		type: 'Get'
	}).done(function(data){
		console.log(data);
	})
};

getPictures();