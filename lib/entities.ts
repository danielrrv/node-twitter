
import Manager from "./Model";
import { IModel } from "./types";
const needle = require('needle');
interface IUser extends IModel {
	tweets(): void;
}
const token = "AAAAAAAAAAAAAAAAAAAAAJlM9AAAAAAAKQrCKeGXVX67PUE4bWCmNuoBgGU%3Dhn8NIZ7NksQzZP0pRiRmkONSzAofokbB54htRs7WgjBJrQ8A8x";

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
export class User extends Manager<User> {
	public primaryKey = "idportfolio";
	public tableName = "portfolio";
	constructor() {
		super();
	}

	public async tweets() {
		const rules = [{
			'value': 'dog has:images -is:retweet',
			'tag': 'dog pictures'
		},
		{
			'value': 'cat has:images -grumpy',
			'tag': 'cat pictures'
		},
		];
		const response = await needle('get', rulesURL, {
			headers: {
				"authorization": `Bearer ${token}`
			}
		})

		if (response.statusCode !== 200) {
			console.log("Error:", response.statusMessage, response.statusCode)
			throw new Error(JSON.parse(JSON.stringify(response.body)));
		}

		return (response.body);

	}
}

