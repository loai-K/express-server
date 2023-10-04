"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpType = exports.AccountStatus = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType["USER"] = "user";
    RoleType["ADMIN"] = "admin";
})(RoleType || (exports.RoleType = RoleType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Active"] = "activate";
    AccountStatus["DEACTIVE"] = "deactivate";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var OtpType;
(function (OtpType) {
    OtpType["CHECK"] = "check";
    OtpType["FORGET"] = "forget";
    OtpType["VERIFICATION"] = "verification";
})(OtpType || (exports.OtpType = OtpType = {}));
//# sourceMappingURL=enums.js.map