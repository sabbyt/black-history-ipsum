var hideArticles = function() {
  $('article .bio').hide();
  $('img').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('div').fadeIn();
    $('img').click(function() {
      $('div').hide();
    });
  });
};
