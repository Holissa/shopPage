angular.module('app.home', [])

    .controller('homeController', function ($scope, $window) {
        //$http.get('user.json').success(function (data) {
        //    $scope.user = data.home;
        //    $scope.person = data.person;
        //    $scope.links = data.links;
        //});

 $scope.items = ['Бренды', 'Женское', 'Мужское', 'Детское', 'Дом', 'Sale'];
$scope.changeImage = function (e){
    $window.alert(e.currentTarget.src);

}

    });