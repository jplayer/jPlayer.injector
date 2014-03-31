/*
 * jPlayer Injector
 * http://www.jplayer.org
 *
 * Copyright (c) 2013 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 0.1.0
 * Date: 1st October 2013
 */

/* Code verified using http://www.jshint.com/ */
/*jshint asi:false, bitwise:false, boss:false, debug:false, eqeqeq:true, eqnull:false, evil:false, forin:false, immed:false, laxbreak:false, newcap:true, noarg:true, noempty:true, nonew:true, plusplus:false, regexp:false, undef:true, sub:false, strict:true, smarttabs:true */
/*jshint browser:true, devel:true, jquery:true */
/*jshint curly:false  */
/*exported jPlayerInjector */

var jPlayerInjector = (function($) {

	"use strict";

	var DEBUG = true;

	return function(options) {

		options = $.extend(true, {
			selector: "audio, video",
			template: "skin/pink.flag/jplayer.pink.flag.audio.html",
			pauseOthers: true,
			marker: {
				jPlayer: /::JPLAYER::/,
				cssSelectorAncestor: /::WRAPPER::/,
				title: /::TITLE::/
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

				if(DEBUG) console.log('injecting: %s #%d', options.selector, index);

				if(DEBUG) console.log("src = "+ $(this).attr('src'));

				var $this = $(this),
					tagname = $this.prop('tagName'),
					type = $this.attr('type') ? $this.attr('type').replace(" ","") : "",
					filename = $this.attr('src'),
					extension = filename.split('.').pop(),
					media = { // Grouped by type (audio/video), but ordered with essential last.
						// Audio codecs
						rtmpa: (tagname =="AUDIO" && (extension == "rtmpa" || extension == "rtmp") ? filename: ""),
						fla: (tagname =="AUDIO" && extension == "fla" ? filename: ""),
						wav: (tagname =="AUDIO" && (type == "audio/wav" || extension == "wav") ? filename: ""),
						webma: (tagname =="AUDIO" && (type == "audio/webm" || extension == "webma" || extension == "webm") ? filename: ""),
						oga: (tagname =="AUDIO" && (type == "audio/ogg" || extension == "oga" || extension == "ogg") ? filename: ""),
						m4a: (tagname =="AUDIO" && (type == "audio/mp4" || extension == "m4a" || extension == "mp4") ? filename: ""),
						mp3: (tagname =="AUDIO" && (type == "audio/mpeg" || extension == "mp3") ? filename: ""),

						// Video codecs
						rtmpa: (tagname =="VIDEO" && (extension == "rtmpv" || extension == "rtmp") ? filename: ""),
						flv: (tagname =="VIDEO" && extension == "flv" ? filename: ""),
						webmv: (tagname =="VIDEO" && (type == "video/webm" || extension == "webmv" || extension == "webm") ? filename: ""),
						ogv: (tagname =="VIDEO" && (type == "video/ogg" || extension == "ogv" || extension == "ogg") ? filename: ""),
						m4v: (tagname =="VIDEO" && (type == "video/mp4" || extension == "m4v" || extension == "mp4") ? filename: ""), // Essential

						// Poster
						poster: $this.data("poster")


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
				impression = impression.replace(options.marker.title, $this.data("title"));
				//$this.html(impression);
				$this.replaceWith(impression);

				if(DEBUG) console.log('tagname', tagname);

				if(DEBUG) console.log('extension', options.template);
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
