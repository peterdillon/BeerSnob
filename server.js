// set up ========================
var express  = require('express');
var app      = express();                        // create our app w/ express
var mongoose = require('mongoose');              // mongoose for mongodb
var morgan = require('morgan');                  // log requests to the console (express4)
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
mongoose.connect('mongodb:xxxxxxxxxxx);
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Brewery = mongoose.model('Brewery', {
        name : String,
        zipcode: String,
        id: Number
    });

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all breweries
    app.get('/api/breweries', function(req, res) {

        // use mongoose to get all breweries in the database
        Brewery.find(function(err, breweries) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(breweries); // return all breweries in JSON format
        });
    });

    // create brewery and send back all breweries after creation
    app.post('/api/breweries', function(req, res) {

        // create a brewery, information comes from AJAX request from Angular
        Brewery.create({
            name : req.body.name,
            zipcode : req.body.zipcode,
            id : +1,
            done : false
        }, function(err, brewery) {
            if (err)
                res.send(err);

            // get and return all the breweries after you create another
            Brewery.find(function(err, breweries) {
                if (err)
                    res.send(err)
                res.json(breweries);
            });
        });

    });

    // delete a brewery
    app.delete('/api/breweries/:brewery_id', function(req, res) {
        Brewery.remove({
            _id : req.params.brewery_id
        }, function(err, brewery) {
            if (err)
                res.send(err);

            // get and return all the breweries after you create another
            Brewery.find(function(err, breweries) {
                if (err)
                    res.send(err)
                res.json(breweries);
            });
        });
    });




// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


