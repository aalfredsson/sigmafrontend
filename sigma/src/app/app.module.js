"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var hero_detail_component_1 = require("./hero-detail.component");
var hero_service_1 = require("./hero.service");
var offline_component_1 = require("./offline.component");
var overview_component_1 = require("./overview.component");
var filtering_component_1 = require("./filtering.component");
var progress_directive_1 = require("./progress.directive");
var bar_component_1 = require("./bar.component");
var progressbar_component_1 = require("./progressbar.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, common_1.CommonModule, app_routing_module_1.AppRoutingModule],
        declarations: [app_component_1.AppComponent, hero_detail_component_1.DeviceDetailComponent, offline_component_1.OfflineComponent, overview_component_1.OverviewComponent, filtering_component_1.FilteringComponent, filtering_component_1.UniquePipe, progress_directive_1.Progress, bar_component_1.Bar, progressbar_component_1.Progressbar],
        providers: [hero_service_1.DeviceService, filtering_component_1.UniquePipe],
        bootstrap: [app_component_1.AppComponent, offline_component_1.OfflineComponent, overview_component_1.OverviewComponent, filtering_component_1.FilteringComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map