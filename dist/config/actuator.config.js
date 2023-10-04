"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actuatorApp = void 0;
const express_actuator_1 = __importDefault(require("express-actuator"));
const controllers_1 = require("../controllers");
const actuatorOptions = {
    basePath: '',
    infoGitMode: 'full',
    infoDateFormat: 'DD-MM-YYYY hh:mm:ss A',
    infoBuildOptions: {
        data: controllers_1.appData,
    },
    customEndpoints: [
        {
            id: '',
            controller: controllers_1.mainData,
        },
        {
            id: 'check',
            controller: controllers_1.mainData,
        },
    ],
};
exports.actuatorApp = (0, express_actuator_1.default)(actuatorOptions);
exports.default = exports.actuatorApp;
//# sourceMappingURL=actuator.config.js.map