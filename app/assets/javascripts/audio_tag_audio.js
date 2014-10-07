// functions and objects

	// late loading of tracks to minimize calls to Amazon
	function loadTracks(tracks, elements)
	{
		var ready = 0;
		var sources = [];
		var panners = [];  
		var gains = []	
  		for (var i = 0; i < tracks.length; i++) 
      	{
 

			tracks[i].preload='auto';
			
			sources[i] = context.createMediaElementSource(tracks[i]);
			panners[i] = context.createPanner();
			gains[i] = context.createGain();
			
			sources[i].connect(gains[i]);
			gains[i].connect(panners[i]);
			panners[i].connect(context.destination);


			loadPannerListeners(sources[i], panners[i]);
			loadGainListeners(sources[i], gains[i]);

	    	tracks[i].addEventListener("playing", function()
	       	{
	       	    if (startTime != 0) 
	       	    {   
					nowTime = context.currentTime - startTime;  
					if (this.currentTime.toFixed(3) != nowTime.toFixed(3)) 
				    {
				       	this.currentTime = nowTime;
				    }
				}
			});

       	    tracks[i].addEventListener("timeupdate", function()
       	    {
       	    	if (startTime != 0)
       	    	{      
				   nowTime = context.currentTime - startTime;  
				   if (this.currentTime.toFixed(3) != nowTime.toFixed(3)) 
			       {
			       	this.currentTime = nowTime;
			       }
		    	}
	    	});
	    	tracks[i].addEventListener("canplay", function()
	    	{    		
    			ready = ready + 1;
    			if (ready == tracks.length)
				{
					startTracks(tracks);
				}
	    	});
		}
	}

	function startTracks(tracks)
	{	
		startTime = context.currentTime - stopTime;
		for (var i=0; i < tracks.length; i++)
		{
			tracks[i].play();
		}
	}


	function loadPannerListeners(source, panner)
	{
		var id = source.mediaElement.id.replace( /^\D+/g, '');
		track_panner= document.getElementById('panner_for_track_' + id);
		track_panner.addEventListener('change', function(e)
		{
			var x = this.value;
			panner.setPosition(x, Math.cos(x),1- Math.abs(x));
			var lblValue = document.getElementById('panner_label_for_track_' + id).innerHTML = x;
			lblValue.innerHTML = x;
		}, false);
	}

		//Gain Listener
		function loadGainListeners(source, gainNode)
	{
		var id = source.mediaElement.id.replace( /^\D+/g, '');;
		track_gain= document.getElementById('gain_for_track_' + id);
		track_gain.addEventListener('change', function(e)
		{
			var gain = exponentialVolume(this.value, this.max);
			var lblGain = String(gain.toFixed(2));
			var lblValue = document.getElementById('gain_label_for_track_'+ id)
			lblValue.innerHTML = lblGain;
			gainNode.gain.value = gain; 
		}); 
	}	
	
	function exponentialVolume(gain, max){
		var volume = gain;
		var maximum = max;
		var fraction = volume / maximum;
		var exponentGain = fraction * fraction * maximum;
		return exponentGain;
	}