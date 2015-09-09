'use strict';

angular.module('uitest')



    .controller('MainCtrl', function ($scope, rows, $mdDialog, columnHelper) {

        $scope.columnHelper = columnHelper;
        $scope.originalRows = rows;

        $scope.addNewColumn = function(){
            $mdDialog.show({
                controller: NewColumnController,
                templateUrl: 'app/modals/add-column.modal.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    columnNames: _.pluck(columnHelper.columns, 'name')
                }
            })
                .then(function(name) {
                    columnHelper.addNewColumn(name)
                }, function() {
                    console.log("user canceled");
                });
        };

        $scope.exportJson = function(){
            $scope.exportedRows = columnHelper.formatJson();

            $mdDialog.show({
                controller: ExportJsonModalController,
                templateUrl: 'app/modals/json-export.modal.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    exportedJson: $scope.exportedRows
                }
            })
                .then(function(res) {
                    console.log("done");
                }, function() {
                    console.log("user canceled");
                });
        };

        $scope.loadData = function(){
            $mdDialog.show({
                controller: LoadDataSetController,
                templateUrl: 'app/modals/load-data.modal.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                resolve: {
                    dataSet: function(){
                        var Row = Parse.Object.extend("Row");
                        var query = new Parse.Query(Row);
                        return query.find().then(function(result){
                            return _.map(result, function(item){ return item.toJSON()});
                        })
                    }
                }
            })
                .then(function(dataSet) {
                    columnHelper.init(dataSet);
                }, function() {
                    console.log("user canceled");
                });
        };

        columnHelper.init(rows);

    });


function NewColumnController($scope, $mdDialog, columnNames){
    $scope.name = null;


    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.create = function() {
        $mdDialog.hide($scope.name);
    };

    $scope.nameUnique = function(){
        if(!$scope.name){return true}
        else{
            return _.contains(columnNames, $scope.name)
        }
    }
}

function ExportJsonModalController($scope, $mdDialog, exportedJson){
    $scope.exportedJson = exportedJson;

    var Row = Parse.Object.extend("Row");

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.saveAndClose = function() {
        //$mdDialog.hide($scope.name);
        console.log("SAVING");
        var row = new Row();
        row.set('row', $scope.exportedJson);

        row.save().then(function(object) {
            console.log('saved', object.toJSON());
            $mdDialog.hide();
        }, function(err){
            console.log(err);
        });
    };


}

function LoadDataSetController($scope, $mdDialog, dataSet){
    $scope.dataSet = dataSet;
    console.log(dataSet);


    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.openDataSet = function(dataSet) {
        //$mdDialog.hide($scope.name);
        $mdDialog.hide(dataSet.row);

    };


}
