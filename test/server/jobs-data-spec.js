var jobModel = require('../../models/Job.js');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobsData = require('../../jobs-data.js');
var Promise = require('bluebird');


//clear all the jobs out
function resetJobs(){
    return new Promise(function(success, fail){
        mongoose.connection.collections['jobs'].drop(success);
    })
}

describe('get jobs', function(){
    
    var jobs;
    
    before(function(done){
        jobsData.connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection){
                jobs = collection;
                done();
            });
    });
    
    it('should never be empty since jobs are seeded', function(){
        expect(jobs.length).to.be.at.least(1);
    })
    
    it('should have a job with a title', function(){
        expect(jobs[0].title).to.not.be.empty;
    })
    
    it('should have a job with a description', function(){
        expect(jobs[0].description).to.not.be.empty;
    })
})