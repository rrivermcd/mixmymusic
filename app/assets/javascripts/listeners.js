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
						e.currentTarget.parentNode.dataset.load = 'false';
					} else {
						e.target.style.color = '';
						e.currentTarget.parentNode.dataset.load =  'true';
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

	//Gain Listener
		function loadGainListeners(id)
	{
		var id = id;
		track_gain= document.getElementById('gain_for_track_' + id);
		track_gain.addEventListener('change', function(e)
		{
			var gain = exponentialVolume(this.value, this.max);
			var lblGain = String(gain.toFixed(2));
			var lblValue = document.getElementById('gain_label_for_track_'+ id)
			lblValue.innerHTML = lblGain;
			gainNode[this.dataset.node].gain.value = gain; 
		}); 
	}	
	
	//Pan Listener
	function loadPannerListeners(id)
	{
		var id = id;
		track_panner= document.getElementById('panner_for_track_' + id);
		track_panner.addEventListener('change', function(e)
		{
			var x = this.value;
			panner[this.dataset.node].setPosition(x, Math.cos(x),1- Math.abs(x));
			var lblValue = document.getElementById('panner_label_for_track_' + id).innerHTML = x;
			lblValue.innerHTML = x;
		}, false);
	}


