"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var heroes_component_1 = require("./heroes.component");
var hero_detail_component_1 = require("./hero-detail.component");
var hero_service_1 = require("./hero.service");
var offline_component_1 = require("./offline.component");
var filtering_component_1 = require("./filtering.component");
var filtering_component_2 = require("./filtering.component");
var offline_component_2 = require("./offline.component");
var search_component_1 = require("./search-component");
var animations_1 = require("@angular/platform-browser/animations");
var overview_component_1 = require("./overview.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            animations_1.BrowserAnimationsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            hero_detail_component_1.DeviceDetailComponent,
            heroes_component_1.DevicesComponent,
            offline_component_1.OfflineComponent,
            filtering_component_1.FilteringComponent,
            overview_component_1.OverviewComponent,
            filtering_component_2.UniquePipe,
            offline_component_2.UniquePipe2,
            search_component_1.SearchComponent
        ],
        providers: [hero_service_1.DeviceService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map