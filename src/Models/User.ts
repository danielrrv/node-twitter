import { RelationalModel as Manager } from "../../lib/index";
import { IModel } from "../../lib/index";
import * as https from "https";

interface IUser extends IModel {
	Tweets(): Promise<void>;
}
/**
 * Class represents User
 * @extends Manager
 * @classdesc Model points to portfolio table
 */
export default class User extends Manager<IUser> {
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
	public static Tweets(userName: string): Promise<any> {
		/*API V2*/
		const options = {
			hostname: "api.twitter.com",
			port: 443,
			path: "/2/tweets/search/recent?query=from:" + encodeURI(userName),
			method: "GET",
			headers: {
				/*Basic Bearer Token*/
				Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
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