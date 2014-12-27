var express = require('express');
var jobsData = require('./jobs-data.js');

//only try to load the config if we are not in heroku
if(typeof ENV === 'undefined'){
    var secrets = require('./config.js');
}
else{
    var secrets = {
        mongolabUser: ENV['MONGOUSER'],
        mongolabPass: ENV['MONGOPASS']
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