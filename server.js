var express = require('express');
var jobsData = require('./jobs-data.js');

//only try to load the config file if we are not in heroku
if(process.env.MONGOUSER === undefined || process.env.MONGOPASS === undefined){
    
    var secrets = require('./config.js');
}
else{
    //the database login details have been configured in heroku
    var secrets = {
        mongolabUser: process.env.MONGOUSER,
        mongolabPass: process.env.MONGOPASS
    }
}

var app = express();

require("./jobs-service.js")(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));



app.get('*', function(req, res){
    res.render('index');
});

jobsData.connectDB('mongodb://' + secrets.mongolabUser + ':' + secrets.mongolabPass + '@ds047930.mongolab.com:47930/jobfinder')
    //jobsData.connectDB('mongodb://localhost/jobfinder')
    .then(function(){
        console.log('connected successfuly');
        jobsData.seedJobs();
    });

//app.listen(3000);
app.listen(process.env.PORT, process.env.IP);