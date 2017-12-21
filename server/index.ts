import * as path from "path";
import * as Koa from "koa";
import { API_SERVER_HOST, API_SERVER_PORT } from "../env";
import * as moment from "moment";
import * as bodyParser from "koa-bodyparser";
import * as koaStatic from "koa-static";
import * as route from "koa-route";
import ProfileService from "./service/ProfileService";

const app = new Koa();

app.use(bodyParser({}));

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(
    route.get("/assets/(.*)/", koaStatic(path.resolve(__dirname, "../dist"), {
        gzip: true,
        index: "",
        maxage: 31536000000 // milliseconds
    }) as any)
);

app.use(async (ctx, next) => {
    // TODO
    var p = new ProfileService();
    var x = await p.getUserProfile("slashhuang");
    console.log(x);
    ctx.status = 200;
    ctx.body = x;
    next();
});

app.on("error", err => {
    console.error(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]: ${err.message || err.toString()}`);
});

app.listen(API_SERVER_PORT, API_SERVER_HOST, () => {
    console.log(`API Server Is Listening at http://${API_SERVER_HOST}:${API_SERVER_PORT}`);
});
