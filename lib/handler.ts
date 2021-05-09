import { Response, Request } from "express";
import statement from "./connection"
export const index = (request: Request, response: Response): void => {

	const { results, fields, error } = statement("select * from portfolio limit 5;");
	console.log(results, fields, error);
	response.statusCode = 200;
	response.write("Hello world");
	response.end();
	return;
};

export const error404 = (request: Request, response: Response): void => {
	response.statusCode = 404;
	response.write("Error 404. Resource Not found");
	response.end();
	return;
};
