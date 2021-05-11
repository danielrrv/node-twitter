
import statement from "./connection"
import { QueryResults } from "./types";
import { IModel, Constructor } from "./types";



export default class Manager<T> {
	public static Get<T>(Instance: Constructor<T>): T {
		return new Instance();
	}
	protected primaryKey = "id";
	protected tableName = "myTable";

	public async find(id?: string): Promise<QueryResults> {
		if (!id) {
			return await statement("select * from " + this.tableName + ";");
		}
		if (!isNaN(+id)) {
			return await statement("select * from " + this.tableName + " where " + this.primaryKey + " = " + id + ";");
		} else {
			throw new Error("Primary key should be integer");
		}
	}
	//protected where(column: string, condition: string, filter: string) {

	//}


};