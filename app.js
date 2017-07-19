var express = require('express'),
    app = express(),
    port = process.env.PORT || 3200,
    engines = require('consolidate'),
    routes = require('./routes/appRoutes'),
    assert = require('assert');


global.bodyParser = require('body-parser');
global.request = require('request');
global.mc_api = "http://localhost:3100/";

//Handler for internal server errors
//function errorHandler(err, req, res){
//  console.error(err.message);
//  console.error(err.stack);
//  if (res.status == 500){
//    res.render('errtemplate', {error: err});
//  }else if(res.status == 404) {
//    res.render('404', {error: err});
//  }
//}

//initialize bodyParser and errorHandler
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));
app.use(bodyParser.json());
//app.use(errorHandler);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

routes(app);
app.listen(port);
console.log('MoringaCore server listening on port ' + port);
