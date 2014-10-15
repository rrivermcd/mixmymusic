// set up javascript
var ready;
//establish audio context
AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();  
wiredSongs = [];
//establish times
// startTime = context.currentTime;
// stopTime = context.currentTime;
ready = function() 
{

	var url = new Array; 	

    // load Global listeners

	loadListeners('play');
	loadListeners('stop');
	loadListeners('pause')
	loadListeners('mute_track');
	loadListeners('player');
	loadListeners('solo');

}

//load for document and for new page - Rails way :-\

 $(document).ready(ready);
 $(document).on('page:load', ready);
 // $(document.on('deviceready', ready));
