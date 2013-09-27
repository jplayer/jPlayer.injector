#jPlayer.injector

* Injects jPlayer's skin HTML and instantiates the plugin.
* Automates the creation of HTML and unique IDs for jPlayer.
* Supports multiple supplied formats. EG., MP3 and OGA (ogg)

*Inspired by [Nathan Loyer's](https://github.com/namlet) project: [jPlayer-Autofill](https://github.com/namlet/jPlayer-Autofill).*

##To use *injector*
* Include *injector* files after jPlayer:
```html
	<script type="text/javascript" src="jplayer.injector.js"></script>
```

* Insert the HTML tags where you want the media to appear as follows:
```html
	<div
		class="video"
		data-mp3="path/to/video.mp3"
		data-poster="path/to/image.png"
		data-title="Movie Title">
	</div>
```

* Call *injector* from JavaScript:
```javascript
	jPlayerInjector({
		selector: ".classname",
		template: "path/to/template.html"
	});
```

* The *injector* has many options:
```javascript
	jPlayerInjector({
		selector: ".classname",
		template: "path/to/template.html",
		pauseOthers: true, // Stop multiple instances playing
		marker: { // RegExp of markers
			jPlayer: /::JPLAYER::/,
			cssSelectorAncestor: /::WRAPPER::/,
			title: /::TITLE::/
		},
		prefix: { // Prefix of IDs
			jPlayer: "jquery_jplayer_",
			cssSelectorAncestor: "jp_container_"
		},
		jPlayer: {} // jPlayer options
	});
```

* Typically, you will call *injector* from within a jQuery ready function:
```javascript
	$(document).ready(function() {
		jPlayerInjector({
			selector: ".audio",
			template: "path/to/audio_template.html"
		});
	});
```

* Example code is given in the root HTML files, and are of the form:
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>My Sweet Music</title>
		<link href="skin/pink.flag/jplayer.pink.flag.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="lib/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="lib/jquery.jplayer.js"></script>
		<script type="text/javascript" src="js/jplayer.injector.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				jPlayerInjector({
					selector: ".audio",
					template: "skin/pink.flag/jplayer.pink.flag.audio.html",
					jPlayer: {
						swfPath: "lib"
					}
				});
			});
		</script>
	</head>
	<body>
		<div
			class="audio"
			data-mp3="http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3"
			data-oga="http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
			data-title="Bubble">
		</div>
	</body>
</html>
```

##FAQ

###Why does my template not work?
There could be many reason, so consider:
* Check the markers in the template match the injector's defaults or the options you set.
* Check that you included the skin's CSS in your page.
* Check you included jQuery and jPlayer in your page.
* Check you only included jQuery once.
* Check that your template is on the same domain.
* Look in the browser console and see if there are any error messages.

###How do I specify multiple formats to satisfy HTML5 browsers?
These day you only tend to need either: MP3, M4A or M4V.
The essential formats and optional formats follow those available to jPlayer.

But you can add them using:
```html
<div
	class="video"
	data-m4v="http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v"
	data-ogv="http://jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv"
	data-webmv="http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm"
	data-poster="http://jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
	data-title="Big Buck Bunny Trailer">
</div>
```

Note: Need to enable the jPlayer supplied option and given or automatic.
