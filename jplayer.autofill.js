var autofill = function(selector,template){

  // This call gets the template file, and then modifies it for each instance of jplayer
  $.get(template,function(video_template){
    $(selector).each(function(key,val){
      var v = $(this);
      var temp_template = "";
      var this_template = "";
      var path = v.data("path"); //value of data-path=
      var poster = v.data("poster"); //value of data-poster=
      var title = v.data("title"); //value of data-title=
      // need more params for your jplayer? Just add them here like line above.
      temp_template = video_template.replace(/jquery_jplayer_1/,"jquery_jplayer_"+key);
      temp_template = temp_template.replace(/::TITLE::/,title);
      this_template = temp_template.replace(/jp_container_1/,"jp_container_"+key);
      v.html(this_template);
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
    });
  });
}
