angular.module('myApp', []);

angular.module('myApp').controller('myController', function($scope) {
    $scope.jobs = [{
        title: 'sales manager',
        description: 'you will sell stuff'
    }, {
        title: 'manager',
        description: 'you will manage stuff'
    }];
})