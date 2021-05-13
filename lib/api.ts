

import { Params, RedirectResponse, Results } from "./types";
import { Response, Request } from "express";
import { Profile} from './entities';
import {error404} from './handler';

export const getAllProfile = async(request: Request, response: Response, params?: Params): Promise<RedirectResponse> =>{
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

export const getProfile = async( request:Request, response:Response, params?:Params ): Promise<RedirectResponse> =>{
	try {
		console.log(params);
		response.setHeader("Content-Type", "application/json");
		response.write(JSON.stringify(params));
		response.end();
	} catch (error) {
	}
}

export const putProfile = async (request: Request, response: Response, params?: Params): Promise<RedirectResponse> =>{
	try {
	const buffer = [];
	request.on("data", (chunk)=>{
		buffer.push(chunk);
	});
	/*Dangerous operation. Async function inside async function. Possible DeadLocks*/
	request.on("end", async () => {
		const body = JSON.parse(Buffer.concat(buffer).toString("utf-8"));
		const profile = new Profile(body.name, body.description, body.title);
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