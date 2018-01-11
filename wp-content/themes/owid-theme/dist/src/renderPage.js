"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wpdb = require("./wpdb");
var ArticlePage_1 = require("./views/ArticlePage");
var BlogPostPage_1 = require("./views/BlogPostPage");
var BlogIndexPage_1 = require("./views/BlogIndexPage");
var FrontPage_1 = require("./views/FrontPage");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var url = require("url");
var path = require("path");
var glob = require("glob");
var _ = require("lodash");
var fs = require("fs-extra");
var settings_1 = require("./settings");
var formatting_1 = require("./formatting");
function renderPageById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var rows, post, entries, formatted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wpdb.query("\n        SELECT * FROM wp_posts AS post WHERE ID=?\n    ", [id])];
                case 1:
                    rows = _a.sent();
                    return [4 /*yield*/, wpdb.getFullPost(rows[0])];
                case 2:
                    post = _a.sent();
                    return [4 /*yield*/, wpdb.getEntriesByCategory()];
                case 3:
                    entries = _a.sent();
                    return [4 /*yield*/, formatting_1.formatPost(post)];
                case 4:
                    formatted = _a.sent();
                    if (rows[0].post_type === 'post')
                        return [2 /*return*/, ReactDOMServer.renderToStaticMarkup(React.createElement(BlogPostPage_1.BlogPostPage, { entries: entries, post: formatted }))];
                    else
                        return [2 /*return*/, ReactDOMServer.renderToStaticMarkup(React.createElement(ArticlePage_1.ArticlePage, { entries: entries, post: formatted }))];
                    return [2 /*return*/];
            }
        });
    });
}
exports.renderPageById = renderPageById;
function renderFrontPage() {
    return __awaiter(this, void 0, void 0, function () {
        var postRows, permalinks, posts, entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wpdb.query("\n        SELECT ID, post_title, post_date, post_name FROM wp_posts\n        WHERE post_status='publish' AND post_type='post' ORDER BY post_date DESC LIMIT 6")];
                case 1:
                    postRows = _a.sent();
                    return [4 /*yield*/, wpdb.getPermalinks()];
                case 2:
                    permalinks = _a.sent();
                    posts = postRows.map(function (row) {
                        return {
                            title: row.post_title,
                            date: new Date(row.post_date),
                            slug: permalinks.get(row.ID, row.post_name)
                        };
                    });
                    return [4 /*yield*/, wpdb.getEntriesByCategory()];
                case 3:
                    entries = _a.sent();
                    return [2 /*return*/, ReactDOMServer.renderToStaticMarkup(React.createElement(FrontPage_1.FrontPage, { entries: entries, posts: posts }))];
            }
        });
    });
}
exports.renderFrontPage = renderFrontPage;
function renderBlogByPageNum(pageNum) {
    return __awaiter(this, void 0, void 0, function () {
        var postsPerPage, allPosts, numPages, posts, _i, posts_1, post, pathname, paths, sortedPaths, entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postsPerPage = 21;
                    return [4 /*yield*/, wpdb.getBlogIndex()];
                case 1:
                    allPosts = _a.sent();
                    numPages = Math.ceil(allPosts.length / postsPerPage);
                    posts = allPosts.slice((pageNum - 1) * postsPerPage, pageNum * postsPerPage);
                    for (_i = 0, posts_1 = posts; _i < posts_1.length; _i++) {
                        post = posts_1[_i];
                        if (post.imageUrl) {
                            // Find a smaller version of this image
                            try {
                                pathname = url.parse(post.imageUrl).pathname;
                                paths = glob.sync(path.join(settings_1.WORDPRESS_DIR, pathname.replace(/.png/, "*.png")));
                                sortedPaths = _.sortBy(paths, function (path) { return fs.statSync(path).size; });
                                post.imageUrl = sortedPaths[sortedPaths.length - 3].replace(settings_1.WORDPRESS_DIR, '');
                            }
                            catch (err) {
                                // Just use the big one
                            }
                        }
                    }
                    return [4 /*yield*/, wpdb.getEntriesByCategory()];
                case 2:
                    entries = _a.sent();
                    return [2 /*return*/, ReactDOMServer.renderToStaticMarkup(React.createElement(BlogIndexPage_1.BlogIndexPage, { entries: entries, posts: posts, pageNum: pageNum, numPages: numPages }))];
            }
        });
    });
}
exports.renderBlogByPageNum = renderBlogByPageNum;
function main(target) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, pageNum, _c, _d, _e, _f, err_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 7, 8, 9]);
                    if (!(target === 'front')) return [3 /*break*/, 2];
                    _b = (_a = console).log;
                    return [4 /*yield*/, renderFrontPage()];
                case 1:
                    _b.apply(_a, [_g.sent()]);
                    return [3 /*break*/, 6];
                case 2:
                    if (!(target == "blog")) return [3 /*break*/, 4];
                    pageNum = process.argv[3] ? parseInt(process.argv[3]) : 1;
                    _d = (_c = console).log;
                    return [4 /*yield*/, renderBlogByPageNum(pageNum === 0 ? 1 : pageNum)];
                case 3:
                    _d.apply(_c, [_g.sent()]);
                    return [3 /*break*/, 6];
                case 4:
                    _f = (_e = console).log;
                    return [4 /*yield*/, renderPageById(parseInt(target))];
                case 5:
                    _f.apply(_e, [_g.sent()]);
                    _g.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_1 = _g.sent();
                    console.error(err_1);
                    return [3 /*break*/, 9];
                case 8:
                    wpdb.end();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
if (require.main == module)
    main(process.argv[2]);
//# sourceMappingURL=renderPage.js.map