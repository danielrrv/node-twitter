const mysql = require('mysql');
import { QueryResults } from "./types";
const pool = mysql.createPool({
	connectionLimit: process.env.MYSQL_POOL,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

const statement = async (query: string): Promise<QueryResults> => {
	return new Promise((resolve, reject) => {
		pool.getConnection(async (err, connection) => {
			if (err) reject(err); // not connected!
			// Use the connection
			connection.query(query, (error, results, fields) => {
				connection.release();
				// Handle error after the release.
				if (error) reject(error);
				else resolve(JSON.parse(JSON.stringify(results)));
			});
		});
	});
}
export default statement;