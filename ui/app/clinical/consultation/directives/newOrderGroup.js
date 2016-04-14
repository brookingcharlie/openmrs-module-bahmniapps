'use strict';

angular.module('bahmni.clinical')
    .directive('newOrderGroup', [function () {
        var controller = function ($scope) {
            $scope.config = {
                title: $scope.orderSetName,
                columns: ['drugName', 'dosage', 'frequency', 'route', 'duration', 'startDate', 'instructions'],
                actions: ['edit'],
                columnHeaders: {
                    frequency: 'MEDICATION_LABEL_FREQUENCY',
                    drugName: 'MEDICATION_DRUG_NAME_TITLE'
                }
            };
        };
        return {
            templateUrl: 'consultation/views/newOrderGroup.html',
            scope: {
                treatments: "=",
                orderSetName: "="
            },
            controller: controller
        }
    }]);