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
            "status": false,
            "signalStrength": -90,
            "battery": 65,
            "lastSeen": "15 min"
        },
        {
            "id": 2,
            "name": "Device 2",
            "location": "rum22",
            "status": false,
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
var OfflineComponent = (function () {
    function OfflineComponent() {
        this.name = 'Angular';
        this.devices = DEVICES;
    }
    OfflineComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    OfflineComponent.prototype.check_offline = function (device) {
        if (device.status == false) {
            return true;
        }
    };
    OfflineComponent.prototype.all_offline_devices = function (device) {
        if (device.status == false) {
            return device.name;
        }
    };
    OfflineComponent.prototype.devicesID = function (device) {
        return device.id;
    };
    OfflineComponent.prototype.devices_online = function (devices) {
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
    OfflineComponent.prototype.devices_offline = function (devices) {
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
    OfflineComponent.prototype.warning_devices = function (devices) {
        var count = 0;
        for (var _i = 0, _a = devices.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if ((device.battery < 20) && (device.battery > 0)) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    };
    OfflineComponent.prototype.check_location = function (device) {
        //skapa ny lista för varje location och sätt location som header ovanför respektive lista
        if (device["location"] == "rum22") {
            return true;
        }
    };
    OfflineComponent.prototype.no_duplicates = function (device) {
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
    return OfflineComponent;
}());
OfflineComponent = __decorate([
    core_1.Component({
        selector: 'offline-devices',
        template: "\n\n    <ng-container *ngFor=\"let device of devices.devices\">\n        <div class=\"list-item\" *ngIf=\"check_offline(device)\" (click)=\"onSelect(device)\">\n       {{all_offline_devices(device)}}\n        </div>\n    </ng-container>\n\n\n  \n  \n",
    })
], OfflineComponent);
exports.OfflineComponent = OfflineComponent;
//# sourceMappingURL=offline.component.js.map