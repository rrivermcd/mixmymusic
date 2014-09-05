// set up javascript
var ready;
ready = function() 
{

	var url = new Array; 	

    // load Global listeners

	loadListeners('play');
	loadListeners('stop');
	loadListeners('mute_track');


}

//load for document and for new page - Rails way :-\

 $(document).ready(ready)
 $(document).on('page:load', ready)