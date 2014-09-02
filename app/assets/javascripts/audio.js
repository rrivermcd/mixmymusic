//  set up variables
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioBuffer = new Array();  //array of buffered audio files.  
	var source = new Array();

// functions and objects

	// late loading of tracks to minimize calls to Amazon
	function loadTracks(song_id){
  		url = [];
  		var song_id = 'song_' + song_id;
		var song = document.getElementById(song_id);
      	var tracks = song.querySelector('.js-track-list');
      	var list_length = tracks.children.length;
      	for (var i = 0; i < list_length; i++) 
      	{
	  		var child = tracks.children[i];
	  		if (child.dataset.load  == 'yes')
			{	var test_url = child.dataset.url;
		  		// alert(test_url)
		  		if (test_url) 
		  		{
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
			source[i].connect(audioCtx.destination);
			source[i].loop = true;

		}
		playSong();
	}

	function playSong(){
		// setupSource();
		for (i=0; i< source.length; i++)
		{ 
			source[i].start(0);	
		}
	}

	// function track_manager(){
	// 	this.track = '';
	// 	this.tracks = {} ;


	// 	this.omit_track = function(track){
	// 		this.track = track;
	// 		this.tracks.omitted = this.track;
	// 	}
 //  	}
