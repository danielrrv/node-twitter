import { Response, Request } from "express";
import routes from "./routes";
const handle = (req: Request, res: Response, route = 0) => {
	if (req.url === routes[route].path || routes[route].path === "*") {
		return routes[route].handler(req, res);
	}
	if (routes.length - 1 > route) {
		return handle(req, res, route + 1);
	}
}

module.exports = handle;
