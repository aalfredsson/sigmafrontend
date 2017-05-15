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
var epochs = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];
var UniquePipe2 = (function () {
    function UniquePipe2() {
    }
    UniquePipe2.prototype.getDuration = function (timeAgoInSeconds) {
        for (var _i = 0, epochs_1 = epochs; _i < epochs_1.length; _i++) {
            var _a = epochs_1[_i], name_1 = _a[0], seconds = _a[1];
            var interval = Math.floor(timeAgoInSeconds / seconds);
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name_1
                };
            }
        }
        return {
            interval: 0,
            epoch: 'seconds'
        };
    };
    ;
    UniquePipe2.prototype.transform = function (dateStamp) {
        var timeAgoInSeconds = Math.floor((new Date().getTime() - new Date(dateStamp).getTime()) / 1000);
        var _a = this.getDuration(timeAgoInSeconds), interval = _a.interval, epoch = _a.epoch;
        var suffix = interval === 1 ? '' : 's';
        return interval + " " + epoch + suffix + " ago";
    };
    return UniquePipe2;
}());
UniquePipe2 = __decorate([
    core_1.Pipe({ name: 'relativeDate' }),
    core_1.Injectable()
], UniquePipe2);
exports.UniquePipe2 = UniquePipe2;
var OfflineComponent = (function () {
    function OfflineComponent(deviceService, router) {
        this.deviceService = deviceService;
        this.router = router;
    }
    OfflineComponent.prototype.getHeroes = function () {
        var _this = this;
        this.deviceService
            .getHeroes()
            .then(function (devices) { return _this.devices = devices; });
    };
    OfflineComponent.prototype.ngOnInit = function () {
        this.getHeroes();
        $("#device_filter2").tablesorter();
        $("#device_filter2").bind("DOMSubtreeModified", function () {
            $("#device_filter2").trigger("update");
        });
    };
    OfflineComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    OfflineComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/device', this.selectedDevice.id]);
    };
    return OfflineComponent;
}());
OfflineComponent = __decorate([
    core_1.Component({
        selector: 'offline-devices',
        templateUrl: './offline.component.html',
        styleUrls: ['./heroes.component.css']
    }),
    __metadata("design:paramtypes", [hero_service_1.DeviceService,
        router_1.Router])
], OfflineComponent);
exports.OfflineComponent = OfflineComponent;
//# sourceMappingURL=offline.component.js.map