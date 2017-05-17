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
    OverviewComponent.prototype.ngAfterContentChecked = function () {
        if (this.devices != undefined) {
            this.devices_offline(this.devices);
            this.devices_online(this.devices);
        }
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
        this.offlineValue = Math.round(online_percent);
        this.offlineType = 'danger';
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
        this.onlineValue = Math.round(online_percent);
        this.onlineType = 'success';
    };
    return OverviewComponent;
}());
OverviewComponent = __decorate([
    core_1.Component({
        selector: 'overview-devices',
        template: "\n            <div class=\"panel-body\">\n                <h4 class=\"onlineOffline\">Online Devices</h4>\n                <progressbar class=\"onlineOffline\" [animate]=\"true\" [value]=\"onlineValue\" [type]=\"onlineType\">\n                    <b>{{onlineValue}}%</b>\n                </progressbar>\n                <br>\n                <h4 class=\"onlineOffline\">Offline Devices</h4>\n                <progressbar class=\"onlineOffline\" [animate]=\"true\" [value]=\"offlineValue\" [type]=\"offlineType\">\n                    <b>{{offlineValue}}%</b>\n                </progressbar>\n            </div>\n             ",
    }),
    __metadata("design:paramtypes", [hero_service_1.DeviceService,
        router_1.Router])
], OverviewComponent);
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map