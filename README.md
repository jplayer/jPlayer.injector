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

* Typically, you will call *injector* fron within a jQuery ready function:
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
