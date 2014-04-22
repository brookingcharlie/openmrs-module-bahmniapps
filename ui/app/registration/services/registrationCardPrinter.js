'use strict';

angular.module('bahmni.registration')
.factory('registrationCardPrinter', ['printer', 'appService', function(printer, appService){
    var print = function(patient) {
        var templatePath = appService.getAppDescriptor().getConfigValue("registrationCardPrintLayout") || "";
        printer.print(templatePath, {patient: patient});
    };
    return {print: print};
}]);
