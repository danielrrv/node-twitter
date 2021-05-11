
import { Response, Request } from "express";
import { User } from "./entities";
import Manager from "./Model";
import { Params, RedirectResponse, Results } from "./types";
import View from "./view"


/**
 * Handles index request on "/"
 * @param {Request} request
 * @param {Response} response
 * @param {Params?} params
 * @return {Promise<RedirectResponse>}
*/
export const index = async (request: Request, response: Response, params?: Params): Promise<RedirectResponse> => {
	try {
		const userRepository = Manager.Get<User>(User);
		const rawUser = await userRepository.Find();
		const users = [];
		for (let user of rawUser){
			const tweets = await User.Tweets(user.twitter_user_name)
			users.push({...user, tweets})
		}
		return View(response, "index.hbs", {users});
	} catch (error) {
		console.error(error);
		error404(request, response);
	}
	return;
};

export const show = async (request: Request, response: Response, params?: Params): Promise<RedirectResponse> => {
	try {
		const userRepository = Manager.Get(User);
		const user = await userRepository.Find(params.id);
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
