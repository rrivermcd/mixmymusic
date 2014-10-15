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
		this.gains = [];
		this.splitters = [];
		this.mergers = [];

		//
		this.downMixer = context.createScriptProcessor(4096, 6, 2);

  		for (var i = 0; i < this.tracks.length; i++) 
      	{
			this.tracks[i].preload='auto';
			this.tracks[i].load();
			var trackId = tracks[i].id.replace( /^\D+/g, '');			
			this.sources[i] = context.createMediaElementSource(this.tracks[i]);				
			
			this.splitters[i] = context.createChannelSplitter();
			this.mergers[i] = context.createChannelMerger();
			this.sources[i].connect(this.splitters[i]);	//(this.gains[i]);		
			
			for (j = 0; j < this.splitters[i].numberOfOutputs; j++)
			 {
				var element = document.getElementById('track_control_toggle_' + trackId);
				this.panners[j] = context.createPanner();
				this.gains[j] = context.createGain();
			  	this.splitters[i].connect(this.gains[j], j, 0);
			 	this.gains[j].connect(this.panners[j]);
				this.panners[j].connect(this.mergers[i]);

			 	var newGainRange = document.createElement('input');
			 	newGainRange.type = 'range'; 
			 	newGainRange.id = trackId + '_gain_channel_' + j;
			 	newGainRange.max = '10';
			 	newGainRange.min = '0';
			 	newGainRange.step = '0.1';
			 	newGainRange.value = '3.16';
			 	
			 	element.appendChild(newGainRange);

			 	var newPanRange = document.createElement('input');
			 	newPanRange.type = 'range';
			 	newPanRange.id = trackId + '_pan_channel_' + j;
			 	newPanRange.max = '1.57';
			 	newPanRange.min = '-1.57';
			 	newPanRange.step = '0.01';
			 	newPanRange.value = '0';

			 	element.appendChild(newPanRange);

			 	loadGainListeners(this.gains[j], newGainRange);
			 	loadPanListeners(this.panners[j], newPanRange);
			 }
			
			this.mergers[i].connect(this.downMixer);
			this.downMixer.connect(context.destination);
			
		}
	}

	function canPlayListeners(song)
	{
		// var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
		// if (iOS)
		// {
		// timeUpdateListeners(song);
	 	// 	playingListeners(song);
		// }		
		for (i = 0; i<song.sources.length; i++)
		{	

   			song.sources[i].mediaElement.preload='auto';
   			song.sources[i].mediaElement.src = song.tracks[i].currentSrc;			
   			song.sources[i].mediaElement.addEventListener("canplaythrough", function()
			{  
    			song.ready = song.ready + 1;
    			if (song.ready == song.sources.length)
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
				song.downMixer.onaudioprocess = downMix;
			}
	}				

	//downmix from 5.1 to stereo
	function downMix(e) 
	{		
  		var in1 = e.inputBuffer.getChannelData(0); // Left input
  		var in2 = e.inputBuffer.getChannelData(1); // Right input
 		var in3 = e.inputBuffer.getChannelData(2); // Center input 
 		var in4 = e.inputBuffer.getChannelData(3); // (Low Frequency??) 
  		var in5 = e.inputBuffer.getChannelData(4); // Left Surround input
  		var in6 = e.inputBuffer.getChannelData(5); // Right Surround input

  		var leftOut = e.outputBuffer.getChannelData(0); // Left output 
  		var rightOut = e.outputBuffer.getChannelData(1); // Right output 

  		for (var i = 0; i < in1.length; i++) 
  		{
			leftOut[i] = in1[i] +  0.7071 *(in3[i] + in5[i]); // W3C formula for Down Mixing 5.1
			rightOut[i] = in2[i] + 0.7071 *(in3[i] + in6[i]); // W3C formula for Down Mixing 5.1
	 	}
	}

	function loadPanListeners(panNode, panRange)
	{

		panRange.addEventListener('change', function(e)
		{
			var x = this.value;
			panNode.setPosition(x, Math.cos(x),1- Math.abs(x));
		}, false);
	}

		//Gain Listener
		function loadGainListeners(gainNode, gainRange )
	{
		gainRange.addEventListener('change', function(e)
		{
			 var gain = exponentialVolume(this.value, this.max);
			// var lblGain = String(gain.toFixed(2));
			// var lblValue = document.getElementById('gain_label_for_track_'+ id)
			// lblValue.innerHTML = lblGain;
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



	//NOT USED: Potential prototypes for mobile, esp. iOS
	function playingListeners(song)
   	{ 
   		for (i = 0; i< song.sources.length; i++)
   		{
	   		song.sources[i].mediaElement.addEventListener("play", function()
	   		{
				//var timeNow = context.currentTime - song.startTime;
				var songStartTime = song.startTime;
				if (songStartTime != 0)
				{
					songStartTime = songStartTime.toFixed(3);
				}
				if (this.currentTime.toFixed(3) != context.currentTime.toFixed(3) - songStartTime) 
			    {
			       	this.currentTime = context.currentTime - songStartTime;
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
				var songStartTime = song.startTime;
				if (songStartTime != 0)
				{
					songStartTime = songStartTime.toFixed(3);
				}

				// var timeNow = context.currentTime - song.startTime;
				if (this.currentTime.toFixed(3) != context.currentTime.toFixed(3) - songStartTime) 
			    {
			       	this.currentTime = context.currentTime - songStartTime;
			    } 
			});
		}
	}