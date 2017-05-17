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
var Bar = (function () {
    function Bar() {
        this.percent = 0;
    }
    Object.defineProperty(Bar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Bar.prototype.recalculatePercentage = function () {
        this.percent = +(100 * this.value / 100).toFixed(2);
    };
    return Bar;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Bar.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Bar.prototype, "value", null);
Bar = __decorate([
    core_1.Component({
        selector: 'bar, [bar]',
        template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"100\"\n    ><ng-content></ng-content></div>\n"
    })
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=bar.component.js.map