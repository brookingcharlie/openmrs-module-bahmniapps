angular.module('bahmni.offline').service('offlineService', ['$rootScope','$bahmniCookieStore', function ($rootScope, $bahmniCookieStore) {
    var offline = false;

    this.getAppPlatform = function () {
        return $bahmniCookieStore.get(Bahmni.Common.Constants.platform);
    };

    this.isOfflineApp = function () {
        return this.getAppPlatform() !== Bahmni.Common.Constants.platformType.chrome;
    };

    this.offline = function() {
        //return offline;
        return true;
    };

    this.encrypt = function(value, encryptionType) {
        if(encryptionType === Bahmni.Common.Constants.encryptionType.SHA3) {
            return CryptoJS.SHA3(value);
        }
        return value;
    };

    this.setItem = function(key, value, encryptionType) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    this.getItem = function(key) {
        var value = localStorage.getItem(key);
        if(value) {
            return JSON.parse(value);
        }
        return value;
    };

    this.validateLoginInfo = function (loginInfo) {
        return (this.getItem(Bahmni.Common.Constants.LoginInformation)['username'] === loginInfo.username &&
                JSON.stringify(this.getItem(Bahmni.Common.Constants.LoginInformation)['password']) === JSON.stringify(CryptoJS.SHA3(loginInfo.password)));
    };

    Offline.options = {
        game: false,
        checkOnLoad: true
    };

    Offline.on('up', function () {
        console.log("Internet is up.");
        offline = false;
        $rootScope.$broadcast('offline', offline);
    });
    Offline.on('down', function () {
        console.log("Internet is down.");
        offline = true;
        $rootScope.$broadcast('offline', offline);
    });
    var checkOfflineStatus = function () {
        if (Offline.state === 'up') {
            Offline.check();
        }
    };

    var init = function() {
        setInterval(checkOfflineStatus, 5000);
    };
    init();

}]);