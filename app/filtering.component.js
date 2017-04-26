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
            "location": "rum24",
            "status": true,
            "signalStrength": "-90 dbm",
            "battery": "65%",
            "lastSeen": "15 min"
        },
        {
            "id": 2,
            "name": "Device 2",
            "location": "rum23",
            "status": true,
            "signalStrength": "-62 dbm",
            "battery": "0%",
            "lastSeen": "10 min"
        },
        {
            "id": 3,
            "name": "Device 3",
            "location": "rum23",
            "status": false,
            "signalStrength": "-53 dbm",
            "battery": "80%",
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "Device 4",
            "location": "rum24",
            "status": true,
            "signalStrength": "-54 dbm",
            "battery": "44%",
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "Device 5",
            "location": "rum25",
            "status": false,
            "signalStrength": "-23 dbm",
            "battery": "83%",
            "lastSeen": "1 min"
        }
    ]
};
var LOCATIONS = {
    "locations": [{
            "id": 20,
            "name": "dockplatsen1",
            "rooms": [
                {
                    "id": 15,
                    "name": "rum23",
                    "devices": [
                        {
                            "id": 5,
                            "name": "king3"
                        },
                        {
                            "id": 4,
                            "name": "king2"
                        }
                    ]
                },
                {
                    "id": 25,
                    "name": "rum24",
                    "devices": [
                        {
                            "id": 3,
                            "name": "king1"
                        },
                        {
                            "id": 2,
                            "name": "queen1"
                        }
                    ]
                }
            ]
        },
        {
            "id": 10,
            "name": "orkanen",
            "rooms": [{
                    "id": 1,
                    "name": "rum25"
                }]
        }
    ]
};
var FilteringComponent = (function () {
    function FilteringComponent() {
        this.name = 'Angular';
        this.locations = LOCATIONS;
        this.devices = DEVICES;
    }
    FilteringComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    FilteringComponent.prototype.onChange = function () {
        var mySelect = document.getElementById("device_location_list");
        var selectedRoom = mySelect.options[mySelect.selectedIndex].value;
        this.selectedRoom = selectedRoom;
    };
    FilteringComponent.prototype.device_by_room = function (device) {
        if (device.location == this.selectedRoom) {
            return true;
        }
    };
    FilteringComponent.prototype.check_offline = function (device) {
        var obj = device;
        if (obj.status == true) {
            return true;
        }
    };
    FilteringComponent.prototype.check_location = function (device) {
        //skapa ny lista för varje location och sätt location som header ovanför respektive lista
        console.log(this.selectedRoom);
        if (device["location"] == this.selectedRoom) {
            return true;
        }
    };
    return FilteringComponent;
}());
FilteringComponent = __decorate([
    core_1.Component({
        selector: 'filter-devices',
        template: "\n  <div class=\"location-box\">\n    <select id=\"device_location_list\" (change)=\"onChange()\">\n        <option disabled selected>V\u00E4lj rum</option>\n      <ng-container *ngFor=\"let location of locations.locations;\">\n        \n        <option *ngFor=\"let room of location.rooms\" value=\"{{room.name}}\">{{room.name}}</option>\n      </ng-container>\n    </select>\n    <ng-container *ngFor=\"let device of devices.devices\">\n      <div class=\"list-item\" *ngIf=\"device_by_room(device)\" (click)=\"onSelect(device)\">\n        <span>ID: {{ device.id }} Name: {{ device.name }}</span>\n        <span class=\"spawn\">{{ device.status }}</span>\n      </div>\n    </ng-container>\n  </div>\n ",
    })
], FilteringComponent);
exports.FilteringComponent = FilteringComponent;
//# sourceMappingURL=filtering.component.js.map