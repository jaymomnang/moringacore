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


MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

});


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

    var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    var d = new Date();
    var y = d.getFullYear();
    var m = monthNames[d.getMonth()];

    var arr = {
      'username': 'Julius Momnang',
      'year': y,
      'month': m,
      'tasks_label': 'My Tasks',
      'courses_label':'My Courses',
      'performance_label': 'My Performance',
      'attendance_label': 'Attendance',
      'submissions_label': 'My Submissions',
      'manage_usr_label': 'Manage User',
      'reports_label':'Reports'
    };



    app.get('/', function(req, res){
      res.render("login", arr);
    });

    app.get('/home', function(req, res){
      res.render("index", arr);
    });

    app.get('/invoices', function(req, res){
      res.render("invoice", arr);
    });

    app.get('/tasks', function(req, res){
      res.render("tasks", arr);
    });

    app.get('/attendance', function(req, res){
      res.render("attendance", arr);
    });

    app.get('/datatables', function(req, res){
      res.render("data-table", arr);
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

    var server = app.listen(3200, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
