"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleUnauthorizedError = (ws) => {
    ws.close(1008, 'Unauthorized, Please login');
    return;
};
const authentication = (ws, req) => {
    const authorizationHeader = req.headers['authorization'];
    const tokenType = authorizationHeader && authorizationHeader.split(' ')[0].toLowerCase().trim();
    let token = authorizationHeader && authorizationHeader.split(' ')[1].trim();
    if (!token) {
        token = req.signedCookies.access_token;
    }
    if (tokenType && tokenType !== 'bearer')
        return handleUnauthorizedError(ws);
    if (!token)
        return handleUnauthorizedError(ws);
};
exports.default = authentication;
//# sourceMappingURL=authentication.js.map