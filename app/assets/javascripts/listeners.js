// set up javascript
var ready;
ready = function() 
{

	var url = new Array; 	

    // load listeners

	loadListeners('play');
	loadListeners('stop');
	loadListeners('mute_track');
	// loadListeners('track_gain');

	function loadListeners(element_class)
	{
		var element_list = document.getElementsByClassName(element_class)

  		// add play listener
		if (element_class == 'play')
		{			
  			for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 
		      		// e.target.disabled = true;
		      		var song_id = e.currentTarget.dataset.song;
		      		loadTracks(song_id);
					// // setupSource();
					// for (i=0; i< source.length; i++)
					// { 
					// 	source[i].start(0);	
					// }
				});
			}
		}

		//add stop listener	
		if (element_class == 'stop')
		{
			for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 	

					for (i = 0; i< source.length; i++)
					{
						source[i].stop(0);
					}
					audioBuffer = [];
					source = [];
				});
				
			}
		}
		if (element_class =='mute_track')
		{			
		 	for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 
					var glyph_color = e.target.style.color;
					if (glyph_color == '') {
						e.target.style.color = 'red';
						e.currentTarget.parentNode.dataset.load = 'no';
					} else {
						e.target.style.color = '';
						e.currentTarget.parentNode.dataset.load =  'yes';
					}
				});
	    	}
	    }

	    // if (element_class == 'track_gain')
	    // {
	    // 	for (var i=0; i< element_list.length; i++)
	    // 	{
	    // 		element_list[i].addEventListener('change', function(e)
	    // 		{
	    // 			var labelID = e.target.id;
					// var gain = exponentialVolume(this.value, this.max);
					// var lblGain = String(gain.toFixed(2));
					// gainNode[i].gain.value = gain; 
					// document.getElementById(labelID).innerHTML = lblGain ;
	    // 		}); 
	    // 	}
	    // }	
	}
}

//load for document and for new page - Rails way :-\

 $(document).ready(ready)
 $(document).on('page:load', ready)