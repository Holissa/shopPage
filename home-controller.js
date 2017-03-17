angular.module('app.home', [])

    .controller('homeController', function ($scope, $window) {
        var val;
        $scope.urlImg = 'pic1';

        $scope.items = ['Бренды', 'Женское', 'Мужское', 'Детское', 'Дом', 'Sale'];
        $scope.subnames = ['Главное', 'Женское', 'Обувь', 'Босоножки'];


        $scope.changeImage = function (e) {
            var reg = /pic\d+/;
            var str = e.currentTarget.src;
            $scope.urlImg = str.match(reg).join();

            videoManipulate();

            d.getElementById('shoesVideo').style.display = 'none';
            d.getElementById('shoesImage').style.display = 'block';

            removeActive();
            e.currentTarget.classList.add('active');


        };

        $scope.shopActive = function () {
            val = d.getElementsByClassName('value-shop')[0].innerHTML;

            if (val == '0') {
                d.getElementById('butBuy').style.border = 'solid red 2px';
                d.getElementById('selectVal').style.backgroundColor = 'red';

                setTimeout(addedActive, 1000);
            }
            else {
                $window.location.reload();
            }

        };
        $scope.changeVideo = function (e) {
            d.getElementById('shoesImage').style.display = 'none';
            d.getElementById('shoesVideo').style.display = 'block';
            removeActive();
            e.currentTarget.classList.add('active');
        }


    });