exports.id = 817;
exports.ids = [817];
exports.modules = {

/***/ 572:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 1798))

/***/ }),

/***/ 1798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DeviceContxt: () => (/* binding */ DeviceContxt),
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(4751);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(5996);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/Navigation.tsx



function Navbar() {
    const navStyle = "w-28 px-3 py-2 text-lg font-bold text-slate-400 border-2 border-slate-500 hover:bg-violet-600 hover:text-white transition-all hover:border-white";
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/challenges",
                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: navStyle,
                    children: "Challs"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/team",
                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: navStyle,
                    children: "Team"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/profile",
                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: navStyle,
                    children: "Profile"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/login",
                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: "w-28 px-3 py-2 text-lg font-bold border-2 text-slate-600 bg-violet-600 text-white transition-all",
                    children: "Login"
                })
            })
        ]
    });
}

// EXTERNAL MODULE: ./public/static/css/globals.css
var globals = __webpack_require__(827);
// EXTERNAL MODULE: ./components/Loading.tsx
var Loading = __webpack_require__(7390);
;// CONCATENATED MODULE: ./app/layout.tsx
/* __next_internal_client_entry_do_not_use__ default,DeviceContxt auto */ 







const Context = /*#__PURE__*/ (0,react_.createContext)(null);
function RootLayout({ children }) {
    const [isMobile, setisMoblie] = (0,react_.useState)(null);
    (0,react_.useEffect)(()=>{
        setisMoblie(window.innerWidth <= 640);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            className: "flex flex-col w-screen min-h-screen overflow-x-hidden",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "fixed bg-slate-800 shadow-lg h-14 w-full flex justify-center items-center transition-all z-50",
                    children: isMobile != null ? isMobile ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute text-center font-Bungee text-4xl py-2 text-slate-500 w-min left-4",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/",
                                    children: "TRAILBLAZE"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute flex right-4 gap-3",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(Navbar, {})
                            })
                        ]
                    }) : /*#__PURE__*/ jsx_runtime_.jsx(Loading/* default */.Z, {})
                }),
                isMobile != null ? isMobile ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "absolute flex flex-col justify-center items-center top-0 end-0 bg-slate-800 h-screen w-screen",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mt-20 text-slate-400",
                            children: "THIS IS A DESKTOP APPLICATION"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "bg-deskOnly h-full w-full bg-contain bg-no-repeat bg-center"
                        })
                    ]
                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Context.Provider, {
                    value: isMobile,
                    children: [
                        " ",
                        children,
                        " "
                    ]
                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(react_toastify_esm/* ToastContainer */.Ix, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnFocusLoss: false,
                    draggable: true,
                    pauseOnHover: true,
                    theme: "light"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "z-40 fixed bottom-5 end-5 text-slate-500",
                    children: "made by titans@titancrew \uD83D\uDC40"
                })
            ]
        })
    });
}
function DeviceContxt() {
    return (0,react_.useContext)(Context);
}


/***/ }),

/***/ 7390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Loading() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "absolute flex flex-col top-0 end-0 z-50 h-screen w-screen bg-slate-800 justify-center items-center",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-slate-400 text-5xl font-Gruppo",
                children: "TRAILBLAZE"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "bg-loading bg-cover bg-center w-80 h-14"
            })
        ]
    });
}


/***/ }),

/***/ 1921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   DeviceContxt: () => (/* binding */ e0),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/atish/trailBlaze/client/app/layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);
const e0 = proxy["DeviceContxt"];


/***/ }),

/***/ 827:
/***/ (() => {



/***/ })

};
;