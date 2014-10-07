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
      		  		var song_id = 'song_' + song_id;
					var song = document.getElementById(song_id);
      				var elements = song.querySelector('.js-track-list');
      				var tracks = elements.querySelectorAll('.player');
		      		if (startTime == 0)
		      		{
		      			loadTracks(tracks, elements);
					}
					else
					{
						startTracks(tracks);
					}

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
		      		var song_id = e.currentTarget.dataset.song;		      		
			 		var song_id = 'song_' + song_id;
					var song = document.getElementById(song_id);
			      	var elements = song.querySelector('.js-track-list');
			      	var tracks = elements.querySelectorAll('.player');	
			      	stopTime = context.currentTime - startTime;	      		
					for (i = 0; i< tracks.length; i++)
					{
						tracks[i].pause();
					}
				
				});
				
			}
		}

			//Pan Listener

	};	

