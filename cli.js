var genius = require('rapgenius-js');
var request = require('request');
var songQuery = process.argv[2]
console.log(songQuery);

function songCallback (err, songs, lyricsAndExplanations) {
  if (err) {
    console.log("Error: " + err);
  } else {
    if (songs.length > 0) {
      genius.searchLyricsAndExplanations(songs[0].link, "rap", lyricsSearchCb)
    }
    else {
      console.log("My bad, no songs found for" + " " + songQuery + "...");
    }
  }
}

function lyricsSearchCb(err, lyricsAndExplanations){
  if (err) {
    console.log("Error: " + err);
    throw err;
  }

  var lyrics = lyricsAndExplanations.lyrics;
  var str = lyrics.getFullLyrics(true);
  var strNoPunc = str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var whiteSpacePattern = /\s+/g;
  var strFinal = strNoPunc.split(whiteSpacePattern);
  console.log(strFinal);

  var firstWord = strFinal[13];

  isWordNaughty(firstWord, function naughtyCallback (err, response) {
    if (err) {
      console.log('oops there was an error');
      throw err;
    } else {
      if (response.isNaughty) {
        console.log(response.word + " " + "is a naughty word!");
      }
      else {
        console.log(response.word + " " + "is fine by me!")
      }
    }
  });
};

function isWordNaughty (word, callback) {
  var baseUrl = 'http://www.wdyl.com/profanity?q=';
  request({
    url: baseUrl + word
  }, function (err, response, body) {
    body = JSON.parse(body);
    if (err) {
      callback(err, null)
    } else {
      var isNaughty = (body.response === "true");

      console.log(body);
      callback(null, {
        word: word,
        isNaughty: isNaughty
      })
    }
  });
}

genius.searchSong(songQuery, "rap", songCallback);
