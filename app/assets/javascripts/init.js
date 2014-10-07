// set up javascript
var ready;
//establish audio context
AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();
	    
//establish times
startTime = context.currentTime;
stopTime = context.currentTime;
ready = function() 
{

	var url = new Array; 	

    // load Global listeners

	loadListeners('play');
	loadListeners('stop');
	// loadListeners('mute_track');
	loadListeners('player');
}

//load for document and for new page - Rails way :-\

 $(document).ready(ready)
 $(document).on('page:load', ready)