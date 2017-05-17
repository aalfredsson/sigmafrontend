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
var Progress = (function () {
    function Progress() {
        this.addClass = 'progress';
    }
    Progress.prototype.ngOnInit = function () {
        this.animate = this.animate !== false;
    };
    return Progress;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Progress.prototype, "animate", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], Progress.prototype, "addClass", void 0);
Progress = __decorate([
    core_1.Directive({ selector: 'bs-progress, [progress]' })
], Progress);
exports.Progress = Progress;
//# sourceMappingURL=progress.directive.js.map