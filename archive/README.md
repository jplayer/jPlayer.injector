jPlayer Autofiller - automate the creation of needed HTML and unique IDs for jPlayer videos
===============================
To use Autofill
-----------------
* Include autofill files after jPlayer:
    `<script type="text/javascript" src="jplayer.autofill.js"></script>`
* Insert HTML tags where you want the video to appear as follows:
    `<div class="video" data-path="path/to/video.mp4" data-poster="path/to/image.png" data-title="Crazy Movie"></div>`
* Call it from JavaScript:
    `autofill(".video","template.html");`
* To use delayed instantiation, include jplayer.autofill.delay.js instead of jplayer.autofill.js
* Now when you call the autofill() function as above, it will only create the HTML structure, but not instantiate the video.
    `autofill(".video","template.html");`
* To instantiate the video, call:
    `$(".jp-jplayer").trigger("loadVideo");`
