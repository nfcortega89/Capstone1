$(function() {
    $('.flight-getter').submit(function(e) {
        e.preventDefault();
        var departure = $(this).find("input[name='from']").val();
        var arrival = $(this).find("input[name='to']").val();
        var date = $(this).find("input[name='date']").val();
        getResults(departure, arrival, date);
    })
    $('.clear').on('click', function(e){
      e.preventDefault();
      $('.results').empty();
      $('.search-results').empty();
    })
})

// create a function called getResults 3 paramaters: dept, arr, and the date
var getResults = function(dept, arr, date) {

    // we create a variable to hold our url and our parameters so we can pass them in AJAX
    var url = "terminal2.expedia.com/x/mflights/search";
    var params = {
        apikey: 'Uyg714nBLezX9YjKGkmNGDuI5kJi9xUB',
        departureAirport: dept,
        arrivalAirport: arr,
        departureDate: date
    }

    // we'll use the ajax method to pull data and pass our defined url and parameters
    $.ajax({
        url: url,
        data: params,
        dataType: 'json',
        type: 'GET',

        // after successfully requesting data, we want to do something to the data
        // we do this by passing it into an anonymous function     
    }).done(function(data) {

        console.log(data);

        // we create a variable called searchResults to hold the results returned from our
        // showSearchResult function which shows the departing airport, arrival airport and how many 
        // results came up from our query
        var searchResults = showSearchResults(dept, arr, data.legs.length);

        // now that we've defined what searchResults is we'll use jQuery to search our document
        // for the class 'search-result' and replace that whole section with wih our searchResult
        // by using the html method.
        $('.search-results').html(searchResults);

        // we'll create a for loop to iterate over all the legs in our data
        for (var i = 0; i < data.legs.length; i++) {


            // since there are the same number of offers and legs, we can use the same loop
            // to iterrate over offers
            var offer = data.offers[i];
            var segments = data.legs[i].segments;

            // theres another array in segments so we'll create another loop to iterate over
            // the array located inside segment
            for (var j = 0; j < segments.length; j++) {

                // we'll create a variable called flight, to hold the results we get from our
                // flightInfo function, in which we pass in our newly defined variables;
                var flight = flightInfo(segments[j], offer);

                // we then use jQuery to look for our 'results' section and append flight to this section
                $('.results').append(flight);
            }

            // we want to check to see if the flight is just one stop or a connecting flight so we'll
            // also append a horizontal ruler after every flight;
            $('.results').append('<hr>');
        }

        // if our request for data fails, we'll also want to know. so we'll add a fail method
        // that alerts the user 'error'
    }).fail(function() {

        alert('error');
    })
}

// we'll create another function called flightInfo that takes in two parameters
// 'segment' and 'offer' so that we can show the results of our query
var flightInfo = function(segment, offer) {

    // first we'll create a variable called results and the its value we'll
    // use jQuery to look for our 'template' class on our document and clone that for every flight
    var results = $('.templates .search').clone();


    // we'll create variables for 'price, departureTime, arrivalTime, flightNumber, airline, airportDeparture
    // and airportArrival' and use the find method to find the appropriate class on our template
    // next we'll use the text method to replace it by using our parameters as a placeholder and accces the data
    // with its corresponding location in the nested object 

    var price = results.find('.price').text(offer.totalFare);
    var departureTime = results.find('.departure-time').text(segment.departureTime);
    var arrivalTime = results.find('.arrival-time').text(segment.arrivalTime);
    var flightNumber = results.find('.flight-number').text(segment.airlineCode + " " + segment.flightNumber);
    var airline = results.find('.airline-name').text(segment.airlineName);
    var airportDeparture = results.find('.origin').text(segment.departureAirportLocation);
    var airportArrival = results.find('.destination').text(segment.arrivalAirportLocation);

    // we'll want to return the results so that this function spits out the information
    return results;
}

// we'll create another function called showSearchResults with 3 parameters 'deptPort, arrPort and resultNum'
var showSearchResults = function(deptPort, arrPort, resultNum) {

    // we'll create a variable called results that tells the user how many flights there are leaving from
    // their origin location to their destination
    var results = resultNum + ' flights leaving from ' + deptPort + ' to ' + arrPort;

    // we'll want to return the results so that this function spits the data back out.
    return results;
}