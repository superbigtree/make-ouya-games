(function(){
  var gist = function(converter){
    return [
      {
        type: 'lang',
        regex: '(\\[gist:\\s*\\d*\\])',
        replace: function(match) {
          var str = match.slice(6).replace(/ /g,'');
          var gistId = str.substring(0, str.length - 1);

          if ($) {

            var request = $.ajax({
              url: "https://gist.github.com/sethvincent/" + gistId + ".json?callback=jsonp",
              dataType: "jsonp"
            });

            request.done(function(data){
              var stylesheet = "<link href=" + data.stylesheet + " />";
              $("head").append(stylesheet);
              $("." + gistId).html(data.div);
            })
            
            return "<div class='" + gistId + "'></div>"
          } else {
            // todo: fallback xmlhttprequest without jquery
          }
        }
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { 
    window.Showdown.extensions.gist = gist;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = gist;
  }
}());


var converter = new Showdown.converter({ extensions: ['twitter', 'gist'] });

var content = $.ajax( "./libgdx.md" );

content.done( function(data) {
  var html = converter.makeHtml(data);
  $(".content").html(html);
});
