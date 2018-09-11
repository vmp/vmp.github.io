var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
    res.render('home', {
        index: true
    });
});

var texts_path = __dirname + '/texts';
var jokes_path = __dirname + '/jokes';

app.get('/blog', function (req, res) {
    fs.readdir(texts_path, function(err, files) {
        res.render('blog', {
            files: files
        });
    });
});

app.get('/blog/:file', function (req, res) {
    fs.readFile(texts_path + '/' + req.params.file, function (err, data) {
        if (err) res.send('Произошла ошибка!');
        res.render('blog-page', {
            data
        });
    });
});

app.get('/jokes', function(req, res) {
    fs.readdir(jokes_path, function(err, files) {
        res.render('jokes', {
            files: files
        });
    });
});

app.get('/jokes/:file', function(req, res) {
    fs.readFile(jokes_path + '/' + req.params.file, function(err, data) {
        if (err) res.send('Произошла ошибка!');
        res.render('joke', {
            data
        });
    })
});

app.listen(8080);