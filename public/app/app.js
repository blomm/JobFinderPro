angular.module('myApp', ['ngResource']);

angular.module('myApp').controller('myController', function($scope, $resource) {
    // $scope.jobs = [{
    //     title: 'sales manager',
    //     description: 'you will sell stuff'
    // }, {
    //     title: 'manager',
    //     description: 'you will manage stuff'
    // }];
    $scope.jobs = $resource('/api/jobs').query();
})