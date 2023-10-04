"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const router = (0, express_1.Router)({
    mergeParams: true,
});
router.get('/', (req, res) => {
    return res.json({
        message: 'App API Version Info',
        data: { api: 'v1', ...(0, controllers_1.appData)() },
    });
});
exports.default = router;
//# sourceMappingURL=version.routes.js.map