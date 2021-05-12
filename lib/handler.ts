
import { Response, Request } from "express";
import { User } from "./entities";
import Manager from "./Model";
import { Params, RedirectResponse, Results } from "./types";
import View from "./view";



/**
 * Handles index request on "/"
 * @param {Request} request
 * @param {Response} response
 * @param {Params?} params
 * @return {Promise<RedirectResponse>}
*/
export const index = async (request: Request, response: Response, params?: Params): Promise<RedirectResponse> => {
	try {
		/*Initializes a user model*/
		const userRepository = Manager.Get<User>(User);
		/*Gets all models-records*/
		const rawUser = await userRepository.Find();
		/*
		* Implementation to add tweets to users objects.
		*Expensive operation. Consider async call from frontend.
		**/
		const users = [];
		for (let user of rawUser){
			const tweets = await User.Tweets(user.twitter_user_name);
			users.push({...user, tweets});
		}
		return View(response, "index.hbs", {users});
	} catch (error) {
		/*Implementation to handle exception.*/
		console.error(error);
		error404(request, response);
	}
	return;
};
/**
 * Handles show individual user look up
 * @param {Request} request
 * @param {Response} response
 * @param {Params?} params
 * @returns {Promise<RedirectResponse>}
 *
*/
export const show = async (request: Request, response: Response, params?: Params): Promise<RedirectResponse> => {
	try {
		/*Retrieves a User instance*/
		const userRepository = Manager.Get(User);
		/*Find this user*/
		const user = await userRepository.Find(params.id);
		/*Response with JSON*/
		response.statusCode = 200;
		response.write(JSON.stringify(user));
		response.end();
	} catch (error) {
		console.log(error);
		error404(request, response);
	}
};
/**
 * Handles 404 redirection
 * @param {Request} request
 * @param {Response} response@
 * @return 
 *
*/
export const error404 = async (request: Request, response: Response): Promise<RedirectResponse>  => {
	response.statusCode = 404;
	response.write("Error 404. Resource Not found");
	response.end();
};
