var jPlayerInjector = (function($) {

	var DEBUG = "mofo";

	return function(options) {

		if(DEBUG) console.log('options (set): %o', options);

		options = $.extend(true, {
			selector: ".jplayer-injector",
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
			jPlayer: {
				// solution: "flash, html",
				// supplied: "m4v",
				// swfPath: "js"
			}
		}, options);

		if(DEBUG) console.log('options (used): %o', options);

		// This call gets the template file, and then modifies it for each instance of jplayer

		// Get the template HTML
		$.get(options.template, function(template) {

			if(DEBUG) console.log('loaded: %s', options.template);

			// Iterate through each selector instance
			$(options.selector).each(function(key, val) {

				if(DEBUG) console.log('injecting: %s #%d', options.selector, key);

				var $this = $(this),
					media = {
						// Audio codecs
						mp3: $this.data("mp3"),
						m4a: $this.data("m4a"),
						oga: $this.data("oga"),
						wav: $this.data("wav"),
						webma: $this.data("webma"),
						fla: $this.data("fla"),
						rtmpa: $this.data("rtmpa"),
						// Video codecs
						m4v: $this.data("m4v"),
						ogv: $this.data("ogv"),
						webmv: $this.data("webmv"),
						flv: $this.data("flv"),
						rtmpv: $this.data("rtmpv"),
						// Poster
						poster: $this.data("poster")
					},
					supplied =
						// Audio codecs
						(media.mp3 ? "mp3," : "")
						+ (media.m4a ? "m4a," : "")
						+ (media.oga ? "oga," : "")
						+ (media.wav ? "wav," : "")
						+ (media.webma ? "webma," : "")
						+ (media.fla ? "fla," : "")
						+ (media.rtmpa ? "rtmpa," : "")
						// Video codecs
						+ (media.m4v ? "m4v," : "")
						+ (media.ogv ? "ogv," : "")
						+ (media.webmv ? "webmv," : "")
						+ (media.flv ? "flv," : "")
						+ (media.rtmpv ? "rtmpv," : ""),
					jPlayerOptions = $.extend({}, options.jPlayer, {
						ready: function () {
							$(this).jPlayer("setMedia", media);
						},
						cssSelectorAncestor: "#" + options.prefix.cssSelectorAncestor + key,
						supplied: supplied
					}),
					impression = "";

				if(options.pauseOthers) {
					jPlayerOptions.play = function() {
						$(this).jPlayer("pauseOthers");
					}
				}

				// Switch the markers with the values for this instance.
				impression = template.replace(options.marker.jPlayer, options.prefix.jPlayer + key);
				impression = impression.replace(options.marker.cssSelectorAncestor, options.prefix.cssSelectorAncestor + key);
				impression = impression.replace(options.marker.title, $this.data("title"));
				$this.html(impression);

				if(DEBUG) console.log('media#%d: %o', key, media);
				if(DEBUG) console.log('supplied#%d: %o', key, supplied);
				if(DEBUG) console.log('jPlayerOptions#%d: %o', key, jPlayerOptions);

				// Instance jPlayer
				$("#" + options.prefix.jPlayer + key).each(function() {
					$(this).jPlayer(jPlayerOptions);
				});
			});
		});
	};
}(jQuery));
