angular.module('app.autoShow', [])

    .controller('AutoshowCtrl', function ($scope, $timeout, $window, $filter) {

        //$http.get('user.json').success(function (data) {
        // $scope.cars = data.cars;
        //    $scope.user = data.home;
        //    $scope.person = data.person;
        //    $scope.links = data.links;
        //}); //получение данных через сервис (для тестирование в браузере)

        $scope.myFilterOne = {};
        $scope.myFiltr = {};
        $scope.myFilt = {};
        $scope.num = 0; //индекс массива, по которому происходит фильтрация характеристики автомобиля
        $scope.nameItem = ''; //имя раздела (класс 1, класс 2 и т.д.), по которому происходит фильтрация в ленте
        $scope.sett = false;

        var list,
            filtPar = 'slide',
            ar_index,
            pos, //позиция на которую должна передвинуться лента
            slider,
            current_pos,//позиции начального слайда в ленте на текущий момент (позиции начинаются с нуля)
            endPart, // сколько элементов осталось вконце ленты
            endPos,
            testPos = 0;


        $scope.carValue = function () {
            var testLength = document.getElementsByClassName('testUl').length;
            return $scope.players.length - testLength;
        };


        $scope.cleanActive = function () {
            for (var i = 0, max = d.getElementsByClassName('slide').length; i < max; i++) {
                d.getElementsByClassName('slide')[i].classList.remove("active");
            }
        };

        $scope.takeList = function () {
            list = d.getElementsByClassName(filtPar);
            return [].slice.call(list);
        };


        $window.setPageautoShow = function (testarray) {
            var testStr,
                jsStruct;

            testStr = JSON.stringify(testarray);
            jsStruct = JSON.parse(testStr);
            $scope.cars = jsStruct.cars;
            $scope.items = jsStruct.items;
            $scope.options = jsStruct.options;
            $scope.slots = jsStruct.slots;
            $scope.brands = jsStruct.brands;
            $scope.features = jsStruct.cars[$scope.num].features;
            var url = "js/slider_functional.js";
            $.getScript(url);
            $scope.$apply();
        };//получение данных через клиент игры

        loadPage('autoShow');


        $scope.changeLang = function (language) {
            SendEvent("changeLanguage", language, true);
        };


        $scope.carClick = function (pos_index, e) {
            list = $scope.takeList();
            ar_index = list.indexOf(e.currentTarget);

            $scope.cleanActive();
            d.getElementsByClassName('slide')[ar_index].classList.add("active");
            $scope.num = pos_index; //переменная, по которой осуществляется фильтрация характеристик

        };


        $scope.updateData = function (e) {
            $scope.slickConfig.method.slickUnfilter();
            $scope.cleanActive();

            if (e === 'все') {
                filtPar = 'slide';
                return;
            }
            else {
                filtPar = e;
                $scope.slickConfig.method.slickFilter('.' + e);

            }
        };

        $scope.doActive = function (car) {
            for (var i = 0, max = $scope.cars.length; i < max; i++) {
                $scope.cars[i].selected = 'null';
            }
            $scope.cars[$scope.cars.indexOf(car)].selected = '1';
            var select_car_id = $scope.cars.indexOf(car).toString();
            SendEvent("selectCar", select_car_id, true);

        };

        // <------------------------------------- SLIDER FEATURES-------------------------------------->


        $scope.slickConfig = {
            infinite: false,
            accessibility: true,
            arrows: false,
            touchThreshold: 0,
            slidesToScroll: 1,
            touchMove: false,
            draggable: false,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            }
        };
        // <------------------------------------- END SLIDER FEATURES-------------------------------------->


        $scope.nextClick = function (e) {

            slider = angular.element('.slick-slider');
            current_pos = slider.slick('slickCurrentSlide');


            function getEndPart(endPos) {
                list = $scope.takeList();
                return list.length - endPos;
            } //сколько слайдов осталось до конца ленты


            if (e === 'right') {
                endPos = current_pos + 7; //номер слайдера граничещего с остатком
                // конечная позиция в слайдере на текущий момент (указывают позицию первого элемента в ленте на данный момент)
                endPart = getEndPart(endPos);

                if (endPart < 7) {
                    pos = current_pos + endPart;
                }
                else {
                    pos = current_pos + 7;
                }
            }

            else {
                endPos = current_pos - 1;
                endPart = getEndPart(endPos);

                if (endPart == 0 || endPos > 7) {
                    pos = current_pos - 7;
                }
                else {
                    pos = 0;
                }
            }

            $scope.cleanActive();

            $scope.num = pos;
            $scope.slickConfig.method.slickGoTo(pos);
            d.getElementsByClassName('slide')[pos].classList.add("active");

        };

        $window.keyTest = function (e) {
            
            if (filtPar === 'slide') {

                for (var i = 0; i < $scope.cars.length; i++) {
                    d.getElementsByClassName('slide')[i].classList.remove("active");
                }
                current_pos = $scope.num;


                if (e === 'left' && current_pos == 0) {

                    return;
                }

                else if (e === 'left') {
                    pos = current_pos - 1;
                }

                else {
                    pos = current_pos + 1;
                }


                $scope.num = pos;
                $scope.slickConfig.method.slickGoTo(pos);
                d.getElementsByClassName('slide')[pos].classList.add("active");
            }

            else {
                if (e === 'left') {
                    pos = testPos - 1;
                }
                else {
                    pos = testPos + 1;
                }


                if (pos < d.getElementsByClassName('slide').length && e === 'right') {
                    $scope.cleanActive();
                    d.getElementsByClassName('slide')[pos].classList.add("active");
                    testPos++;
                }
                else if (pos < d.getElementsByClassName('slide').length && e === 'left') {
                    $scope.cleanActive();
                    d.getElementsByClassName('slide')[pos].classList.add("active");
                    testPos--;
                }

            }
        }



    });



