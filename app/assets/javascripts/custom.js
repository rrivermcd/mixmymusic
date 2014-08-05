 document.addEventListener("DOMContentLoaded", function() {
  //$(document).ready(function(){

  // Globals
  var list = document.querySelector(".js-interactive-list");
  var audio = document.getElementById('audio'); 
  
  // Functions


  function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object

      // Loop through the FileList.
      for (var i = 0, f; f = files[i]; i++) {

        // Only process audio files.
        if (!f.type.match('audio.*')) {
          document.getElementById('upload').disabled = true;
          continue;
        }
        else {

            document.getElementById('upload').disabled = false;
            document.forms[0].elements["ct"].value = f.type;
        }
      }
    }

   // Add Listeners 
  
  var list = document.querySelector('.js-interactive-list');

  list.addEventListener("click", function(e)
    {
      audio.src = e.target.dataset.additionalInfo;
    });
});
