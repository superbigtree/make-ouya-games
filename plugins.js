(function(){

  // expects format: [gist: username/12358612]
  // space is optional: [gist:username/12358612]
  var gist = function(converter){
    return [
      {
        type: 'lang',
        regex: '(\\[gist:\\s*\\w*/\\d*])',
        replace: function(match) {
          var match = match.replace(/ /g,'');
          var str = match.substring(6, match.length - 1);
          var gistId = str.slice( str.indexOf("/") + 1 )
          var username = str.slice( 0, str.indexOf("/") )

          if ($) {

            var request = $.ajax({
              url: "https://gist.github.com/" + username + "/" + gistId + ".json",
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