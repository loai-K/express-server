"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const AppInfo = async () => {
    const packageFile = await promises_1.default.readFile('package.json', 'utf-8');
    const packageJson = JSON.parse(packageFile.toString());
    const data = await fetch('https://api.github.com/users/loai-k').then(res => res.json());
    return {
        health: true,
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        keywords: packageJson.keywords,
        author: { name: data.name || packageJson.author.name, bio: data.bio, url: data.html_url || packageJson.author.url },
    };
};
const AppInit = async () => {
    const defaultData = await AppInfo();
    const file = await promises_1.default.realpath('./src/application.json');
    await promises_1.default.writeFile(file, JSON.stringify(defaultData), 'utf-8');
    return;
};
exports.default = AppInit;
//# sourceMappingURL=app.info.js.map