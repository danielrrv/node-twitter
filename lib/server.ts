
import { Response, Request } from "express";
import routes from "./routes";
import { Params } from "./types";
const url = require('url');


const handle = (req: Request, res: Response, params?: Params, route = 0) => {
	params = url.parse(req.url, true).query;
	if (url.parse(req.url, true).pathname === routes[route].path || routes[route].path === "*") {
		return routes[route].handler(req, res, params);
	}
	if (routes.length - 1 > route) {
		return handle(req, res, null, route + 1);
	}
};

module.exports = handle;
