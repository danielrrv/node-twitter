import { index, error404, show } from "./handler";
import { IRoute } from "./types";
const routes: IRoute[] = [
	{
		handler: index,
		path: "/",

	},
	{
		handler: show,
		path: "/users",

	},
	{
		handler: error404,
		path: "*",
	},
];

export default routes;
