import { getProfile } from './API/api';
import { index } from './Controllers/handler';
import Router from '../lib/router'



const app = new Router();

app.Get('/', index).Post('/api/profiles', getProfile);


module.exports = app;











