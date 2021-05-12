import { index, error404, show } from "./handler";
import { getAllProfile, putProfile, getProfile } from "./api";
import { IRoute } from "./types";
const routes: IRoute[] = [
	{
		handler: index,
		path: "/",
		method: "GET"
	},
	{
		handler: show,
		path: "/users",
		method:"GET"
	},
	{
		handler:getAllProfile,
		path:'/api/profiles',
		method:"GET"
	},
	{
		handler:getProfile,
		path:'/api/profiles/:id',
		method:"GET"
	},
	{
		handler:putProfile,
		path:'/api/profiles',
		method:"POST"
	},
	{
		handler: error404,
		path: "*",
		method:"*"
	},
];

export default routes;
