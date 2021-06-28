import { getProfile } from './API/api';
import { index } from './Controllers/handler';
import Router from '../lib/router'
import { HandlerFunc } from '../lib/types';



const app = new Router();

function logger(req, resp, next){
	console.log(new Date().toISOString(), req.url);
	next();
}

app.Get('/',logger, index);
app.Post('/api/profiles', getProfile);


module.exports = app;











