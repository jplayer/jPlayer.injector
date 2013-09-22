var jPlayerInjector = (function($) {

	return function(options) {

		options = $.extend(true, {
			selector: "#default",
			template: "skin/default.html",
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
				solution: "flash, html",
				supplied: "m4v",
				swfPath: "js"
			}
		}, options);

		// This call gets the template file, and then modifies it for each instance of jplayer
		$.get(options.template, function(template) {

			$(options.selector).each(function(key, val) {

				var $this = $(this);

				var path = $this.data("path"); // value of data-path=
				var poster = $this.data("poster"); // value of data-poster=
				var title = $this.data("title"); // value of data-title=

				var jPlayerOptions = $.extend({}, options.jPlayer, {
					ready: function () {
						$(this).jPlayer("setMedia", {
							m4v: path,
							poster: poster
						});
					},
					cssSelectorAncestor: "#jp_container_" + key,
					supplied: "m4v"
				});

				// need more params for your jplayer? Just add them here like line above.
				template = template.replace(options.marker.jPlayer, options.prefix.jPlayer + key);
				template = template.replace(options.marker.cssSelectorAncestor, options.prefix.cssSelectorAncestor + key);
				template = template.replace(options.marker.title, title);
				$this.html(template);

/*
				//// VIDEO
				$("#jquery_jplayer_"+key).each(function(){
					$(this).jPlayer({
						ready: function () {
							$(this).jPlayer("setMedia", {
								m4v: path,
								poster: poster
							});
						},
						swfPath: "/js",
						cssSelectorAncestor: "#jp_container_"+key,
						supplied: "m4v"
					});
				});
*/

				$("#" + options.prefix.jPlayer + key).each(function() {
					$(this).jPlayer(jPlayerOptions);
				});
			});
		});
	};
}(jQuery));
