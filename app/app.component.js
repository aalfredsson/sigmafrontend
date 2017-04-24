"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
        this.devices = DEVICES;
    }
    AppComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    AppComponent.prototype.check_offline = function (device) {
        if (device.status == false) {
            return true;
        }
    };
    AppComponent.prototype.all_offline_devices = function (device) {
        if (device.status == false) {
            return device.name;
        }
    };
    AppComponent.prototype.devices_online = function (devices) {
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
    AppComponent.prototype.devices_offline = function (devices) {
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
    AppComponent.prototype.warning_devices = function (devices) {
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
    AppComponent.prototype.check_location = function (device) {
        //skapa ny lista för varje location och sätt location som header ovanför respektive lista
        if (device["location"] == "rum22") {
            return true;
        }
    };
    AppComponent.prototype.no_duplicates = function (device) {
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
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n  <h1>Hello {{name}}</h1>\n  <div class=\"location-box\">\n    <select id=\"device_location_list\">\n      <ng-container *ngFor=\"let device of devices.devices\">\n        <option>{{device.location}}</option>\n      </ng-container>\n    </select>\n\n    <ng-container *ngFor=\"let device of devices.devices\">\n        <div class=\"list-item\" *ngIf=\"check_offline(device)\" (click)=\"onSelect(device)\">\n          <span>{{all_offline_devices(device)}}</span>\n          <span class=\"spawn\">{{ device.status }}</span>\n        </div>\n    </ng-container>\n  </div>\n\n  <div *ngIf=\"selectedDevice\">\n    <ul>\n      <li>{{ selectedDevice.signalStrength }}</li>\n      <li>{{ selectedDevice.battery }}</li>\n      <li>{{ selectedDevice.lastSeen }}</li>\n    </ul>\n  </div>\n  <h2>Systemstatus</h2>\n    <p>{{ devices_online(devices) }} % of the devices are online</p>\n    <p>{{ devices_offline(devices) }} % of the devices are offline</p>\n    <p>{{ warning_devices(devices) }} % of the devices have warnings</p>",
        styles: ["\n    .list-item {\n      padding: 10px;\n      border: 1px solid rgba(0,0,0,0.1);\n      border-radius: 25px;\n      margin-bottom: 10px;\n      width: 25%;\n      display: flex;\n    }\n    \n    .spawn {\n      margin-left: auto;\n    }\n    \n    .location-box {\n      padding: 10px;\n      border: solid 1px rgba(0,0,0,0.2);\n    }\n    "]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map