// set up javascript
var ready;
ready = function() 
{

	var url = new Array; 	

    // load listeners

	loadListeners('song');
	loadListeners('play');
	loadListeners('stop');

	function loadListeners(element_class)
	{
		var element_list = document.getElementsByClassName(element_class)

    	//add song select listener		
  //   	if (element_class == 'song')
		// {			
		//     for (var i=0; i < element_list.length; i++) 
		//     {
		//     	element_list[i].addEventListener("click", function(e)
		//       	{
		//       		url = [];
		      		// if (e.target.className != element_class) return;
		// 			var song = e.target;
		// 	      	var tracks = song.querySelector('.js-track-list');
		// 	      	var list_length = tracks.children.length;
		// 	      	for (var i = 0; i < list_length; i++) 
		// 	      	{
		// 	      		var child = tracks.children[i];
		// 	      		var test_url = child.dataset.url;
		// 	      		// alert(test_url)
		// 	      		if (test_url) 
		// 	      		{
		// 	      			url[url.length] = test_url;		      			
		//       		}
		//       	}
		// 			getTracks(url);
			// 		loadTracks(e.target.id);
			// 	}); 
			// }   
  	// 	}

  		// add play listener
		if (element_class == 'play')
		{			
  			for (var i=0; i < element_list.length; i++) 
		    {
		    	//add click listener
		    	element_list[i].addEventListener("click", function(e)
		      	{ 
		      		var song_id = e.target.dataset.song;
		      		loadTracks(song_id);
					// // setupSource();
					// for (i=0; i< source.length; i++)
					// { 
					// 	source[i].start(0);	
					// }
				});
			}
		}

		//add stop lisener	
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
	}

	function loadTracks(song_id){
  		url = [];
  		var song_id = 'song_' + song_id;
		var song = document.getElementById(song_id);
      	var tracks = song.querySelector('.js-track-list');
      	var list_length = tracks.children.length;
      	for (var i = 0; i < list_length; i++) 
      	{
      		var child = tracks.children[i];
      		var test_url = child.dataset.url;
      		// alert(test_url)
      		if (test_url) 
      		{
      			url[url.length] = test_url;		      			
  			}
  		}
		getTracks(url);
	}
}

//load for document and for new page - Rails way :-\

 $(document).ready(ready)
 $(document).on('page:load', ready)