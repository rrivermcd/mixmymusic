//  set up variables
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioBuffer = [];  //array of buffered audio files. 
	var gainNode = []; //set up of gain nodes for tracks. function setupGainNode() 
	var source = [];
	var trackIds = [];

// functions and objects

	// late loading of tracks to minimize calls to Amazon
	function loadTracks(song_id){
  		url = [];
  		var song_id = 'song_' + song_id;
		var song = document.getElementById(song_id);
      	var tracks = song.querySelector('.js-track-list');
      	var list_length = tracks.children.length;
      	var track_ids = [];
      	for (var i = 0; i < list_length; i++) 
      	{
	  		var child = tracks.children[i];
	  		var track_data = child.dataset;
	  		if (track_data.load  == 'yes')
			{	var test_url = track_data.url;
		  		// alert(test_url)
		  		if (test_url) 
		  		{
					trackIds[trackIds.length] = track_data.track;		  			
					url[url.length] = test_url;	      			
				}
			}
		}

		getTracks(url);
	}

	//callback for XMLHttpRequest file fetch
	function getTracks (url) 
	{
		var tracks = url;
		track = tracks.shift();
		loadRequest(track, function()
		{
			if (request.readyState == 4 && request.status == 200)
			{
		    	var audioData = request.response;

				audioCtx.decodeAudioData(audioData, function(buffer) 
				{
					myBuffer = buffer;
		        	audioBuffer[audioBuffer.length] = myBuffer;
  			 		if (tracks.length > 0) 
			 		{
			 			getTracks(tracks);
			        } 
			        else 
			        {
			        	setupSource();
			        }
		    	},
	      		function(e){"Error with decoding audio data" + e.err});
		    }
		});
	}

	//Load file from a URL as an ArrayBuffer.
	function loadRequest(url, cfunc) 
	{
		request = new XMLHttpRequest();
		request.onreadystatechange = cfunc;
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.send();
	}

	//set up the sound buffers
	function setupSource(){
 		source = [];
		var length = audioBuffer.length;
		
		for (i=0; i<length; i++)
		{

			setSourceBuffer = audioCtx.createBufferSource();
			source.push(setSourceBuffer);
			source[i].buffer = audioBuffer[i];
			// source[i].connect(audioCtx.destination);
			source[i].loop = true;
		}
		// loadGainListeners();
		setupGain();
		setupRouting();
		playSong();
	}

	//Gain Node
	function setupGain() {
		// listenersNeeded = 0;
		// if (!mainVolumeNode) {
		// 	mainVolumeNode = audioCtx.createGain();
		// 	mainVolumeNode.gain.value = 1.00;
		// }
		var length = audioBuffer.length;
		for (i=0; i<length; i++)
		{
			if(!gainNode[i]) {
				setGainNode = audioCtx.createGain();
				gainNode.push(setGainNode);
				gainNode[i].gain.value = 1.00;
				// listenersNeeded = ++listenersNeeded;
			}
		}
		// if (listenersNeeded >0) {
		// 	setupGainListeners(listenersNeeded);
		// }
	}

	//setup Routing for default nodes
	function setupRouting(track_ids) {
		length=audioBuffer.length;
		// mainVolumeNode.connect(analyzer);	
		// analyzer.connect(audioCtx.destination);
		for(i=0;i<length;i++)
		{
			var id = trackIds[i];
			track_gain = document.getElementById('gain_for_track_' + id);
			source[i].connect(gainNode[i]);	
			gainNode[i].connect(audioCtx.destination);
			track_gain.dataset.track = i;
			loadGainListeners(id)
		}
		
	}

	function playSong(){
		// setupSource();
		for (i=0; i< source.length; i++)
		{ 
			source[i].start(0);	
		}
	}

	function exponentialVolume(gain, max){
		var volume = gain;
		var maximum = max;
		var fraction = volume / maximum;
		var exponentGain = fraction * fraction * maximum;
		return exponentGain;
	}

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
			gainNode[this.dataset.track].gain.value = gain; 
		}); 
	}	
	
	// function track_manager(){
	// 	this.track = '';
	// 	this.tracks = {} ;


	// 	this.omit_track = function(track){
	// 		this.track = track;
	// 		this.tracks.omitted = this.track;
	// 	}
 //  	}
