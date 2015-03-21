angular.module('myApp', ['ngResource']);

angular.module('myApp').controller('myController', function($scope, $resource, jobs) {
    // $scope.jobs = [{
    //     title: 'sales manager',
    //     description: 'you will sell stuff'
    // }, {
    //     title: 'manager',
    //     description: 'you will manage stuff'
    // }];
    $scope.jobs = $resource('/api/jobs').query();
    
    $scope.submit=function(){
        
        var job={title:$scope.title, description: $scope.description};
        
        jobs.save(job);
        
        $scope.jobs.push(job);
    }
    
})