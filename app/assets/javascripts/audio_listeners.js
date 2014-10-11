
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
      		  		var thisIsPaused = false;
      		  		var thisSong = '';		      		
      		  		var song_id = e.currentTarget.dataset.song;
      		  		var song_id = 'song_' + song_id;

		      		for (i = 0; i< wiredSongs.length; i++)
		      		{
		      			aSong = wiredSongs[i];
		      			if (aSong.song_id == song_id)	
		      			{	
		      				thisSong = aSong;
		      			}
		      			else
		      			{
			      			if (aSong.state == 'playing')
			      			{
			      				for (j=0; j<aSong.sources.length; j++)
			      				{
									aSong.sources[j].mediaElement.pause();
									aSong.state = 'paused';
								}

			      			}
		      			}
		      		}
	      			if (thisSong == '')
	      			{	
		      			var song = document.getElementById(song_id);
	      				var elements = song.querySelector('.js-track-list');
	      				var tracks = elements.querySelectorAll('.player');
						wiredSongs[wiredSongs.length] = new WireSongs(tracks, song_id);
						var thisSong = wiredSongs[wiredSongs.length-1];					
						canPlayListeners(thisSong);
						// playingListeners(thisSong);
						// timeUpdateListeners(thisSong);	
					} else if (thisSong.state == 'paused')
	      			{
  						startTracks(thisSong);
					}
					else 
					{
						canPlayListeners(thisSong);
					}

						
	      			
				});
			}
		}

				//add stop listener	
		if (element_class == 'stop' || element_class == 'pause')
		{
			for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 	
		      		var thisSong = '';
		      		var song_id = e.currentTarget.dataset.song;		      		
			 		var song_id = 'song_' + song_id;
			 		var whoClicked = e.currentTarget.className;
			 		for (i=0; i<wiredSongs.length; i++)
			 		{
			 			if (wiredSongs[i].song_id === song_id)
			 			{
			 				thisSong = wiredSongs[i];
			 				break;
			 			}
			 		}
					// var song = document.getElementById(song_id);
			  //     	var elements = song.querySelector('.js-track-list');
			  //     	var tracks = elements.querySelectorAll('.player');	
			  //     	stopTime = context.currentTime - startTime;	      		
					for (i = 0; i< thisSong.sources.length; i++)
					{
						thisSong.sources[i].mediaElement.removeEventListener("canplaythrough");
						thisSong.sources[i].mediaElement.pause();

						if (whoClicked.indexOf('stop') >= 0)
						{
							thisSong.ready = 0;
							thisSong.sources[i].mediaElement.src='';
							thisSong.state = 'stopped';
						}
						else
						{
							thisSong.state = 'paused';
						}
					}

					thisSong.stopTime = context.currentTime - thisSong.startTime;				
				});
				
			}
		}
		//add mute listener
		if (element_class =='mute_track')
		{			
		 	for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 
					var glyph_color = e.target.style.color;
					var track_id = "audio_" + e.target.parentNode.dataset.track;
					var audio = document.getElementById(track_id);					
					if (glyph_color == '') 
					{
						e.target.style.color = 'red';
						audio.muted = true;
					} else 
					{
						e.target.style.color = '';
						audio.muted = false;
					}
				});
			}
		}
	};	

