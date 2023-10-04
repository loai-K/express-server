"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
let appInit = false;
const AppInfo = async () => {
    const packageFile = await (0, promises_1.readFile)('package.json', 'utf-8');
    const packageJson = JSON.parse(packageFile.toString());
    const data = await fetch('https://api.github.com/users/loai-k')
        .then(res => res.json());
    return {
        health: true,
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        keywords: packageJson.keywords,
        author: {
            name: data.name || packageJson.author.name,
            bio: data.bio,
            url: data.html_url || packageJson.author.url,
        },
    };
};
const AppInit = async () => {
    try {
        if (!appInit) {
            const defaultData = await AppInfo();
            const file = await (0, promises_1.realpath)('./src/application.json');
            appInit = true;
        }
    }
    catch (error) {
        appInit = false;
        new Error(error.message);
    }
    return appInit;
};
exports.default = AppInit;
//# sourceMappingURL=app.info.js.map