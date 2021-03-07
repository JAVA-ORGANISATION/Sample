var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('ShowData', {
        url: '/ShowData',
        templateUrl: '../Pages/Show.html'
    })
    .state('EditData', {
        url: '/EditData',
        templateUrl: '../Pages/Edit.html'
    })
});

app.controller("myCtrl", function ($location) {
    $location.path('/ShowData')
});

app.factory("myFactory", function () {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
})

app.controller("showCtrl", function ($scope, $location, myFactory) {
    $scope.Students = [
        { Name: "Akhilesh", Address: "Kolkata", Email: "xxxx@gmail.com" },
        { Name: "Mukesh", Address: "Delhi", Email: "yyyy@gmail.com" },
        { Name: "Rakesh", Address: "Mumbai", Email: "zzzz@gmail.com" },
    ]

    $scope.Edit = function (d) {
        myFactory.set(d);
        $location.path('/EditData');
    }
});

app.controller("editCtrl", function ($scope, $location, myFactory) {
    $scope.Student = myFactory.get();
    $scope.Back = function () {
        $location.path('/ShowData');
    }
})