
import {Params} from '../types';

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
			while((routeUrl[endRoute]  != "/") && (endRoute <= routeUrl.length) )endRoute++;
			/*Implementation to extract the value  of the param from the request url*/
			let endRequest = current;
			while((requestUrl[endRequest]  != "/") && (endRequest <=requestUrl.length) )endRequest++;
			/*Set param as key/value */
			params[ routeUrl.slice(current + delimiter.length, endRoute) ] = requestUrl.slice(current, endRequest);
			/*Go!*/
			return parseParams(routeUrl.slice(endRoute), requestUrl.slice(endRequest), params);
	}else{
		return params;
	}
}
const convertOnRegexUrl = (url)=>{
		/*Delimiter, consider to pass it to  the args function*/
		const delimiter = ":";
		/*try to find  the position of the delimiter*/
		const current = url.indexOf(delimiter);
		if(current != -1){
			/*Implementation to extract  the param from the routeUlr declare on routes*/
			let endRoute = current;
			while((url[endRoute]  != "/") && (endRoute <= url.length) )endRoute++;
			url = url.slice(0, current) + ".+" +  url.slice(endRoute);
			return convertOnRegexUrl(url);
	}else{
		return url.slice(0, url.length).replace(new RegExp('\\/', 'g'), '\\/');
	}
}
exports = module.exports={ parseParams, convertOnRegexUrl };