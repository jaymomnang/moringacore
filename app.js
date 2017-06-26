var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    assert = require('assert');


app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));


//MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

//    assert.equal(null, err);
//    console.log("Successfully connected to MongoDB.");

//});


    //Handler for internal server errors
    function errorHandler(err, req, res){
      console.error(err.message);
      console.error(err.stack);
      if (res.status == 500){
        res.render('errtemplate', {error: err});
      }else if(res.status == 404) {
        res.render('404', {error: err});
      }

    }

    app.get('/', function(req, res){
      res.render("index", {'username': 'Julius Momnang', 'year': 2017, 'month': 'JUNE'});
    });

    app.get('/invoices', function(req, res){
      res.render("data-table", {'username': 'Julius Momnang', 'year': 2017, 'month': 'JUNE'});
    });

    app.get('/profile', function(req, res){
      res.render("profile", {'fruits': ['apple','orange','banana','peach','passion']});
    });

    app.get('/fontawesome', function(req, res){
      res.render("fontawesome", {'fruits': ['apple','orange','banana','peach','passion']});
    });

    app.get('/basic-table', function(req, res){
      res.render("basic-table", {'fruits': ['apple','orange','banana','peach','passion']});
    });

    app.get('/map-google', function(req, res){
      res.render("map-google", {'fruits': ['apple','orange','banana','peach','passion']});
    });

    app.get('/404', function(req, res){
      res.render("404", {'fruits': ['apple','orange','banana','peach','passion']});
    });
    //app.get('/:name', function(req, res){
    //    var name = req.params.name;
    //    var getvar1 = req.query.getvar1;
    //    var getvar2 = req.query.getvar2;
    //    res.render("hello", {name: name, getvar1: getvar1, getvar2:getvar2});
    //});

    app.post('/favfruit', function(req, res){
      var fav = req.body.fruit;
      if (typeof fav == 'undefined'){
        next(Error('Please choose a fruit'));
      }else{
        res.send('Your favourite fruit is ' + fav);
      }
    });



  app.use(errorHandler);

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
