
import { Response, Request } from "express";
import routes from "./routes";
import { Params } from "./types";
const url = require('url');

/**
 * Handles incoming requests and derive each to respective handler that matches routes.
 * @async requests are being dealt as promises non-blocking processing.
 * 
*/
const handle = async (req: Request, res: Response, params?: Params, route = 0) => {
	/*Expensive allocation on recursive function. TODO: Inject it from a container*/
	params = url.parse(req.url, true).query;
	/*Case #1: Request url matches with route at position route*/
	if (url.parse(req.url, true).pathname === routes[route].path || routes[route].path === "*") {
		/*See you in future ticks->*/
		return routes[route].handler(req, res, params);
	}
	/*Case #2. Keep looking. */
	if (routes.length - 1 > route) {
		/*Preaching for routes*/
		return handle(req, res, null, route + 1);
	}
};

module.exports = handle;
