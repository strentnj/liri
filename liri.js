var action = process.argv[2];
var value = process.argv[3];

var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

runLiri();

function runLiri() {
    switch (action) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotifyThis();
            break;

        case 'movie-this':
            movieThis();
            break;

        case 'do-what-it-says':
            doThis();
            break;
    }
}

function myTweets() {

    var params = { screen_name: 'Stacy_Trent', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("Twitter Hates Me");
            for (var tweet in tweets) {
                console.log(tweets[tweet].user.created_at);
                console.log(tweets[tweet].text);
                console.log("____________________________________")
            };
            console.log("=======================================");

            // console.log(tweets);

        } else {
            console.log(error);
        }
    });
}

function spotifyThis() {
    var request = require('request');
    if (value == null) {
        value = "the-sign-ace-of-base"
    }
    var spotifyUrl = 'https://api.spotify.com/v1/search?query=' + value + '&offset=0&limit=1&type=track,artist';
    request(spotifyUrl, function(error, response, results) {

        if (!error && response.statusCode == 200) {
            var songs = JSON.parse(results).tracks.items;
            for (var i in songs) {
                console.log("***********S*P*O*T*I*F*Y**************");
                console.log("Artist:" + songs[i].artists[0].name);
                console.log("Song Title:" + songs[i].name);
                console.log("Preview Link:" + songs[i].preview_url);
                console.log("Album:" + songs[i].album.name);
                console.log("***********S*P*O*T*I*F*Y**************");
                //console.log(JSON.parse(body).artists.name);
            }
        }
    })
}

function movieThis() {
    if (value == null) {
        value = "Mr-Nobody";
    }
    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&r=json&tomatoes=true', function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var m = JSON.parse(body);
            console.log("IMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDB");
            console.log("Title: " + m.Title);
            console.log("Year: " + m.Year);
            console.log("IMDB Rating: " + m.imdbRating);
            console.log("Language: " + m.Language);
            console.log("Plot: " + m.Plot);
            console.log("Actors: " + m.Actors);
            console.log("Rotten Tomatoes Rating: " + m.tomatoRating);
            console.log("Rotten Tomatoes Url: " + m.tomatoURL);
            console.log("IMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDBIMDB");

        }
    });
}

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArray = data.split(" ");

        action = dataArray[0];
        value = dataArray[1];
        console.log(dataArray);
        runLiri();
    });
}