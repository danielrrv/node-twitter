import { index, error404, show } from "./handler";
import { getAllProfile, putProfile, getProfile } from "./api";
import { IRoute } from "./types";
/**
 * Consider the following instruction  before declaring routes:
 * Rule #1. Always place the "/" at the end of the array. Algorithm will match any route against it.
 * Rule #2. Resources routes like /api/users and api/users/:id will match and algorithm can tangled trying to parse
 * one instead of the right one. Please place /api/users/:id first always to avoid race conditions.
 * 
*/
const routes: IRoute[] = [

	{
		handler: show,
		path: "/users",
		method:"GET"
	},
	{
		handler:getProfile,
		path:'/api/profiles/:id',
		method:"GET"
	},
	{
		handler:getAllProfile,
		path:'/api/profiles',
		method:"GET"
	},
	
	{
		handler:putProfile,
		path:'/api/profiles',
		method:"POST"
	},
	{
		handler: index,
		path: "/",
		method: "GET"
	},
];

export default routes;
