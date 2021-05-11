
import statement from "./connection"
import { QueryResults, Results } from "./types";
import { IModel, Constructor } from "./types";



export default class Manager<T> {
	public static Get<T>(Instance: Constructor<T>): T {
		return new Instance();
	}
	protected primaryKey = "id";
	protected tableName = "myTable";
	/**
	 * Finds a model instance by primaryKey. If not id returns all records
	 * @async
	 * @param {string?} id primaryKey
	 * @return {Promise<Results[]>} 
	*/
	public async Find(id?: string): Promise<Results[]> {
		if (!id) {
			return await statement("select * from " + this.tableName + ";");
		}
		/*Implementation to validate id. It should be integer.*/
		if (!isNaN(+id)) {
			/*Implementation to query. See connection*/
			return await statement("select * from " + this.tableName + " where " + this.primaryKey + " = " + id + ";");
		} else {
			/*TODO: Generic error*/
			throw new Error("Primary key should be integer");
		}
	}
	public async Where(column: string, condition: string, filter: string):Promise<Results[]> {
		/*TODO:Validates inputs. Prepare default responses.*/
		return await statement("select * from " + this.tableName + " where " + column + condition + filter + ";")
	}


};