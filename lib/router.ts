
"use strict"
import { HandlerFunc, IRoute, Params } from "./types";
import { Response, Request, request, response } from "express";
import { error404 } from "../src/Controllers/handler";
const helpers = require('./utils/helpers')
const url = require('url');


export default class Router {
	private routes?: IRoute[] = [];
	public listen = async(req: Request, res: Response)=>{
		return this.handle(req,res);
	}
	private handle(req: Request, res: Response, params: Params = {}, route = 0){

		/*Case #1: Request's url matches with route and method at position  stated by route on routes array*/
		if (new RegExp(helpers.convertToRegexUrl(this.routes[route].path))
			.test(url.parse(req.url, true).pathname) &&
			req.method == this.routes[route].method
		) {
			/*Implementation to capture query strings*/
			const queryStrings = url.parse(req.url, true).query;
			Object.assign(params, queryStrings);
			/*Implementation to parse params*/
			Object.assign(params, helpers.parseParams(this.routes[route].path, req.url));
			/*See you in future ticks->*/
			return this.routes[route].handler(req, res, params);
		}
		/*Case #2. Keep preaching for routes. */
		if (this.routes.length - 1 > route) {
			return this.handle(req, res, params, route + 1);
		}
		/*Implementation to default router behavior*/
		return error404(req, res);
	}
	public Get(path: string, func:HandlerFunc) {
		this.routes.push({ path: path, method: "GET", handler: func });
		return this;
	}
	public Post(path: string, func:HandlerFunc) {
		this.routes.push({ path: path, method: "POST", handler: func});
		return this;
	}
}
