"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
var OverviewComponent = (function () {
    function OverviewComponent(deviceService, router) {
        this.deviceService = deviceService;
        this.router = router;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    OverviewComponent.prototype.getHeroes = function () {
        var _this = this;
        this.deviceService
            .getHeroes()
            .then(function (devices) { return _this.devices = devices; });
    };
    OverviewComponent.prototype.devices_offline = function (devices) {
        var count = 0;
        for (var _i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
            var device = devices_1[_i];
            if (device.contactLost == true) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.length) * 100;
        return Math.round(online_percent);
    };
    OverviewComponent.prototype.devices_online = function (devices) {
        var count = 0;
        for (var _i = 0, devices_2 = devices; _i < devices_2.length; _i++) {
            var device = devices_2[_i];
            if (device.contactLost == false) {
                count = count + 1;
            }
        }
        var online_percent = (count / devices.length) * 100;
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
    return OverviewComponent;
}());
OverviewComponent = __decorate([
    core_1.Component({
        selector: 'overview-devices',
        template: "\n    \n    \n     <div class=\"panel-body\">\n                            <div class=\"panel_positive panel-default\">\n                                <div class=\"panel-body\">\n                                    <p class=\"col-sm-4\">{{ devices_online(devices) }}% Online</p>\n                                    <div class=\"progress\">\n                                        <div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 96%\">\n                                            <span class=\"sr-only\">20% Complete (success)</span>\n                                        </div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                           \n                            <div class=\"panel_positive panel-default\">\n                                <div class=\"panel-body\">\n                                    <p class=\"col-sm-4\" *ngIf=\"devices\">{{ devices_offline(devices) }}% Offline</p>\n                                    <div class=\"progress\">\n                                        <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 4%\">\n                                            <span class=\"sr-only\">1% Complete (warning)</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div> \n                        </div>\n    \n  ",
        styles: ["\n    .list-item {\n      padding: 10px;\n      border: 1px solid rgba(0,0,0,0.1);\n      border-radius: 25px;\n      margin-bottom: 10px;\n      width: 25%;\n      display: flex;\n    }\n    \n    .spawn {\n      margin-left: auto;\n    }\n    \n    .location-box {\n      padding: 10px;\n      border: solid 1px rgba(0,0,0,0.2);\n    }\n    "]
    }),
    __metadata("design:paramtypes", [hero_service_1.DeviceService,
        router_1.Router])
], OverviewComponent);
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overviewOld.component.js.map