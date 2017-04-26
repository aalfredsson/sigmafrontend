"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Device = (function () {
    function Device() {
    }
    return Device;
}());
exports.Device = Device;
var DEVICES = {
    "devices": [{
            "id": 1,
            "name": "Device 1",
            "location": "rum21",
            "status": true,
            "signalStrength": -90,
            "battery": 65,
            "lastSeen": "15 min"
        },
        {
            "id": 2,
            "name": "Device 2",
            "location": "rum22",
            "status": true,
            "signalStrength": -62,
            "battery": 0,
            "lastSeen": "10 min"
        },
        {
            "id": 3,
            "name": "Device 3",
            "location": "rum23",
            "status": true,
            "signalStrength": -53,
            "battery": 5,
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "Device 4",
            "location": "rum23",
            "status": false,
            "signalStrength": -54,
            "battery": 0,
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "Device 5",
            "location": "rum23",
            "status": false,
            "signalStrength": -80,
            "battery": 83,
            "lastSeen": "1 min"
        }
    ]
};
var OverviewComponent = (function () {
    function OverviewComponent() {
        this.name = 'Angular';
        this.devices = DEVICES;
    }
    OverviewComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    OverviewComponent.prototype.check_offline = function (device) {
        var obj = device;
        if (obj.status == false) {
            return true;
        }
    };
    OverviewComponent.prototype.devices_online = function (devices) {
        var count = 0;
        for (var _i = 0, _a = devices.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.status == true) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    };
    OverviewComponent.prototype.devices_offline = function (devices) {
        var count = 0;
        for (var _i = 0, _a = devices.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.status == false) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    };
    OverviewComponent.prototype.warning_devices = function (devices) {
        var count = 0;
        for (var _i = 0, _a = devices.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if ((device.battery < 20) && (device.battery > 0)) {
                count = count + 1;
            }
            else if ((device.signalStrength < -70) && (device.signalStrength > -90)) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    };
    OverviewComponent.prototype.check_location = function (device) {
        //skapa ny lista för varje location och sätt location som header ovanför respektive lista
        if (device["location"] == "rum22") {
            return true;
        }
    };
    OverviewComponent.prototype.no_duplicates = function (device) {
        var mySelect = document.getElementById("device_location_list");
        var mySelectLength = mySelect.length - 1;
        console.log(mySelect);
        if (mySelect.length != 0) {
            for (var i = 0; i < mySelect.length; i++) {
                if (mySelect.options[mySelectLength].value != device.location) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    return OverviewComponent;
}());
OverviewComponent = __decorate([
    core_1.Component({
        selector: 'overview-devices',
        template: "\n    \n    \n     <div class=\"panel-body\">\n                            <div class=\"panel_positive panel-default\">\n                                <div class=\"panel-body\">\n                                    <p class=\"col-sm-4\">{{ devices_online(devices) }}% Online</p>\n                                    <div class=\"progress\">\n                                        <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%\">\n                                            <span class=\"sr-only\">20% Complete (success)</span>\n                                        </div>\n                                      \n                                    </div>\n                                </div>\n                            </div>\n                           \n                            <div class=\"panel_positive panel-default\">\n                                <div class=\"panel-body\">\n                                    <p class=\"col-sm-4\">{{ devices_offline(devices) }}% Offline</p>\n                                    <div class=\"progress\">\n                                        <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 40%\">\n                                            <span class=\"sr-only\">1% Complete (warning)</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div> \n                        </div>\n    \n  ",
        styles: ["\n    .list-item {\n      padding: 10px;\n      border: 1px solid rgba(0,0,0,0.1);\n      border-radius: 25px;\n      margin-bottom: 10px;\n      width: 25%;\n      display: flex;\n    }\n    \n    .spawn {\n      margin-left: auto;\n    }\n    \n    .location-box {\n      padding: 10px;\n      border: solid 1px rgba(0,0,0,0.2);\n    }\n    "]
    })
], OverviewComponent);
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map