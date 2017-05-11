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
var UniquePipe = (function () {
    function UniquePipe() {
    }
    UniquePipe.prototype.transform = function (items, args) {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return _.uniqBy(items, args);
    };
    return UniquePipe;
}());
UniquePipe = __decorate([
    core_1.Pipe({
        name: 'uniqFilter',
        pure: false
    }),
    core_1.Injectable()
], UniquePipe);
exports.UniquePipe = UniquePipe;
var FilteringComponent = (function () {
    function FilteringComponent(deviceService, router) {
        this.deviceService = deviceService;
        this.router = router;
    }
    FilteringComponent.prototype.ngOnInit = function () {
        this.getHeroes();
        $("#device_filter").tablesorter();
        $("#device_filter").bind("DOMSubtreeModified", function () {
            $("#device_filter").trigger("update");
        });
        this.onStatusChange();
    };
    FilteringComponent.prototype.getHeroes = function () {
        var _this = this;
        this.deviceService
            .getHeroes()
            .then(function (devices) { return _this.devices = devices; });
    };
    FilteringComponent.prototype.onStatusChange = function () {
        var mySelect = document.getElementById("device_status_list");
        var selectedStatus = mySelect.options[mySelect.selectedIndex].value;
        if (selectedStatus == "true") {
            this.selectedStatus = true;
        }
        else if (selectedStatus == "false") {
            this.selectedStatus = false;
        }
        else if (selectedStatus == "all") {
            this.selectedStatus = null;
        }
    };
    FilteringComponent.prototype.check_offline = function (device) {
        //just a function to show if the device is offline or online, should be changed so when false/true the css would
        //change the color
        if (device.contactLost == false) {
            return "Online";
        }
        else if (device.contactLost == true) {
            return "Offline";
        }
    };
    FilteringComponent.prototype.onSelect = function (device) {
        this.selectedDevice = device;
    };
    FilteringComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/device', this.selectedDevice.id]);
    };
    FilteringComponent.prototype.onChange = function () {
        var mySelect = document.getElementById("device_location_list");
        var selectedRoom = mySelect.options[mySelect.selectedIndex].value;
        this.selectedRoom = selectedRoom;
    };
    FilteringComponent.prototype.device_by_room = function (device) {
        if (this.selectedStatus == undefined && device.locationName == this.selectedRoom) {
            return true;
        }
        else if (this.selectedRoom == "all" && this.selectedStatus == undefined) {
            return true;
        }
        else if (this.selectedRoom == undefined && this.selectedStatus === null) {
            return true;
        }
        if (this.selectedRoom == undefined && this.selectedStatus == device.contactLost) {
            return true;
        }
        else if (this.selectedRoom == "all" && this.selectedStatus == device.contactLost) {
            return true;
        }
        if (device.locationName == this.selectedRoom && this.selectedStatus == device.contactLost) {
            return true;
        }
        else if (this.selectedRoom == "all" && this.selectedStatus === null) {
            return true;
        }
    };
    return FilteringComponent;
}());
FilteringComponent = __decorate([
    core_1.Component({
        selector: 'filter-devices',
        template: "\n  <div class=\"location-box\">\n  \n    <select id=\"device_location_list\" (change)=\"onChange()\">\n        <option value=\"all\" selected>Visa alla rum</option>\n      <ng-container  *ngFor=\"let device of devices | uniqFilter:'device.locationName'\">\n        <option value=\"{{device.locationName}}\">{{device.locationName}}</option>\n      </ng-container>\n    </select>\n\n    <select id=\"device_status_list\" (change)=\"onStatusChange()\">\n        <option value=\"all\" selected>Offline/Online</option>\n        <option value=\"false\">Online</option>\n        <option value=\"true\">Offline</option>\n    </select>\n\n\n    <table id=\"device_filter\" class=\"tablesorter\" style=\"width: 100%;\">\n      <thead>\n        <tr>\n          <th class=\"header\">Name</th>\n          <th class=\"header\">Time Offline</th>\n          <th class=\"header\">Online</th>\n        </tr>\n      </thead>\n      <tbody>\n        <ng-container *ngFor=\"let device of devices\" >\n          <tr class=\"device_row\" *ngIf=\"device_by_room(device)\" (click)=\"onSelect(device)\" (click)=\"gotoDetail()\">\n            <td>{{ device.name }}</td>\n            <td>{{ device.contactLostTime }}</td> \n            <td>{{ check_offline(device) }}</td>\n          </tr>\n        </ng-container>\n      </tbody>\n    </table>\n  </div>\n ",
    }),
    __metadata("design:paramtypes", [hero_service_1.DeviceService,
        router_1.Router])
], FilteringComponent);
exports.FilteringComponent = FilteringComponent;
//# sourceMappingURL=filtering.component.js.map