import * as path from "path";

export const IS_NODE =
    typeof global !== "undefined" && new Object().toString.call(global) === "[object global]";

// Init process.env
IS_NODE && require("dotenv").config({ path: path.resolve(__dirname, "./envrc") });

export const IS_PROD = process.env.NODE_ENV === "production";

// CDN or Local assets url
export const PUBLIC_ASSETS_URL = IS_PROD ? "https://assets.webapproach.net/gp/assets/" : "/assets/";

// SSR Server
export const SSR_SERVER_HOST = IS_PROD ? "127.0.0.1" : "127.0.0.1";
export const SSR_SERVER_PORT = IS_PROD ? 8002 : 9002;

// API Server
export const API_SERVER_HOST = IS_PROD ? "127.0.0.1" : "127.0.0.1";
export const API_SERVER_PORT = IS_PROD ? 8000 : 9000;
export const API_BASE =
    IS_PROD && !IS_NODE
        ? "https://gp.fedepot.com/api/"
        : `http://${API_SERVER_HOST}:${API_SERVER_PORT}/api/`;

// WebSocket Server(Ratelimit realtime notify)
export const WS_SERVER_HOST = IS_PROD ? "127.0.0.1" : "127.0.0.1";
export const WS_SERVER_PORT = IS_PROD ? 8999 : 8999;
export const WS_RATELIMIT_PATH = "/ws/ratelimit";
export const WS_API_BASE =
    IS_PROD && !IS_NODE
        ? "ws://gp.fedepot.com/ws/ratelimit"
        : `ws://${WS_SERVER_HOST}:${WS_SERVER_PORT}${WS_RATELIMIT_PATH}`;

// Github Token
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

// Redis credentials
export const REDIS_HOST = process.env.OS_REDIS_HOST || "127.0.0.1";
export const REDIS_PORT = process.env.OS_REDIS_PORT || 6379;
export const REDIS_PASSWORD = process.env.OS_REDIS_PASSWORD || "";
