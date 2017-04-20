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
        template: "\n  <h1>Hello {{name}}</h1>\n  <ul>\n    <li *ngFor=\"let device of devices.devices\">\n\n      <span *ngIf=\"check_offline(device)\">{{device.id}}: {{device.name}}</span>\n    </li>\n  </ul>",
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map