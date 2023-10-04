"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const AppInfo = async () => {
    const packageFile = await (0, promises_1.readFile)('package.json', 'utf-8');
    const packageJson = JSON.parse(packageFile.toString());
    return {
        health: true,
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        keywords: packageJson.keywords,
        author: {
            name: packageJson.author.name,
            url: packageJson.author.url,
        },
    };
};
const AppInit = async () => {
    try {
        const defaultData = await AppInfo();
        const file = await (0, promises_1.realpath)('./src/application.json');
    }
    catch (error) {
        new Error(error.message);
    }
};
exports.default = AppInit;
//# sourceMappingURL=app.info.js.map