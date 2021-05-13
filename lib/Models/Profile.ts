
import { dynamoDBClient} from "../connection";


export default class Profile {

	protected static document = process.env.DYNAMO_DB;
	public name: string;
	public description: string;
	public title: string;
	public twitter_user_id?: string;
	public experience_summary?: string;
	public constructor(name: string, description: string, title: string){
		this.name = name;
		this.description = description;
		this.title = title;	
	}
	public static async All(){
		return await dynamoDBClient.scan({TableName: Profile.document}).promise();
	}

	public static async Find(name: string){
		return await dynamoDBClient.get({TableName: Profile.document, key:{"name": name}}).promise()
	}
	public async save(){
		const Item = {
			"name":this.name,
			"description":this.description,
			"title":this.title,
			"twitter_user_id":this.twitter_user_id,
			"experience_summary":this.experience_summary
		};
		return await dynamoDBClient.put({TableName:Profile.document,Item}).promise();
	}
}