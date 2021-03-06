// functions and objects
	//	var sources = [];
	// late loading of tracks to minimize calls to Amazon
	function WireSongs(tracks, song_id)
	{	
		this.tracks = tracks;
		this.song_id = song_id;

		this.state = 'wired';
		this.startTime = 0;
		this.stopTime = 0;
		this.ready = 0;
		
		this.sources = [];		
		this.panners = [];  
		this.gains = []	
  		
  		for (var i = 0; i < this.tracks.length; i++) 
      	{
			this.tracks[i].preload='auto';
			this.tracks[i].load();
			this.sources[i] = context.createMediaElementSource(this.tracks[i]);			
			this.panners[i] = context.createPanner();
			this.gains[i] = context.createGain();
			
			this.sources[i].connect(this.gains[i]);
			this.gains[i].connect(this.panners[i]);
			this.panners[i].connect(context.destination);


			loadPannerListeners(this.sources[i], this.panners[i]);
			loadGainListeners(this.sources[i], this.gains[i]);
		}
	}
    function playingListeners(song)
   	{ 
   		for (i = 0; i< song.sources.length; i++)
   		{

	   		song.sources[i].mediaElement.addEventListener("play", function()
	   		{
				var timeNow = context.currentTime - song.startTime;
				if (context.currentTime.toFixed(3) != timeNow.toFixed(3)) 
			    {
			       	this.currentTime = timeNow;
			    }
			});
		}
	}

    function timeUpdateListeners(song)
    {
		for (i = 0; i< song.sources.length; i++)
   		{
	   		song.sources[i].mediaElement.addEventListener("timeupdate", function()
	   		{
				var timeNow = context.currentTime - song.startTime;
				if (context.currentTime.toFixed(3) != timeNow.toFixed(3)) 
			    {
			       	this.currentTime = timeNow;
			    } 
			});
		}
	}



	function canPlayListeners(song)
	{
		for (i = 0; i<song.sources.length; i++)
		{	
   			song.sources[i].mediaElement.preload='auto';
   			song.sources[i].mediaElement.src = song.tracks[i].currentSrc;			
   			song.sources[i].mediaElement.addEventListener("canplaythrough", function()
			{  
    			song.ready = song.ready + 1;
    			if (song.ready === song.sources.length)
    			{
    				startTracks(song);
				}
    		});
		}
	}

	function startTracks(song)
	{
		song.startTime = song.stopTime;
		song.state = 'playing';
		for (var i=0; i < song.sources.length; i++)
			{
				// song.sources[i].mediaElement.currentTime = song.startTime;
				song.sources[i].mediaElement.play();
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