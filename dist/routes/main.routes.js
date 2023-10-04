"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.json({
        message: 'app info',
        body: (0, controllers_1.appData)(),
    });
});
router.get('/app', async (req, res) => {
    return res.json({
        message: 'app info',
        body: await (0, controllers_1.mainData)(),
    });
});
exports.default = router;
//# sourceMappingURL=main.routes.js.map