angular.module('uitest')

    .directive('colorHopper', function(){
        return {
            restrict: "EA",
            scope: {
                columns: "="
            },
            replace: true,
            templateUrl: "app/components/color-chart/color-chart.directive.html",
            controller: function($scope, columnHelper){
                $scope.columnHelper = columnHelper;
            }
        }
    })
;



