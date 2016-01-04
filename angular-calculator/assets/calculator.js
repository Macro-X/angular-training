/* Main JS */

(function() {

    var CalculatorApp = angular.module('myCalculator', []);
    //main app controller 
    CalculatorApp.controller('CalculatorCtrl', ['$scope', function($scope) {
    	//base buld lumen values
        $scope.lumen_options = [375, 600, 900, 1600];
        $scope.current_lumens = 600;
        $scope.current_cost = 13;
        $scope.current_hours = 4;
        $scope.total_days = 365;

        $scope.inc_convertion = 0.0625;
        $scope.hal_convertion = 0.0450;
        $scope.cfl_convertion = 0.0146;
        $scope.led_convertion = 0.0125;

        $scope.calculate = function() {
            //console.log("start");

            //conversion for bulb, result will be rounded to one decimal place
            $scope.inc_wattage = ($scope.current_lumens * $scope.inc_convertion).toFixed(1);
            $scope.hal_wattage = ($scope.current_lumens * $scope.hal_convertion).toFixed(1);
            $scope.cfl_wattage = ($scope.current_lumens * $scope.cfl_convertion).toFixed(1);
            $scope.led_wattage = ($scope.current_lumens * $scope.led_convertion).toFixed(1);
            //fix that user cannot add more than 24h 
            if ($scope.current_hours > 24) {
                $scope.current_hours = 24
            };
            //fix that user cannot add less than 0h 
            if ($scope.current_hours < 0) {
                $scope.current_hours = 0
            };

            var total_hours = $scope.total_days * $scope.current_hours;
            var cost = $scope.current_cost / 100;

            //cost calculation
            $scope.inc_cost = ((($scope.inc_wattage * total_hours) / 1000) * cost).toFixed(1);
            $scope.hal_cost = ((($scope.hal_wattage * total_hours) / 1000) * cost).toFixed(1);
            $scope.cfl_cost = ((($scope.cfl_wattage * total_hours) / 1000) * cost).toFixed(1);
            $scope.led_cost = ((($scope.led_wattage * total_hours) / 1000) * cost).toFixed(1);
        }
        
        //run calculate function
        $scope.calculate();

    }]);

})();
