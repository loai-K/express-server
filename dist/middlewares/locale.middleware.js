"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocaleMiddleware = (request, _response, next) => {
    const { LANGUAGES, FALLBACK_LANGUAGE } = process.env;
    const language = request.headers['content-language'] || FALLBACK_LANGUAGE;
    const locales = LANGUAGES?.split(',');
    if (locales?.includes(language)) {
        request.locale = language;
    }
    next();
};
exports.default = LocaleMiddleware;
//# sourceMappingURL=locale.middleware.js.map