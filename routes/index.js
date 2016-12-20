
/*
 * GET home page.
 */
var path = require('path');

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  /*var name = req.params.name;
  console.log(name);
  res.render('partials/' + name);*/


    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function (err, html) {
        if (err) {
            log(err, 'Error rendering partial "' + requestedView + '"\n');
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};