/*
 * jPlayer Injector
 * http://www.jplayer.org
 *
 * Copyright (c) 2013 - 2014 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 0.2.0
 * Date: 2nd April 2014
 */

/* Code verified using http://www.jshint.com/ */
/*jshint asi:false, bitwise:false, boss:false, debug:false, eqeqeq:true, eqnull:false, evil:false, forin:false, immed:false, laxbreak:false, newcap:true, noarg:true, noempty:true, nonew:true, plusplus:false, regexp:false, undef:true, sub:false, strict:true, smarttabs:true */
/*jshint browser:true, devel:true, jquery:true */
/*jshint curly:false  */
/*exported jPlayerInjector */

var jPlayerInjector = (function($) {

	"use strict";

	var DEBUG = false;

	return function(options) {

		options = $.extend(true, {
			selector: "audio, video",
			template: "skin/pink.flag/jplayer.pink.flag.audio.html",
			pauseOthers: true,
			marker: {
				jPlayer: /{{JPLAYER}}/,
				cssSelectorAncestor: /{{WRAPPER}}/
			},
			prefix: {
				jPlayer: "jquery_jplayer_",
				cssSelectorAncestor: "jp_container_"
			},
			jPlayer: {}
		}, options);

		// Get the template HTML
		$.get(options.template, function(template) {

			if(DEBUG) console.log('loaded: %s', options.template);

			// Iterate through each selector instance
			$(options.selector).each(function(index) {

				var $this = $(this);

				if(DEBUG) console.log('injecting: %s #%d', options.selector, index);

				var mediaList = [];

				// Todo : remove repeated code here
				var media = {src:$this.attr("src"),type:$this.attr("type")};
				if (media) mediaList.push(media);

				$this.children("source").map(function(){
					media={src:$(this).attr("src"),type:$(this).attr("type")};
					if (media) mediaList.push(media);
				});

				var assignMedia = function(tagType, mimeType, variants) {
					var assign = "";
					if ($this.prop('tagName').toLowerCase() == tagType) {

						for (var i=0; i < mediaList.length; i++) {
							var filename = mediaList[i].src;
							var extension = filename ? filename.split('.').pop() : "";

							if ((mediaList[i].type && mediaList[i].type.toLowerCase().replace(" ","") == mimeType) || (variants.indexOf(extension) >= 0)) {
								assign = filename;
							}
						}
					}
					return assign;
				};

				var media = { // Grouped by type (audio/video), but ordered with essential last.
						// Audio codecs
						rtmpa: assignMedia("audio","",["rtmpa,rtmp"]),
						fla:   assignMedia("audio","",["fla"]),
						wav:   assignMedia("audio","audio/wav",["wav"]),
						webma: assignMedia("audio","audio/webm",["webma","webm"]),
						oga:   assignMedia("audio","audio/ogg",["oga","ogg"]),
						m4a:   assignMedia("audio","audio/mp4",["m4a","mp4"]),
						mp3:   assignMedia("audio","audio/mpeg",["mp3"]),

						// Video codecs
						rtmpv: assignMedia("video","",["rtmpv,rtmp"]),
						flv:   assignMedia("video","",["flv"]),
						webmv: assignMedia("video","video/webm",["webmv","webm"]),
						ogv:   assignMedia("video","video/ogg",["oqv","ogg"]),
						m4v:   assignMedia("video","video/mp4",["m4v","mp4"]),

						// Poster
						poster: $this.attr("poster"),

						// Details
						title: $this.attr("title"),
						duration: $this.data("duration")
					},
					supplied =
						// Audio codecs
						(media.rtmpa ? "rtmpa," : "") +
						(media.fla ? "fla," : "") +
						(media.wav ? "wav," : "") +
						(media.webma ? "webma," : "") +
						(media.oga ? "oga," : "") +
						(media.m4a ? "m4a," : "") + // Essential or mp3
						(media.mp3 ? "mp3," : "") + // Essential or m4a
						// Video codecs
						(media.rtmpv ? "rtmpv," : "") +
						(media.flv ? "flv," : "") +
						(media.webmv ? "webmv," : "") +
						(media.ogv ? "ogv," : "") +
						(media.m4v ? "m4v," : ""), // Essential
					jPlayerOptions = $.extend({}, options.jPlayer, {
						ready: function () {
							$(this).jPlayer("setMedia", media);
						},
						cssSelectorAncestor: "#" + options.prefix.cssSelectorAncestor + index,
						supplied: options.jPlayer.supplied ? options.jPlayer.supplied : supplied
					}),
					impression = "";

				if(options.pauseOthers) {
					jPlayerOptions.play = function() {
						$(this).jPlayer("pauseOthers");
					};
				}

				// Switch the markers with the values for this instance.
				impression = template.replace(options.marker.jPlayer, options.prefix.jPlayer + index);
				impression = impression.replace(options.marker.cssSelectorAncestor, options.prefix.cssSelectorAncestor + index);

				$this.replaceWith(impression);

				if(DEBUG) console.log('media#%d: %o', index, media);
				if(DEBUG) console.log('supplied#%d: %s', index, jPlayerOptions.supplied);
				if(DEBUG) console.log('jPlayerOptions#%d: %o', index, jPlayerOptions);

				// Instance jPlayer
				$("#" + options.prefix.jPlayer + index).each(function() {
					$(this).jPlayer(jPlayerOptions);
				});
			});
		});
	};
}(jQuery));
