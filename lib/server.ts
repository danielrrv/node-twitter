
import { Response, Request } from "express";
import routes from "./routes";
import { Params } from "./types";
import { error404 } from "./handler";
const url = require('url');
const helpers = require('../dist/helpers')

/**
 * Handles incoming requests and derives each to respective handler that matches the route.
 * @async requests are being dealt as promises / non-blocking.
 * 
*/
const handle = async (req: Request, res: Response, params: Params={}, route = 0) => {
	/*Expensive allocation on recursive function. TODO: Inject it from a container*/
	const queryStrings = url.parse(req.url, true).query;
	Object.assign(params, queryStrings);

	/*Case #1: Request's url matches with route and method at position  stated by route on routes array*/
	if (new RegExp(helpers.convertOnRegexUrl(routes[route].path))
		.test(url.parse(req.url, true).pathname) &&
		req.method==routes[route].method
		) {
		/*Implementation to parse params*/
		Object.assign(params, helpers.parseParams(routes[route].path, req.url));
		/*See you in future ticks->*/
		return routes[route].handler(req, res, params);
	}
	/*Case #2. Keep preaching for routes. */
	if (routes.length - 1 > route) {
		return handle(req, res, params, route + 1);
	}
	return  error404(req, res);
};

module.exports = handle;
