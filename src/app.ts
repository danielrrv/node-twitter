import { getProfile } from "./API/api";
import { about, index } from "./Controllers/handler";
import {Router} from "../lib/index";
import { HandlerFunc } from "../lib/index";

const app = new Router();

function logger(req, resp, next){
	console.log(new Date().toISOString(), req.url);
	next();
}

app.Get("/about", logger, about);
app.Post("/api/profiles", getProfile);
app.Get("/", logger, index);

module.exports = app;









