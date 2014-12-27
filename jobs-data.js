var Promise = require('bluebird');
var mongoose = require('mongoose');
//although we don't use the jobModel in here, we need to make sure it loads first, before we can do "var Job = mongoose.model('Job');"
var jobModel = require('./models/Job.js');
var Job = mongoose.model('Job');

var findJobs = function (query){
    return Promise.resolve(Job.find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.seedJobs = function(){
    //return new Promise(function(success, fail){
    return findJobs({})
        .then(function(collection){
            //console.log('collection size: ' + collection.length)
            if(collection.length===0){
                return Promise.map(jobs, function(job){
                    return createJob(job);
                    
                });    
            }
        }
    )
}

var createJob = Promise.promisify(Job.create, Job);

var jobs = [{title:'Cook', description:'I make great food.'},
            {title:'Watier', description:'I serve the food.'},
            {title:'Banker', description:'I make big money.'},
            {title:'Artist', description:'I create beautiful things.'}];
