
import { Response, Request } from "express";
import { User } from "./entities";
import Manager from "./Model";
import { Params } from "./types";
import View from "./view"



export const index = async (request: Request, response: Response, params?: Params): Promise<void> => {
	try {
		const userRepository = Manager.Get<User>(User);
		const users = await userRepository.find();
		const tweets = await userRepository.tweets();
		console.log(tweets);
		return View(response, "index.hbs", {users});
	} catch (error) {
		console.error(error);
		error404(request, response);
	}
	return;
};

export const show = async (request: Request, response: Response, params?: Params): Promise<void> => {
	try {
		const userRepository = Manager.Get(User);
		const user = await userRepository.find(params.id);
		response.statusCode = 200;
		response.write(JSON.stringify(user));
		response.end();
	} catch (error) {
		console.log(error);
		error404(request, response);
	}

	return;
};

export const error404 = (request: Request, response: Response): void => {
	response.statusCode = 404;
	response.write("Error 404. Resource Not found");
	response.end();
	return;
};
