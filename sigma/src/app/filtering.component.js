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
        this.onStatusChange("Offline/Online");
    };
    FilteringComponent.prototype.getHeroes = function () {
        var _this = this;
        this.deviceService
            .getHeroes()
            .then(function (devices) { return _this.devices = devices; });
    };
    FilteringComponent.prototype.onStatusChange = function (selectedStatus) {
        console.log(selectedStatus);
        if (selectedStatus == "Offline") {
            this.selectedStatus = true;
            $('#dropdownMenu2').html('Offline <span class="caret"></span>');
        }
        else if (selectedStatus == "Online") {
            this.selectedStatus = false;
            $('#dropdownMenu2').html('Online <span class="caret"></span>');
        }
        else if (selectedStatus == "Offline/Online") {
            $('#dropdownMenu2').html('Offline/Online <span class="caret"></span>');
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
    FilteringComponent.prototype.onChange = function (selectedRoom) {
        this.selectedRoom = selectedRoom;
        $('#dropdownMenu1').html(this.selectedRoom + ' <span class="caret"></span>');
    };
    FilteringComponent.prototype.device_by_room = function (device) {
        if (this.selectedStatus == undefined && device.locationName == this.selectedRoom) {
            return true;
        }
        else if (this.selectedRoom == "Show all rooms" && this.selectedStatus == undefined) {
            return true;
        }
        else if (this.selectedRoom == undefined && this.selectedStatus === null) {
            return true;
        }
        if (this.selectedRoom == undefined && this.selectedStatus == device.contactLost) {
            return true;
        }
        else if (this.selectedRoom == "Show all rooms" && this.selectedStatus == device.contactLost) {
            return true;
        }
        if (device.locationName == this.selectedRoom && this.selectedStatus == device.contactLost) {
            return true;
        }
        else if (this.selectedRoom == "Show all rooms" && this.selectedStatus === null) {
            return true;
        }
    };
    return FilteringComponent;
}());
FilteringComponent = __decorate([
    core_1.Component({
        selector: 'filter-devices',
        templateUrl: './filter.component.html',
        styleUrls: ['./heroes.component.css']
    }),
    __metadata("design:paramtypes", [hero_service_1.DeviceService,
        router_1.Router])
], FilteringComponent);
exports.FilteringComponent = FilteringComponent;
//# sourceMappingURL=filtering.component.js.map