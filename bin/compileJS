var fs = require('fs');
var path = require('path');
var uglify = require("uglify-js");

var walkSync = function(dir, filelist) {
    var files = fs.readdirSync(dir);

    filelist = filelist || [];

    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
          filelist.push(path.join(dir, file));
        }
    });

    return filelist;
};

var uglified = uglify.minify(walkSync(path.resolve('scripts')));

fs.writeFile(path.join(path.resolve('public/js'), 'app.min.js'), uglified.code, function (err){
    if(err) {
        console.log(err);
    } else {
        console.log("Script generated and saved:", 'app.min.js');
    }
});