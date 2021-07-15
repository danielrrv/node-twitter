import { HandlerFunc, Params, RedirectResponse, Results } from "../../lib/types";
import { Response, Request } from "express";
import Profile from "../Models/Profile";
import {error404} from "../Controllers/handler";
/**
 * Gets all profiles available on dynamoDB
 * @param {Request} request
 * @param {Response} response
 * @param {Params} params
 * @returns {Promise<RedirectResponse>}
 */
export const getAllProfile:HandlerFunc = async(request: Request, response: Response, next:Function): Promise<RedirectResponse> =>{
	try {
	const allProfiles = await Profile.All();
	response.statusCode = 200;
	response.setHeader("Content-Type", "application/json");
	response.write(JSON.stringify(allProfiles));
	response.end();
	} catch (error) {
		console.error(error);
		error404(request, response);
	}
}

/**
 * Gets single item from dynamoDB document.
 * @param {Request} request
 * @param {Response} response
 * @param {Params} params
 * @returns {Promise<RedirectResponse>}
*/
export const getProfile:HandlerFunc = async( request:Request, response:Response, next:Function): Promise<RedirectResponse> =>{
	try {
		if(request.params.hasOwnProperty("id")){
			const profile= await Profile.Find(request.params.id);
			response.setHeader("Content-Type", "application/json");
			response.write(JSON.stringify(profile));
			response.end();
		}else{
			throw new Error("No id property provided!");
		}
		
	} catch (error) {
		console.error(error);
		response.statusCode = 404;/*JUST for development*/
		response.setHeader("Content-Type", "application/json;charset=utf-8");
		response.write(JSON.stringify({error : error.message}));
		response.end();
	}
}

/**
 * Creates item on the DynamoDB"s document
 * @param {Request} request
 * @param {Response} response
 * @param {Params} params
 * @returns {Promise<RedirectResponse>}
*/
export const putProfile:HandlerFunc = async (request: Request, response: Response): Promise<RedirectResponse> =>{
	try {
	const buffer = [];
	request.on("data", (chunk)=>{
		buffer.push(chunk);
	});
	/*Dangerous operation. Async function inside async function. Possible DeadLocks*/
	request.on("end", async () => {
		const body = JSON.parse(Buffer.concat(buffer).toString("utf-8"));
		const profile = new Profile(body.name, body.description, body.title);
		/*Implementation to save the model.*/
		await profile.save();
		response.statusCode = 200;
		response.setHeader("Content-Type", "application/json;charset=utf-8");
		response.write(JSON.stringify(profile));
		response.end();
	});
	request.on("error",(err) => {
		throw err;
	});
	} catch (error) {
		console.error(error);
		response.statusCode = 404;/*JUST for development*/
		response.setHeader("Content-Type", "application/json;charset=utf-8");
		response.write(JSON.stringify({error : error.message}));
		response.end();
	}
}