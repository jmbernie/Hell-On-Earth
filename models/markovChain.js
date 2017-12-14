var MarkovChain = require('markovchain');
var fs = require('fs');
var quotes = new MarkovChain(fs.readFileSync('./TupacLyrics.txt', 'utf8'));
var fulLyrics = [];
var starterWord = 'The';
var nextLineSeed1 = starterWord;
var nextLineSeed2 = '';
var nextLineSeed3 = '';
var lyricContinue = true;

function markovChainLyrics(userSeedWord){
	nextLineSeed1 = userSeedWord;
		for(var i = 0; i <= 9; i++){
		if(lyricContinue){
			var nextLine = quotes.start(nextLineSeed1).end(15).process();
			if (nextLine.length <=3 ){
				nextLine = quotes.start(nextLineSeed2).end(15).process();
			};
			if (nextLine.length <=3 ){
				nextLine = quotes.start(nextLineSeed3).end(15).process();
			};	
			if (nextLine.split(' ').length <=1 ){
				lyricContinue = false;
				console.log("***Single Word Lyric: " + nextLine + "***");

			};		

			fulLyrics[i] = nextLine;
			console.log(nextLine);

			var nextWordList = nextLine.split(' ');
			//console.log(nextWordList);
			nextLineSeed1 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
			nextLineSeed2 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
			nextLineSeed3 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
		}

		// need to push fullLyrics to SQL db

	}
}


console.log("=============Static Tests===============");

console.log(quotes.start('The').end(15).process());
console.log(quotes.start('The').end(15).process());
console.log(quotes.start('One').end(15).process());
console.log(quotes.start('Time').end(15).process());
console.log(quotes.start('This').end(15).process());
console.log(quotes.start('Baby').end(15).process());
console.log(quotes.start('mama').end(15).process());
console.log(quotes.start('I').end(15).process());
console.log(quotes.start("Y'all").end(15).process());
console.log(quotes.start('Why').end(15).process());
// console.log("==============Full Lyrics=================");
// console.log(JSON.stringify(fulLyrics));

console.log("=============Function Tests===============");

markovChainLyrics(starterWord);