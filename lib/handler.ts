
import { Response, Request } from "express";
import { User } from "./entities";
import Manager from "./Model";
import { Params, Results } from "./types";
import View from "./view"



export const index = async (request: Request, response: Response, params?: Params): Promise<void> => {
	try {
		const userRepository = Manager.Get<User>(User);
		const rawUser = await userRepository.find();
		const users = [];
		for (let user of rawUser){
			 const tweets = await User.Tweets(user.twitter_user_name)
			 users.push({...user, tweets})
		}
		console.log(users[15]);
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
