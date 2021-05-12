
import {Params} from './types';

/*Parse uri params based on delimiter*/
const parseParams = (routeUrl: string , requestUrl: string, params: Params={})=> {
	/*Delimiter, consider to pass it to  the args function*/
	const delimiter = ":";
	/*try to find  the position of the delimiter*/
	const current = routeUrl.indexOf(delimiter);
	/*Case #. There are delimiter*/
	if(current != -1){
			/*Implementation to extract  the param from the routeUlr declare on routes*/
			let endRoute = current;
			while((routeUrl[endRoute]  != "/") && (endRoute <= routeUrl.length) ){
				endRoute++;
			}
			/*Implementation to extract the value  of the param from the request url*/
			let endRequest = current;
			while((requestUrl[endRequest]  != "/") && (endRequest <=requestUrl.length) ){
				endRequest++;
			}
			/*Set param as key/value */
			params[ routeUrl.slice(current + delimiter.length, endRoute) ] = requestUrl.slice(current, endRequest);
			/*Go!*/
			return parseParams(routeUrl.slice(endRoute),requestUrl.slice(endRequest), params);
	}else{
		return params;
	}
}
exports = module.exports={ parseParams };