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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var device_service_1 = require("./device.service");
var animations_1 = require("@angular/animations");
var DeviceDetailComponent = (function () {
    function DeviceDetailComponent(deviceService, route, location, elementRef) {
        this.deviceService = deviceService;
        this.route = route;
        this.location = location;
        this.elementRef = elementRef;
    }
    DeviceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.deviceService.getDevice(params['id']); })
            .subscribe(function (device) { return _this.device = device; });
    };
    DeviceDetailComponent.prototype.ngAfterViewInit = function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "assets/js/bar-chart.js";
        this.elementRef.nativeElement.appendChild(s);
    };
    DeviceDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return DeviceDetailComponent;
}());
DeviceDetailComponent = __decorate([
    core_1.Component({
        selector: 'device-detail',
        templateUrl: './html/device-detail.component.html',
        animations: [
            animations_1.trigger('itemAnim', [
                animations_1.transition(':enter', [
                    animations_1.style({ opacity: '0' }),
                    animations_1.animate(300)
                ]),
                animations_1.transition(':leave', [
                    animations_1.group([
                        animations_1.animate('0.2s ease', animations_1.style({
                            opacity: '1'
                        })),
                        animations_1.animate('0.5s 0.2s ease', animations_1.style({
                            opacity: 0
                        }))
                    ])
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [device_service_1.DeviceService,
        router_1.ActivatedRoute,
        common_1.Location,
        core_1.ElementRef])
], DeviceDetailComponent);
exports.DeviceDetailComponent = DeviceDetailComponent;
//# sourceMappingURL=device-detail.component.js.map