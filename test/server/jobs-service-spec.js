var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var Promise = require('bluebird');

var app = express();
var dataSavedJob;

var db = {
    saveJob: function(job){
        dataSavedJob = job
    },
    findJobs: function(){
        return new Promise(function(resolve, reject){
            resolve(['hi']);
        })
        
    }
}


var newJob = {title:'Cook', description:'I make great food.'};
var jobsService = require('../../jobs-service.js')(db, app);

describe('get jobs', function(){
    
    it("should return a json list of jobs", function(done){
        request(app).get('/api/jobs')
        .expect('Content-Type', /json/)
        .end(function(err, res){
            expect(res.body).to.be.a('Array');
            done();
        })
    })
    
})

describe('save jobs', function(){
    
    it("should validate the title is less than 40 char");
    it("should validate the title is greater than 4 char");
    it("should validate the description is less than 250 char");
    it("should validate the description is greater than 4 char");
    
    it("should pass the job to the database save", function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err, res){
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        })
    });
    
    it("should return 200 status to the database if saved successfuly", function(){
        
    });
    it("should return a job with an id");
    it("should return an error if the database save failed");

})