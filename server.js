var express = require('express');
var jobsData = require('./jobs-data.js');

//only try to load the config file if we are not in heroku
if(process.env.MONGOUSER === undefined || process.env.MONGOPASS === undefined){
    //console.log('using the config file...');
    var secrets = require('./config.js');
}
else{
    //test comments
    //console.log('trying to use the process env config variables....');
    var secrets = {
        mongolabUser: process.env.MONGOUSER,
        mongolabPass: process.env.MONGOPASS
    }
}

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req,res){
    jobsData.findJobs({}).then(function(collection){
       res.send(collection);    
    });
});

app.get('*', function(req, res){
    res.render('index');
});

jobsData.connectDB('mongodb://' + secrets.mongolabUser + ':' + secrets.mongolabPass + '@ds047930.mongolab.com:47930/jobfinder')
    .then(function(){
        console.log('connected successfuly');
        jobsData.seedJobs();
    });

//app.listen(3000);
app.listen(process.env.PORT, process.env.IP);