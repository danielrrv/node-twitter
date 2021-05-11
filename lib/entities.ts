
import { urlencoded } from "express";
import Manager from "./Model";
import { IModel } from "./types";
const needle = require('needle');
const https = require('https');
interface IUser extends IModel{
	tweets(): void;
}

export class User extends Manager<IUser> {
	public primaryKey = "idportfolio";
	public tableName = "portfolio";

	constructor() {
		super();
	}

	public static Tweets(userName):any{
		const options = {
			hostname: "api.twitter.com",
			port: 443,
			path:  '/2/tweets/search/recent?query=from:'+ userName,
			method: 'GET',
			headers:{
				Authorization:`Bearer ${process.env.TWITTER_BEARER_TOKEN}`
			}
		  }
		  return new Promise((resolve, reject)=>{
			const req = https.request(options, res => {
				// console.log(`statusCode: ${res.statusCode}`)
				
				res.on('data', stream => {
					resolve(JSON.parse(stream).data);
					req.end()
				})
			  })
			  
			  req.on('error', error => {
				console.error(error)
				resolve(null);
			  })
			  req.end()
		  })
	

	}
}

