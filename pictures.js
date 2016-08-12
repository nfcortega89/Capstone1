var getPictures = function(tags) {

    var url = "https://api.flickr.com/services/rest/"
    var params = {
        api_key: "0dab42ac0e7c52a4fbfa582473fa7366",
        format: "json",
        nojsoncallback: 1,
        method: "flickr.photos.search",
        tags: "Egypt Pyramids",
        per_page: 10
    }

    $.ajax({
        url: url,
        data: params,
        type: 'GET'
    }).done(function(data) {
        var response = data;
        // console.log('data', response);
        // console.log('response.photos', response.photos)
        // console.log('response.photos.photo', response.photos.photo);
        var photos = data.photos.photo;

        // console.log(data);
        for (var i = 0; i < 5; i++) {
            var farmId = photos[i].farm;
            var serverId = photos[i].server;
            var id = photos[i].id;
            var secret = photos[i].secret;

            var picture = showPictures(farmId, serverId, id, secret);
            $('.pictures').append(picture);
        }
    })
};

getPictures();

var showPictures = function(farmId, serverId, id, secret) {

    var results = $('.pictures').clone();

    var picture = results.find('.pictures img').attr('src', "http://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg");
    console.log("http://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg");
    return results;
};
