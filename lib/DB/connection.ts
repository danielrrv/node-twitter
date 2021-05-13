const mysql = require('mysql');
import { QueryResults, Results } from "../types";
const AWS = require('aws-sdk');

/*Implementation to mysql connections socket*/
const pool = mysql.createPool({
	connectionLimit: process.env.MYSQL_POOL,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});
/*Implementation to DynamoDB connections*/
AWS.config.update({
	region: "us-east-1",
	accessKeyId:process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
  })
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
export const dynamoDBClient = new AWS.DynamoDB.DocumentClient();


/**
 * Executes queries. Uses pool connections. Default 10.
 * @async
 * @param {string} query -Provide a valid query. Implementation trusts in you.
*/
export const statement = async (query: string): Promise<Results[]> => {
	return new Promise((resolve, reject) => {
		pool.getConnection(async (err, connection) => {
			if (err) reject(err); // not connected!
			// Use the connection
			connection.query(query, (error, results,_) => {
				connection.release();
				// Handle error after the release.
				if (error) reject(error);
				else resolve(JSON.parse(JSON.stringify(results)));
			});
		});
	});
}
