"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const allPromises = Promise.all([
        fetch('https://jsonplaceholder.typicode.com/todos'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
    ]);
    allPromises
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
        res.json(data);
    })
        .catch(console.error);
});
exports.default = router;
//# sourceMappingURL=test.routes.js.map