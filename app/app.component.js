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
            "name": "king1",
            "location": "rum21",
            "status": false
        },
        {
            "id": 2,
            "name": "king2",
            "location": "rum22",
            "status": false
        },
        {
            "id": 3,
            "name": "king3",
            "location": "rum23",
            "status": true
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
        console.log(device);
        var obj = device;
        if (obj.status == true) {
            return true;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n  <h1>Hello {{name}}</h1>\n  <ul>\n    <ng-container *ngFor=\"let device of devices.devices\">\n      <li class=\"list-item\" *ngIf=\"check_offline(device)\" (click)=\"onSelect(device)\">\n        <span>{{device.id}}: {{device.name}}</span>\n      </li>\n    </ng-container>\n  </ul>\n  \n  <div *ngIf=\"selectedDevice\">\n    <p>{{ selectedDevice.name }}</p>\n  </div>",
        styles: ["\n    .list-item {\n      list-style: none;\n      padding: 10px;\n      border: 1px solid rgba(0,0,0,0.1);\n      border-radius: 25px;\n      margin-bottom: 10px;\n      width: 25%;\n    }"]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map