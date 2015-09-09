"use strict";

angular.module('uitest')
    .service('columnHelper', function($filter){
        var service = {
            columns: [],
            rows: [],
            init: function(data){
                service.columns = [];
                service.rows = angular.copy(data);

                _.map(service.rows, function(row, idx){
                    row.cells = _.map(row.states, function(val, key){
                        service.columns.push(val);
                        return {color: key, colIndex: val, rowIndex: idx, order: _.indexOf(row.sequence, key)};
                    });
                });

                service.columns = _.map(_.uniq(_.flatten(service.columns)), function(col){
                    return {name: col, rows: []};
                });

                _.each(service.columns, function(column){
                    _.each(service.rows, function(row){
                        column.rows.push(_.where(row.cells, {colIndex: column.name}));
                    });
                });
                service.columns = $filter('orderBy')(service.columns, 'name');
            },
            getRowCount: function(column){
                var count = 0;
                _.each(column.rows, function(row){
                    count = count + row.length;
                });
                return count;
            },
            moveRight: function(cell, row, colIdx){
                _.remove(row, cell);
                var lastColumn = service.columns[service.columns.length - 1];
                var nextColumn = service.columns[colIdx+1];

                if(cell.colIndex === lastColumn.name){
                    cell.colIndex = service.columns[0].name;
                    service.columns[0].rows[cell.rowIndex].push(cell);
                }
                else{
                    cell.colIndex = nextColumn.name;
                    nextColumn.rows[cell.rowIndex].push(cell);
                }
            },
            addNewColumn: function(columnName){
                var newColumn = {name: columnName, rows: _.map(service.rows, function(r){return []})};
                service.columns.push(newColumn);
            },
            formatJson: function(){
                var cells = [];
                var rows = [];
                _.each(service.columns, function(col){
                    cells = cells.concat(_.flatten(col.rows));
                });

                _.each(_.uniq(_.pluck(cells, 'rowIndex')), function(rowIdx){
                    var cellRows = _.where(cells, {rowIndex: rowIdx});
                    var row = {states: {}, sequence: _.pluck(_.sortBy(cellRows, 'order'), 'color')};

                    _.each(cellRows, function(cell){
                        row.states[cell.color] = cell.colIndex;
                    });
                    rows.push(row);
                });
                return rows;
            }
        };

        return service;
    })

;
