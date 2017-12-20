var MarkovChain = require('markovchain');
var fs = require('fs');
var quotes = new MarkovChain(fs.readFileSync('./lyrics/TupacLyrics.txt', 'utf8'));
// var fulLyrics = [];
// var starterWord = 'The';
// var nextLineSeed1 = starterWord;
// var nextLineSeed2 = '';
// var nextLineSeed3 = '';
// var lyricContinue = true;

function markovChainLyrics(selectedAuthor, userSeedWord){
	var fullLyrics = [];
	var starterWord = 'The';
	var nextLineSeed1 = starterWord;
	var nextLineSeed2 = 'Only';
	var nextLineSeed3 = 'You';
	var lyricContinue = true;
	//console.log(userSeedWord);

	switch(selectedAuthor){// set lyric database based on author
		case "Tupac": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/TupacLyrics.txt', 'utf8'));
			break;
		case "Morrissey": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/MorresseyLyrics.txt', 'utf8'));
			break;	
		case "Christmas": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/ChristmasLyrics.txt', 'utf8'));
			break;
		case "Beatles": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/BeatlesLyrics.txt', 'utf8'));
			break;
		case "Meatloaf": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/MeatloafLyrics.txt', 'utf8'));
			break;
		case "Prince": 
			quotes = new MarkovChain(fs.readFileSync('./lyrics/PrinceLyrics.txt', 'utf8'));
			break;
	}

	nextLineSeed1 = userSeedWord;
		for(var i = 0; i <= 8; i++){
		if(lyricContinue){
			var nextLine = quotes.start(nextLineSeed1).end(15).process();
			if (nextLine.length <=3 ){// if he next lyric is less than 3 words, try another seed
				nextLine = quotes.start(nextLineSeed2).end(15).process();
			};
			if (nextLine.length <=3 ){// if he next lyric is less than 3 words, try another seed
				nextLine = quotes.start(nextLineSeed3).end(15).process();
			};	
			if (nextLine.split(' ').length <=1 ){
			//if the lyric is one word, terminate,
			// otherwise is would just keep spitting out the same one word
				lyricContinue = false;
				console.log("***Single Word Lyric: " + nextLine + "***");

			};		
			// save each line to the fullLyrics array
			fullLyrics[i] = nextLine;
			console.log(nextLine);

			var nextWordList = nextLine.split(' ');
			//console.log(nextWordList);
			nextLineSeed1 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
			nextLineSeed2 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
			nextLineSeed3 = nextWordList[Math.floor(Math.random()*nextWordList.length)];
		}

		// post method pushes fullLyrics to SQL db


	}
	// returns array of whole song
	return fullLyrics.join("\n");
}

console.log("===========markovChain available=============");//verifies it gets to this fucntion

// Exports the function for other files to use
module.exports.markovChainLyrics = markovChainLyrics;

// test cases below during construction
// console.log("=============Static Tests===============");

// console.log(quotes.start('The').end(15).process());
// console.log(quotes.start('The').end(15).process());
// console.log(quotes.start('One').end(15).process());
// console.log(quotes.start('Time').end(15).process());
// console.log(quotes.start('This').end(15).process());
// console.log(quotes.start('Baby').end(15).process());
// console.log(quotes.start('mama').end(15).process());
// console.log(quotes.start('I').end(15).process());
// console.log(quotes.start("Y'all").end(15).process());
// console.log(quotes.start('Why').end(15).process());
// // console.log("==============Full Lyrics=================");
// // console.log(JSON.stringify(fulLyrics));

// console.log("=============Function Tests===============");

// markovChainLyrics(starterWord);

