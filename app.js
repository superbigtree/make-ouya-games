function render(el, content) {
  var converter = new Showdown.converter({ extensions: ['gist'] });

  var content = $.ajax( content );

  content.done( function(data) {
    var html = converter.makeHtml(data);
    $( el ).html(html);
  });
}