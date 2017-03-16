angular.module('app.home', [])

    .controller('homeController', function ($scope, $window) {

        $scope.urlImg = 'pic1';
        $scope.products=[
            {'id':'1','name': 'one'},
            {'id':'2','name': 'Carlo Pazolini'},
            {'id':'3','name': 'Jane'}
        ];
        $scope.items = ['Бренды', 'Женское', 'Мужское', 'Детское', 'Дом', 'Sale'];
        $scope.changeImage = function (e) {
            var reg = /pic\d+/;
            var str = e.currentTarget.src;
            $scope.urlImg = str.match(reg).join();


        }

    });