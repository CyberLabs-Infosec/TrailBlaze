"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./public/static/css/globals.css":
/*!***************************************!*\
  !*** ./public/static/css/globals.css ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"47722b30ae8d\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3B1YmxpYy9zdGF0aWMvY3NzL2dsb2JhbHMuY3NzIiwibWFwcGluZ3MiOiI7QUFBQSwrREFBZSxjQUFjO0FBQzdCLElBQUksSUFBVSxJQUFJLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wdWJsaWMvc3RhdGljL2Nzcy9nbG9iYWxzLmNzcz84NTMwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiNDc3MjJiMzBhZThkXCJcbmlmIChtb2R1bGUuaG90KSB7IG1vZHVsZS5ob3QuYWNjZXB0KCkgfVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./public/static/css/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/layout.tsx":
/*!************************!*\
  !*** ./app/layout.tsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DeviceContxt: function() { return /* binding */ DeviceContxt; },\n/* harmony export */   \"default\": function() { return /* binding */ RootLayout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"(app-pages-browser)/./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"(app-pages-browser)/./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var _components_Navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Navigation */ \"(app-pages-browser)/./components/Navigation.tsx\");\n/* harmony import */ var _public_static_css_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../public/static/css/globals.css */ \"(app-pages-browser)/./public/static/css/globals.css\");\n/* __next_internal_client_entry_do_not_use__ default,DeviceContxt auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\nconst Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);\nfunction RootLayout(param) {\n    let { children } = param;\n    _s();\n    const [isMobile, setisMoblie] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const hamStyle = \"w-8 h-1 bg-slate-500 rounded-full bun right-0\";\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setisMoblie(window.innerWidth <= 640);\n    }, []);\n    const onHamClick = ()=>{\n        var butn = document.getElementById(\"hamburger\");\n        const buns = document.getElementsByClassName(\"bun\");\n        if (butn.classList.contains(\"left-0\")) {\n            butn.classList.remove(\"left-0\");\n            butn.classList.add(\"left-full\");\n            butn.classList.add(\"hidden\");\n            for(var i = 0; i < buns.length; i++){\n                buns[i].classList.remove(\"absolute\");\n            }\n            document.getElementById(\"hamBtn\").classList.remove(\"bg-rose-600\");\n        } else {\n            butn.classList.add(\"left-0\");\n            butn.classList.remove(\"left-full\");\n            butn.classList.remove(\"hidden\");\n            for(var i = 0; i < buns.length; i++){\n                buns[i].classList.add(\"absolute\");\n            }\n            document.getElementById(\"hamBtn\").classList.add(\"bg-rose-600\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"html\", {\n        lang: \"en\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n            className: \"flex flex-col w-screen min-h-screen\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"sticky shadow-lg h-14 w-full flex justify-center items-center transition-all z-50\",\n                    children: isMobile != null ? isMobile ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"text-center font-Bungee text-3xl py-3 text-slate-500\",\n                                children: \"CyberTrail\"\n                            }, void 0, false, {\n                                fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 29\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                id: \"hamBtn\",\n                                onClick: onHamClick,\n                                className: \"absolute right-4 flex gap-1 flex-col h-8 justify-center items-center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: hamStyle\n                                    }, void 0, false, {\n                                        fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                        lineNumber: 50,\n                                        columnNumber: 33\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: hamStyle\n                                    }, void 0, false, {\n                                        fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                        lineNumber: 51,\n                                        columnNumber: 33\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: hamStyle\n                                    }, void 0, false, {\n                                        fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                        lineNumber: 52,\n                                        columnNumber: 33\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                lineNumber: 49,\n                                columnNumber: 29\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 25\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"absolute text-center font-Bungee text-4xl py-2 text-slate-500 w-min left-4\",\n                                children: \"CyberTrail\"\n                            }, void 0, false, {\n                                fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                lineNumber: 56,\n                                columnNumber: 29\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex absolute right-4 gap-3\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navigation__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                    fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                    lineNumber: 58,\n                                    columnNumber: 33\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                                lineNumber: 57,\n                                columnNumber: 29\n                            }, this)\n                        ]\n                    }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Context.Provider, {\n                    value: isMobile,\n                    children: [\n                        \" \",\n                        children,\n                        \" \"\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                    lineNumber: 62,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {\n                    position: \"top-center\",\n                    autoClose: 5000,\n                    hideProgressBar: false,\n                    newestOnTop: false,\n                    closeOnClick: true,\n                    rtl: false,\n                    pauseOnFocusLoss: false,\n                    draggable: true,\n                    pauseOnHover: true,\n                    theme: \"light\"\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                    lineNumber: 63,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"z-40 absolute bottom-5 end-5 text-slate-500\",\n                    children: \"made by titans@titancrew \\uD83D\\uDC40\"\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n                    lineNumber: 75,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n            lineNumber: 44,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/atish/cyberTrail/client/app/layout.tsx\",\n        lineNumber: 43,\n        columnNumber: 9\n    }, this);\n}\n_s(RootLayout, \"PdrNzDEOl6rE0ekM/Db04FB7ynY=\");\n_c = RootLayout;\nfunction DeviceContxt() {\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);\n}\n_s1(DeviceContxt, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\n_c1 = DeviceContxt;\nvar _c, _c1;\n$RefreshReg$(_c, \"RootLayout\");\n$RefreshReg$(_c1, \"DeviceContxt\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9sYXlvdXQudHN4Pzk5ODgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5pbXBvcnQgJ3JlYWN0LXRvYXN0aWZ5L2Rpc3QvUmVhY3RUb2FzdGlmeS5jc3MnO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9OYXZpZ2F0aW9uXCI7XG5pbXBvcnQgJy4uL3B1YmxpYy9zdGF0aWMvY3NzL2dsb2JhbHMuY3NzJ1xuXG5jb25zdCBDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm9vdExheW91dCh7IGNoaWxkcmVuLCB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICAgIGNvbnN0IFtpc01vYmlsZSwgc2V0aXNNb2JsaWVdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgaGFtU3R5bGUgPSAndy04IGgtMSBiZy1zbGF0ZS01MDAgcm91bmRlZC1mdWxsIGJ1biByaWdodC0wJztcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldGlzTW9ibGllKHdpbmRvdy5pbm5lcldpZHRoIDw9IDY0MCk7XG4gICAgfSwgW10pXG5cbiAgICBjb25zdCBvbkhhbUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB2YXIgYnV0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyXCIpO1xuICAgICAgICBjb25zdCBidW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ1blwiKTtcbiAgICAgICAgaWYgKGJ1dG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwibGVmdC0wXCIpKSB7XG4gICAgICAgICAgICBidXRuLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0LTBcIik7XG4gICAgICAgICAgICBidXRuLmNsYXNzTGlzdC5hZGQoXCJsZWZ0LWZ1bGxcIik7XG4gICAgICAgICAgICBidXRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBidW5zW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhYnNvbHV0ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtQnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJiZy1yb3NlLTYwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJ1dG4uY2xhc3NMaXN0LmFkZChcImxlZnQtMFwiKTtcbiAgICAgICAgICAgIGJ1dG4uY2xhc3NMaXN0LnJlbW92ZShcImxlZnQtZnVsbFwiKTtcbiAgICAgICAgICAgIGJ1dG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGJ1bnNbaV0uY2xhc3NMaXN0LmFkZChcImFic29sdXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYW1CdG5cIikuY2xhc3NMaXN0LmFkZChcImJnLXJvc2UtNjAwXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGh0bWwgbGFuZz0nZW4nPlxuICAgICAgICAgICAgPGJvZHkgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIHctc2NyZWVuIG1pbi1oLXNjcmVlbic+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N0aWNreSBzaGFkb3ctbGcgaC0xNCB3LWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgei01MCc+XG4gICAgICAgICAgICAgICAgICAgIHsgaXNNb2JpbGUgIT0gbnVsbCA/ICggaXNNb2JpbGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXIgZm9udC1CdW5nZWUgdGV4dC0zeGwgcHktMyB0ZXh0LXNsYXRlLTUwMCc+Q3liZXJUcmFpbDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2hhbUJ0bicgb25DbGljaz17b25IYW1DbGlja30gY2xhc3NOYW1lPSdhYnNvbHV0ZSByaWdodC00IGZsZXggZ2FwLTEgZmxleC1jb2wgaC04IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aGFtU3R5bGV9Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtoYW1TdHlsZX0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2hhbVN0eWxlfT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj46XG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhYnNvbHV0ZSB0ZXh0LWNlbnRlciBmb250LUJ1bmdlZSB0ZXh0LTR4bCBweS0yIHRleHQtc2xhdGUtNTAwIHctbWluIGxlZnQtNCc+Q3liZXJUcmFpbDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGFic29sdXRlIHJpZ2h0LTQgZ2FwLTMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2YmFyPjwvTmF2YmFyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+ICkgOiA8PjwvPiB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2lzTW9iaWxlfT4geyBjaGlsZHJlbiB9IDwvQ29udGV4dC5Qcm92aWRlcj5cbiAgICAgICAgICAgICAgICA8VG9hc3RDb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCJ0b3AtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlPXs1MDAwfVxuICAgICAgICAgICAgICAgICAgICBoaWRlUHJvZ3Jlc3NCYXI9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBuZXdlc3RPblRvcD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25DbGlja1xuICAgICAgICAgICAgICAgICAgICBydGw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBwYXVzZU9uRm9jdXNMb3NzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlT25Ib3ZlclxuICAgICAgICAgICAgICAgICAgICB0aGVtZT1cImxpZ2h0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd6LTQwIGFic29sdXRlIGJvdHRvbS01IGVuZC01IHRleHQtc2xhdGUtNTAwJz5tYWRlIGJ5IHRpdGFuc0B0aXRhbmNyZXcg8J+RgDwvZGl2PlxuICAgICAgICAgICAgPC9ib2R5PlxuICAgICAgICA8L2h0bWw+XG4gICAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGV2aWNlQ29udHh0KCkge1xuICAgIHJldHVybiB1c2VDb250ZXh0KENvbnRleHQpO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUNvbnRleHQiLCJUb2FzdENvbnRhaW5lciIsIk5hdmJhciIsIkNvbnRleHQiLCJSb290TGF5b3V0IiwiY2hpbGRyZW4iLCJpc01vYmlsZSIsInNldGlzTW9ibGllIiwiaGFtU3R5bGUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwib25IYW1DbGljayIsImJ1dG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYnVucyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsImkiLCJsZW5ndGgiLCJodG1sIiwibGFuZyIsImJvZHkiLCJjbGFzc05hbWUiLCJkaXYiLCJpZCIsIm9uQ2xpY2siLCJzcGFuIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInBvc2l0aW9uIiwiYXV0b0Nsb3NlIiwiaGlkZVByb2dyZXNzQmFyIiwibmV3ZXN0T25Ub3AiLCJjbG9zZU9uQ2xpY2siLCJydGwiLCJwYXVzZU9uRm9jdXNMb3NzIiwiZHJhZ2dhYmxlIiwicGF1c2VPbkhvdmVyIiwidGhlbWUiLCJEZXZpY2VDb250eHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/layout.tsx\n"));

/***/ })

});