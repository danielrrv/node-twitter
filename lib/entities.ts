

import Manager from "./Model";
import { dynamoClient } from "./connection";
import { IModel} from "./types";
const https = require('https');
interface IUser extends IModel{
	tweets(): void;
}
/**
 * Class represents User
 * @extends Manager
 * @classdesc Model points to portfolio table
 */
export class User extends Manager<IUser> {
	/*Primary key of the model*/
	protected primaryKey = "idportfolio";
	/*Declare the table that model points to*/
	protected tableName = "portfolio";
	 /** @constructs */
	public constructor() {
		super();
	}
	/**
	 * Returns model tweets.
	 * @param {string} userName twitter_username.
	 * @returns Promise<any>
	*/
	public static Tweets(userName:string):Promise<any>{
		/*API V2*/
		const options = {
			hostname: "api.twitter.com",
			port: 443,
			path:  "/2/tweets/search/recent?query=from:"+ userName,
			method: "GET",
			headers:{
				/*Basic Bearer Token*/
				Authorization:`Bearer ${process.env.TWITTER_BEARER_TOKEN}`
			}
		}
		return new Promise((resolve) => {
			const req = https.request(options, (res) => {
				res.on("data", stream => {
					resolve(JSON.parse(stream).data);
					/*Notifies remote server to close the connection*/
					req.end();
				})
			})
			req.on("error", error => {
				/*Notifies remote server to close connection right away error occurs*/
				/*TODO: Moves console.log to log files of the app*/
				console.error(error);
				/*Set tweets to null from the promise*/
				resolve(null);
			})
			req.end();
		});
	}
}

export class Profile {

	protected static document = process.env.DYNAMO_DB;
	public name: string;
	public description: string;
	public title: string;;
	public twitter_user_id?: string;
	public experience_summary?: string;
	public constructor(name: string, description:string, title:string){
		this.name = name;
		this.description = description;
		this.title = title;	
	}
	public static All(){
		return new Promise((resolve,reject)=>{
			dynamoClient.scan({TableName: Profile.document},
				(err, data)=>{
				if(err) throw err;
				else resolve(data);
			});
		})
	}
	public static Find(name: string){
		return new Promise(
			(resolve, reject) => {
				dynamoClient.batchGetItem({tableName:Profile.document, Statement :[
					{
						Statement: name,
					}
				]
			},
			(err, data)=>{
				if(err) throw err;
				else resolve(data);
			});
		});
	}
	public save(){
		return new Promise((resolve, reject)=>{
			dynamoClient.putItem(
				{
					TableName:Profile.document,
					Item:{
						"name":{S:this.name},
						"description":{S:this.description},
						"title":{S:this.title},
						"twitter_user_id":{S:this.twitter_user_id, NULL: true},
						"experience_summary":{S:this.experience_summary, NULL: true}
					}
				},
				(err, data)=>{
					if(err)throw err;
					resolve(data);
			})
		})
	}
}