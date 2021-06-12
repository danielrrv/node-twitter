import { HandlerFunc, IRoute, Params } from "./types";
import { Response, Request } from "express";
import Router from './router'
import { RouteResponse } from "aws-sdk/clients/apigatewayv2";



interface IProxy {
	routers: Router[] | null;
	router: Router
}


export default class Proxy implements IProxy {

	public routers: Router[];
	public router: Router;

	public constructor() {
		this.router = new Router();
		this.routers.push(this.router);
	}

	public handle(req: Request, res: Response) {
		console.log(new Date());
		return this.router.listen(req, res);
	}
}