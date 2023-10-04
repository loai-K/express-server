"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_middleware_1 = __importDefault(require("../middlewares/logger.middleware"));
const router = (0, express_1.Router)();
router.use(logger_middleware_1.default);
const proxy_options = {
    target: 'https://jsonplaceholder.typicode.com',
    pathRewrite: {
        ['^/proxy/users']: '/users',
        ['^/proxy/users/:id']: '/users/:id',
        ['^/proxy/users/:id/todos']: '/users/:id/todos',
        ['^/proxy/users/:id/posts']: '/users/:id/posts',
        ['^/proxy/users/:id/comments']: '/users/:id/comments',
        ['^/proxy/users/:id/albums']: '/users/:id/albums',
        ['^/proxy/users/:id/photos']: '/users/:id/photos',
        ['^/proxy/todos']: '/todos',
        ['^/proxy/todos/:id']: '/todos/:id',
        ['^/proxy/posts']: '/posts',
        ['^/proxy/posts/:id']: '/posts/:id',
        ['^/proxy/posts/:id/comments']: '/posts/:id/comments',
        ['^/proxy/comments']: '/comments',
        ['^/proxy/comments/:id']: '/comments/:id',
        ['^/proxy/albums']: '/albums',
        ['^/proxy/albums/:id']: '/albums/:id',
        ['^/proxy/albums/:id/photos']: '/albums/:id/photos',
        ['^/proxy/photos']: '/photos',
        ['^/proxy/photos/:id']: '/photos/:id',
    },
    logLevel: 'silent',
    changeOrigin: true,
    selfHandleResponse: false,
    ws: false,
    onError(err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        });
        res.end('Something went wrong. And we are reporting a custom error message.' + err);
    },
};
router.get(['/users', '/users/:userId([0-9]+)', '/users/:userId([0-9]+)/**', '/todos', '/todos/:todoId([0-9]+)', '/posts', '/posts/:postId([0-9]+)', '/posts/:postId([0-9]+)/comments', '/comments', '/comments/:commentId([0-9]+)', '/albums', '/albums/:albumId([0-9]+)', '/albums/:albumId([0-9]+)/photos', '/photos', '/photos/:photoId([0-9]+)'], (0, http_proxy_middleware_1.createProxyMiddleware)(proxy_options));
router.get('/', (req, res) => {
    res.json({
        users: '/users',
        todos: '/todos',
        posts: '/posts',
        comments: '/comments',
        albums: '/albums',
        photos: '/photos',
    });
});
exports.default = router;
//# sourceMappingURL=proxy.routes.js.map