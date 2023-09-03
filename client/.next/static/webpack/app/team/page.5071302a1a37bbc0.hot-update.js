"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/team/page",{

/***/ "(app-pages-browser)/./app/team/page.tsx":
/*!***************************!*\
  !*** ./app/team/page.tsx ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ \"(app-pages-browser)/./node_modules/js-cookie/dist/js.cookie.mjs\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"(app-pages-browser)/./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Loading */ \"(app-pages-browser)/./components/Loading.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Page() {\n    _s();\n    const inpStyle = \"outline-none rounded-md px-3 py-3 shadow-2xl shadow-slate-950 text-slate-400 bg-transparent\";\n    const [userdata, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        username: null,\n        phone: null,\n        teamname: null\n    });\n    const [loggedin, setLoggedin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [team, setTeam] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const handleCreate = async ()=>{\n        const teamname = document.getElementById(\"teamname\").value;\n        const secret = document.getElementById(\"secret\").value;\n        const data = await react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.promise(fetch(\"/api/user/createteam\", {\n            method: \"POST\",\n            headers: {\n                \"Authorization\": \"Bearer \".concat(js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"token\")),\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                teamname,\n                secret\n            })\n        }), {\n            pending: \"Creating team...\"\n        });\n        const jsonData = await data.json();\n        if (jsonData.status == \"fail\") {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(jsonData.error);\n        } else {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(\"Congrats, you started a team!\");\n            location.reload();\n        }\n    };\n    const handleJoin = async ()=>{\n        const teamname = document.getElementById(\"teamname\").value;\n        const secret = document.getElementById(\"secret\").value;\n        const data = await react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.promise(fetch(\"/api/user/jointeam\", {\n            method: \"POST\",\n            headers: {\n                \"Authorization\": \"Bearer \".concat(js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"token\")),\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                teamname,\n                secret\n            })\n        }), {\n            pending: \"Joining team...\"\n        });\n        const jsonData = await data.json();\n        if (jsonData.status == \"fail\") {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(jsonData.error);\n        } else {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(\"Congrats, you joined a team!\");\n            location.reload();\n        }\n    };\n    const handleLeave = async ()=>{\n        const data = await react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.promise(fetch(\"/api/user/leaveteam\", {\n            headers: {\n                \"Authorization\": \"Bearer \".concat(js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"token\"))\n            }\n        }), {\n            pending: \"Leaving team...\"\n        });\n        const jsonData = await data.json();\n        if (jsonData.status == \"fail\") {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(jsonData.error);\n        } else {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(\"You left the team\");\n            location.reload();\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const verify = async ()=>{\n            const data = await fetch(\"/api/user/verify\", {\n                headers: {\n                    \"Authorization\": \"Bearer \".concat(js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"token\"))\n                }\n            });\n            const jsonData = await data.json();\n            if (jsonData.status == \"success\") {\n                setUserData(jsonData.data);\n                setLoggedin(true);\n            } else {\n                router.push(\"/login\");\n            }\n        };\n        verify();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getTeamInfo = async ()=>{\n            const data = await fetch(\"/api/user/teaminfo\", {\n                headers: {\n                    \"Authorization\": \"Bearer \".concat(js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"token\"))\n                }\n            });\n            const jsonData = await data.json();\n            if (jsonData.status == \"success\") {\n                setTeam(jsonData.data);\n            }\n        };\n        if (loggedin) {\n            getTeamInfo();\n        }\n    }, [\n        loggedin\n    ]);\n    return loggedin ? userdata.teamname == null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900 gap-10\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h-96 w-96 bg-cover rounded-xl z-10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full bg-planets bg-s bg-cover bg-center rounded-md\"\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                    lineNumber: 130,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                lineNumber: 129,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col gap-3\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-center text-3xl font-bold text-slate-400\",\n                        children: \"JOIN / CREATE TEAM\"\n                    }, void 0, false, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 133,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"hr\", {\n                        className: \"border-slate-500\"\n                    }, void 0, false, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 134,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: inpStyle,\n                        id: \"teamname\",\n                        name: \"teamname\",\n                        placeholder: \"Team Name\"\n                    }, void 0, false, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 135,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        className: inpStyle,\n                        id: \"secret\",\n                        name: \"secret\",\n                        placeholder: \"Team Secret\",\n                        type: \"password\"\n                    }, void 0, false, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center gap-3 w-full\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: handleJoin,\n                                className: \"bg-violet-600 text-white p-3 w-1/2 rounded-md shadow-lg shadow-violet-500/50 grow\",\n                                children: \"Join\"\n                            }, void 0, false, {\n                                fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                                lineNumber: 138,\n                                columnNumber: 21\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: handleCreate,\n                                className: \"bg-violet-600 text-white p-3 w-1/2 rounded-md shadow-lg shadow-violet-500/50 grow\",\n                                children: \"Create\"\n                            }, void 0, false, {\n                                fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                                lineNumber: 139,\n                                columnNumber: 21\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 137,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                lineNumber: 132,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n        lineNumber: 128,\n        columnNumber: 9\n    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-col\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: handleLeave,\n                    className: \"bg-violet-600 text-white p-3 w-1/2 rounded-md shadow-lg shadow-violet-500/50 grow\",\n                    children: \"Leave Team\"\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                    lineNumber: 144,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-white\",\n                    children: userdata.teamname\n                }, void 0, false, {\n                    fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                    lineNumber: 145,\n                    columnNumber: 17\n                }, this),\n                Object.keys(team).map((i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: team[i]\n                    }, i, false, {\n                        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n                        lineNumber: 147,\n                        columnNumber: 50\n                    }, this))\n            ]\n        }, void 0, true, {\n            fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n            lineNumber: 143,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n        lineNumber: 142,\n        columnNumber: 18\n    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"text-center text-3xl font-bold text-slate-400\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Loading__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n            fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n            lineNumber: 151,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/atish/cyberTrail/client/app/team/page.tsx\",\n        lineNumber: 150,\n        columnNumber: 18\n    }, this);\n}\n_s(Page, \"4ljmWMRmfRRVU8IahRcEf/DIyZ4=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC90ZWFtL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRW1EO0FBQ25CO0FBQ087QUFDSTtBQUVJO0FBRWhDLFNBQVNPOztJQUNwQixNQUFNQyxXQUFXO0lBQ2pCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHUiwrQ0FBUUEsQ0FBQztRQUFFUyxVQUFVO1FBQU1DLE9BQU87UUFBTUMsVUFBVTtJQUFLO0lBQ3ZGLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNjLE1BQU1DLFFBQVEsR0FBR2YsK0NBQVFBLENBQUMsQ0FBQztJQUNsQyxNQUFNZ0IsU0FBU2IsMERBQVNBO0lBRXhCLE1BQU1jLGVBQWU7UUFDakIsTUFBTU4sV0FBVyxTQUFVUSxjQUFjLENBQUMsWUFBaUNDLEtBQUs7UUFDaEYsTUFBTUMsU0FBUyxTQUFVRixjQUFjLENBQUMsVUFBK0JDLEtBQUs7UUFFNUUsTUFBTUUsT0FBTyxNQUFNcEIsaURBQUtBLENBQUNxQixPQUFPLENBQUNDLE1BQU0sd0JBQXdCO1lBQzNEQyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ0wsaUJBQWlCLFVBQStCLE9BQXJCekIsaURBQU9BLENBQUMwQixHQUFHLENBQUM7Z0JBQ3ZDLGdCQUFnQjtZQUNwQjtZQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7Z0JBQ2pCbkI7Z0JBQVVVO1lBQ2Q7UUFDSixJQUFJO1lBQ0FVLFNBQVM7UUFDYjtRQUVBLE1BQU1DLFdBQVcsTUFBTVYsS0FBS1csSUFBSTtRQUVoQyxJQUFJRCxTQUFTRSxNQUFNLElBQUksUUFBUTtZQUMzQmhDLGlEQUFLQSxDQUFDaUMsS0FBSyxDQUFDSCxTQUFTRyxLQUFLO1FBQzlCLE9BQU87WUFDSGpDLGlEQUFLQSxDQUFDa0MsT0FBTyxDQUFDO1lBQ2RDLFNBQVNDLE1BQU07UUFDbkI7SUFDSjtJQUVBLE1BQU1DLGFBQWE7UUFDZixNQUFNNUIsV0FB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QVNDLGFBQVk7d0JBQWNDLE1BQUs7Ozs7OztrQ0FDckYsOERBQUNSO3dCQUFJQyxXQUFVOzswQ0FDWCw4REFBQ1E7Z0NBQU9DLFNBQVNmO2dDQUFZTSxXQUFVOzBDQUFvRjs7Ozs7OzBDQUMzSCw4REFBQ1E7Z0NBQU9DLFNBQVNyQztnQ0FBYzRCLFdBQVU7MENBQW9GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHaEksOERBQUNEO1FBQUlDLFdBQVU7a0JBQ3BCLDRFQUFDRDtZQUFJQyxXQUFVOzs4QkFDWCw4REFBQ1E7b0JBQU9DLFNBQVNkO29CQUFhSyxXQUFVOzhCQUFvRjs7Ozs7OzhCQUM1SCw4REFBQ0M7b0JBQUVELFdBQVU7OEJBQWN0QyxTQUFTSSxRQUFROzs7Ozs7Z0JBRXhDNEMsT0FBT0MsSUFBSSxDQUFDMUMsTUFBTTJDLEdBQUcsQ0FBQyxDQUFDQyxrQkFBTSw4REFBQ2Q7a0NBQWE5QixJQUFJLENBQUM0QyxFQUFFO3VCQUFYQTs7Ozs7Ozs7Ozs7Ozs7OzZCQUcxQyw4REFBQ2Q7UUFBSUMsV0FBVTtrQkFDcEIsNEVBQUN6QywyREFBT0E7Ozs7Ozs7Ozs7QUFHcEI7R0FoSndCQzs7UUFLTEYsc0RBQVNBOzs7S0FMSkUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL3RlYW0vcGFnZS50c3g/N2MwZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nXG5cbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTG9hZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoKSB7XG4gICAgY29uc3QgaW5wU3R5bGUgPSBcIm91dGxpbmUtbm9uZSByb3VuZGVkLW1kIHB4LTMgcHktMyBzaGFkb3ctMnhsIHNoYWRvdy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS00MDAgYmctdHJhbnNwYXJlbnRcIjtcbiAgICBjb25zdCBbdXNlcmRhdGEsIHNldFVzZXJEYXRhXSA9IHVzZVN0YXRlKHsgdXNlcm5hbWU6IG51bGwsIHBob25lOiBudWxsLCB0ZWFtbmFtZTogbnVsbCB9KTtcbiAgICBjb25zdCBbbG9nZ2VkaW4sIHNldExvZ2dlZGluXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbdGVhbSwgc2V0VGVhbV0gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICBjb25zdCBoYW5kbGVDcmVhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlYW1uYW1lID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVhbW5hbWVcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGNvbnN0IHNlY3JldCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY3JldFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdG9hc3QucHJvbWlzZShmZXRjaChcIi9hcGkvdXNlci9jcmVhdGV0ZWFtXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtDb29raWVzLmdldCgndG9rZW4nKX1gLFxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHRlYW1uYW1lLCBzZWNyZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLCB7XG4gICAgICAgICAgICBwZW5kaW5nOiBcIkNyZWF0aW5nIHRlYW0uLi5cIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXG4gICAgICAgIGlmIChqc29uRGF0YS5zdGF0dXMgPT0gXCJmYWlsXCIpIHtcbiAgICAgICAgICAgIHRvYXN0LmVycm9yKGpzb25EYXRhLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvYXN0LnN1Y2Nlc3MoXCJDb25ncmF0cywgeW91IHN0YXJ0ZWQgYSB0ZWFtIVwiKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlSm9pbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVhbW5hbWUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZWFtbmFtZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgY29uc3Qgc2VjcmV0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjcmV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0b2FzdC5wcm9taXNlKGZldGNoKFwiL2FwaS91c2VyL2pvaW50ZWFtXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtDb29raWVzLmdldCgndG9rZW4nKX1gLFxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHRlYW1uYW1lLCBzZWNyZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLCB7XG4gICAgICAgICAgICBwZW5kaW5nOiBcIkpvaW5pbmcgdGVhbS4uLlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cbiAgICAgICAgaWYgKGpzb25EYXRhLnN0YXR1cyA9PSBcImZhaWxcIikge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoanNvbkRhdGEuZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9hc3Quc3VjY2VzcyhcIkNvbmdyYXRzLCB5b3Ugam9pbmVkIGEgdGVhbSFcIik7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUxlYXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdG9hc3QucHJvbWlzZShmZXRjaChcIi9hcGkvdXNlci9sZWF2ZXRlYW1cIiwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7Q29va2llcy5nZXQoJ3Rva2VuJyl9YCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHtcbiAgICAgICAgICAgIHBlbmRpbmc6IFwiTGVhdmluZyB0ZWFtLi4uXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuICAgICAgICBpZiAoanNvbkRhdGEuc3RhdHVzID09IFwiZmFpbFwiKSB7XG4gICAgICAgICAgICB0b2FzdC5lcnJvcihqc29uRGF0YS5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2FzdC5zdWNjZXNzKFwiWW91IGxlZnQgdGhlIHRlYW1cIik7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZlcmlmeSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcIi9hcGkvdXNlci92ZXJpZnlcIiwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtDb29raWVzLmdldCgndG9rZW4nKX1gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgaWYgKGpzb25EYXRhLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgIHNldFVzZXJEYXRhKGpzb25EYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvZ2dlZGluKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZlcmlmeSgpO1xuICAgIH0sIFtdKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0VGVhbUluZm8gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goXCIvYXBpL3VzZXIvdGVhbWluZm9cIiwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtDb29raWVzLmdldCgndG9rZW4nKX1gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgaWYgKGpzb25EYXRhLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgIHNldFRlYW0oanNvbkRhdGEuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvZ2dlZGluKSB7XG4gICAgICAgICAgICBnZXRUZWFtSW5mbygpO1xuICAgICAgICB9XG4gICAgfSwgW2xvZ2dlZGluXSlcblxuICAgIHJldHVybihcbiAgICAgICAgbG9nZ2VkaW4gP1xuICAgICAgICB1c2VyZGF0YS50ZWFtbmFtZSA9PSBudWxsID9cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGFic29sdXRlIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciB3LWZ1bGwgaC1mdWxsIG1pbi1oLWZ1bGwgYmctc2xhdGUtOTAwIGdhcC0xMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTk2IHctOTYgYmctY292ZXIgcm91bmRlZC14bCB6LTEwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGJnLXBsYW5ldHMgYmctcyBiZy1jb3ZlciBiZy1jZW50ZXIgcm91bmRlZC1tZFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LWNvbCBnYXAtMyc+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC0zeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwXCI+Sk9JTiAvIENSRUFURSBURUFNPC9wPlxuICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9XCJib3JkZXItc2xhdGUtNTAwXCI+PC9ocj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnBTdHlsZX0gaWQ9J3RlYW1uYW1lJyBuYW1lPSd0ZWFtbmFtZScgcGxhY2Vob2xkZXI9J1RlYW0gTmFtZSc+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnBTdHlsZX0gaWQ9J3NlY3JldCcgbmFtZT0nc2VjcmV0JyBwbGFjZWhvbGRlcj0nVGVhbSBTZWNyZXQnIHR5cGU9J3Bhc3N3b3JkJz48L2lucHV0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGp1c3RpZnktY2VudGVyIGdhcC0zIHctZnVsbCc+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlSm9pbn0gY2xhc3NOYW1lPVwiYmctdmlvbGV0LTYwMCB0ZXh0LXdoaXRlIHAtMyB3LTEvMiByb3VuZGVkLW1kIHNoYWRvdy1sZyBzaGFkb3ctdmlvbGV0LTUwMC81MCBncm93XCI+Sm9pbjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNyZWF0ZX0gY2xhc3NOYW1lPVwiYmctdmlvbGV0LTYwMCB0ZXh0LXdoaXRlIHAtMyB3LTEvMiByb3VuZGVkLW1kIHNoYWRvdy1sZyBzaGFkb3ctdmlvbGV0LTUwMC81MCBncm93XCI+Q3JlYXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IDogPGRpdiBjbGFzc05hbWU9J2ZsZXggYWJzb2x1dGUganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHctZnVsbCBoLWZ1bGwgbWluLWgtZnVsbCBiZy1zbGF0ZS05MDAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1jb2wnPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlTGVhdmV9IGNsYXNzTmFtZT0nYmctdmlvbGV0LTYwMCB0ZXh0LXdoaXRlIHAtMyB3LTEvMiByb3VuZGVkLW1kIHNoYWRvdy1sZyBzaGFkb3ctdmlvbGV0LTUwMC81MCBncm93Jz5MZWF2ZSBUZWFtPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LXdoaXRlJz57dXNlcmRhdGEudGVhbW5hbWV9PC9wPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGVhbSkubWFwKChpKSA9PiA8ZGl2IGtleT17aX0+e3RlYW1baV19PC9kaXY+KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXIgdGV4dC0zeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwJz5cbiAgICAgICAgICAgIDxMb2FkaW5nPjwvTG9hZGluZz5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ29va2llcyIsInRvYXN0IiwidXNlUm91dGVyIiwiTG9hZGluZyIsIlBhZ2UiLCJpbnBTdHlsZSIsInVzZXJkYXRhIiwic2V0VXNlckRhdGEiLCJ1c2VybmFtZSIsInBob25lIiwidGVhbW5hbWUiLCJsb2dnZWRpbiIsInNldExvZ2dlZGluIiwidGVhbSIsInNldFRlYW0iLCJyb3V0ZXIiLCJoYW5kbGVDcmVhdGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJzZWNyZXQiLCJkYXRhIiwicHJvbWlzZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImdldCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGVuZGluZyIsImpzb25EYXRhIiwianNvbiIsInN0YXR1cyIsImVycm9yIiwic3VjY2VzcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiaGFuZGxlSm9pbiIsImhhbmRsZUxlYXZlIiwidmVyaWZ5IiwicHVzaCIsImdldFRlYW1JbmZvIiwiZGl2IiwiY2xhc3NOYW1lIiwicCIsImhyIiwiaW5wdXQiLCJpZCIsIm5hbWUiLCJwbGFjZWhvbGRlciIsInR5cGUiLCJidXR0b24iLCJvbkNsaWNrIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/team/page.tsx\n"));

/***/ })

});