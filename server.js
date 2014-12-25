var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req,res){
    mongoose.model('Job').find({}).exec(function(err, collection){
        res.send(collection);    
    })
})

app.get('*', function(req, res){
    res.render('index');
})

//mongoose.connect('mongodb://localhost/jobfinder');
mongoose.connect('mongodb://blomm:geomatic@ds047930.mongolab.com:47930/jobfinder')

var con = mongoose.connection;
con.once('open', function(){
    console.log('connected successfuly');
    jobModel.seedJobs();
})

//app.listen(3000);
app.listen(process.env.PORT, process.env.IP);