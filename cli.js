var songQuery = process.argv[2]
console.log(songQuery);

var genius = require('rapgenius-js');

function songCallback (err, songs, lyricsAndExplanations) {
	if(err){
    console.log("Error: " + err);
  } else{
  		if (songs.length > 0) {
  			genius.searchLyricsAndExplanations(songs[0].link, "rap", lyricsSearchCb)
  		}
    	else {
    		console.log("My bad, no songs found for" + " " + songQuery + "...");
    	}
    }
};

function lyricsSearchCb(err, lyricsAndExplanations){
    if(err){
      console.log("Error: " + err);
    }else{
         var lyrics = lyricsAndExplanations.lyrics;
      
      console.log("**** LYRICS *****\n%s", lyrics.getFullLyrics(true));
    }
};

genius.searchSong(songQuery, "rap", songCallback);

