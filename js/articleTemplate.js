var theTemplate;
var content = {};

authorsPage.articleRun = function() {

$.get('../template/template.handlebars', function(data) {
    theTemplate = Handlebars.compile(data);
}).done(function() {
  content.authorList = authorData.map(theTemplate);
  content.authorList.forEach(function(el) {
    $('#authorBio').append(el);
    authorsPage.hideArticles();
  });
  });

};

authorsPage.articleRun();
