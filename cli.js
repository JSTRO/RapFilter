var songQuery = process.argv[2]
console.log(songQuery);

var genius = require('rapgenius-js');

function songCallback (err, songs, lyricsAndExplanations) {
	if(err) {
    console.log("Error: " + err);
    } 
    else {
  		if (songs.length > 0) {
  			genius.searchLyricsAndExplanations(songs[0].link, "rap", lyricsSearchCb)
  		}
    	else {
    		console.log("My bad, no songs found for" + " " + songQuery + "...");
    	}
    }
};

function lyricsSearchCb(err, lyricsAndExplanations){
    if(err) {
      console.log("Error: " + err);
    }
    else {
         var lyrics = lyricsAndExplanations.lyrics;
      	 lyrics.getFullLyrics(true);
    }
    var str = lyrics.getFullLyrics(true);
    var strNoPunc = str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var whiteSpacePattern = /\s+/g;
    var strFinal = strNoPunc.split(whiteSpacePattern);
	console.log(strFinal);

	var request = require('request');

	var baseUrl = 'http://www.wdyl.com/profanity?q=';
	var firstWord = strFinal[13];
	
	request({ 
	url: baseUrl + firstWord
		}, 
		
	function callback (err, response, body) {
		body = JSON.parse(body);
		if (err) {
			console.log('oops there was an error');
			throw err;
		}
		else {
			if (body.response === "true") {
				console.log(firstWord + " " + "is a naughty word!");
			} 
			else {
				console.log(firstWord + " " + "is fine by me!")
			}
			console.log(body);
		}
});

};

genius.searchSong(songQuery, "rap", songCallback);

