const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: process.env.MYSQL_POOL,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
})

const statement = (query: string) => {
	let results;
	let fields;
	let error;
	pool.getConnection((err, connection) => {
		if (err) throw err; // not connected!
		// Use the connection
		connection.query(query, (_error, _results, _fields) => {
			results = _results;
			fields = _fields;
			error = _error;
			connection.release();
			// Handle error after the release.
			if (_error) throw _error;
		});
	});
	return { results, fields, error };
}

export default statement;