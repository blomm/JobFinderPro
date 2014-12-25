var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
})

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function(){
    
    Job.find({}).exec(function(error, collection){
        if(collection.length===0){
            Job.create({title:'Cook', description:'I make great food.'});
            Job.create({title:'Watier', description:'I serve the food.'});
            Job.create({title:'Banker', description:'I make big money.'});
            Job.create({title:'Artist', description:'I create beautiful things.'});
        }
    })
}