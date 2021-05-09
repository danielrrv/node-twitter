import { index, error404 } from "./handler";
import { IRoute } from "./types";
const routes: IRoute[] = [
	{
		handler: index,
		path: "/",

	},
	{
		handler: error404,
		path: "*",
	},
];

export default routes;
