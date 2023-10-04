"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainData = exports.appData = void 0;
const application_json_1 = __importDefault(require("../application.json"));
function appData() {
    return application_json_1.default;
}
exports.appData = appData;
async function mainData(_req, res) {
    return res.json({
        status: 'success',
        message: 'app info',
        body: application_json_1.default,
    });
}
exports.mainData = mainData;
//# sourceMappingURL=main.controller.js.map