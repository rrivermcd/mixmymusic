//  set up variables
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioBuffer = new Array();  //array of buffered audio files.  
	var source = new Array();
// functions and objects

	//Load file from a URL as an ArrayBuffer.
	function loadRequest(url, cfunc) 
	{
		request = new XMLHttpRequest();
		request.onreadystatechange = cfunc;
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.send();
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
		      	},

	      		function(e){"Error with decoding audio data" + e.err});

		 		if (tracks.length > 0) 
		 		{
		 			getTracks(tracks);
		        } 
		        else
		        {
//		        	setupSource();
		        }
		    }
		});
	}

	//set up the sound buffers
	function setupSource(){
 		source = [];
		var length = audioBuffer.length;
		
		for (i=0; i<length; i++)
		{
			if (!source[i])		
			{
			setSourceBuffer = audioCtx.createBufferSource();
			source.push(setSourceBuffer);
			source[i].buffer = audioBuffer[i];
			source[i].connect(audioCtx.destination);
			source[i].loop = true;
			}
		}
	}