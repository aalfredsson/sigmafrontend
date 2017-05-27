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
var device_service_1 = require("./device.service");
var animations_1 = require("@angular/animations");
var DevicesComponent = (function () {
    function DevicesComponent(deviceService, router, elementRef) {
        this.deviceService = deviceService;
        this.router = router;
        this.elementRef = elementRef;
    }
    DevicesComponent.prototype.getDevices = function () {
        var _this = this;
        this.deviceService
            .getDevices()
            .then(function (devices) { return _this.devices = devices; });
    };
    DevicesComponent.prototype.ngOnInit = function () {
        this.getDevices();
    };
    DevicesComponent.prototype.ngAfterViewInit = function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "assets/js/primary.js";
        this.elementRef.nativeElement.appendChild(s);
    };
    DevicesComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    DevicesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/device', this.selectedDevice.id]);
    };
    return DevicesComponent;
}());
DevicesComponent = __decorate([
    core_1.Component({
        templateUrl: './html/devices.component.html',
        animations: [
            animations_1.trigger('itemAnim', [
                animations_1.transition(':enter', [
                    animations_1.style({ opacity: '0' }),
                    animations_1.animate(1500)
                ]),
                animations_1.transition(':leave', [
                    animations_1.group([
                        animations_1.animate('0s ease', animations_1.style({
                            opacity: '0'
                        })),
                        animations_1.animate('0s 0s ease', animations_1.style({
                            opacity: 0
                        }))
                    ])
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [device_service_1.DeviceService,
        router_1.Router,
        core_1.ElementRef])
], DevicesComponent);
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map