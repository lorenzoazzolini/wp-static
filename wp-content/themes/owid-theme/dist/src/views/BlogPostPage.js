"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("../settings");
var React = require("react");
var Head_1 = require("./Head");
var SiteHeader_1 = require("./SiteHeader");
var SiteFooter_1 = require("./SiteFooter");
var formatting_1 = require("../formatting");
exports.BlogPostPage = function (props) {
    var entries = props.entries, post = props.post;
    var authorsText = formatting_1.formatAuthors(post.authors);
    var pageTitle = post.title;
    var canonicalUrl = settings.BAKED_URL + "/" + post.slug;
    var pageDesc = post.excerpt;
    return React.createElement("html", null,
        React.createElement(Head_1.Head, { pageTitle: pageTitle, pageDesc: pageDesc, canonicalUrl: canonicalUrl, imageUrl: post.imageUrl }),
        React.createElement("body", { className: "single-post" },
            React.createElement(SiteHeader_1.SiteHeader, { entries: entries }),
            React.createElement("main", null,
                React.createElement("header", { className: "blog-header" },
                    React.createElement("h1", null,
                        React.createElement("a", { href: "/blog" }, "Blog"))),
                React.createElement("div", { className: "site-content" },
                    React.createElement("article", { className: "post" },
                        React.createElement("header", { className: "article-header" },
                            React.createElement("h1", { className: "entry-title" }, post.title),
                            React.createElement("div", { className: "entry-meta" },
                                React.createElement("time", null, formatting_1.formatDate(post.date)),
                                " by ",
                                formatting_1.formatAuthors(post.authors))),
                        React.createElement("div", { className: "article-content", dangerouslySetInnerHTML: { __html: post.html } }),
                        React.createElement("footer", { className: "article-footer" },
                            React.createElement("h2", { id: "footnotes" }, "Footnotes"),
                            React.createElement("ol", { className: "side-matter side-matter-list", style: { 'list-style-type': 'decimal', opacity: 1 } }, post.footnotes.map(function (footnote, i) {
                                return React.createElement("li", { id: "note-" + (i + 1), className: "side-matter side-matter-note", style: { 'margin-top': '0px' } },
                                    React.createElement("div", { className: "side-matter side-matter-text" },
                                        React.createElement("p", { dangerouslySetInnerHTML: { __html: footnote } })));
                            })))))),
            React.createElement("div", { id: "wpadminbar", style: { display: 'none' } },
                React.createElement("div", { className: "quicklinks", id: "wp-toolbar", role: "navigation", "aria-label": "Toolbar" },
                    React.createElement("ul", { id: "wp-admin-bar-root-default", className: "ab-top-menu" },
                        React.createElement("li", { id: "wp-admin-bar-site-name", className: "menupop" },
                            React.createElement("a", { className: "ab-item", "aria-haspopup": "true", href: "/wp-admin/" }, "Our World In Data")),
                        React.createElement("li", { id: "wp-admin-bar-edit" },
                            React.createElement("a", { className: "ab-item", href: "/wp-admin/post.php?post=" + post.id + "&action=edit" }, "Edit Post"))))),
            React.createElement(SiteFooter_1.SiteFooter, null)));
};
//# sourceMappingURL=BlogPostPage.js.map