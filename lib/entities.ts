
import Manager from "./Model";


export class User extends Manager {
	public primaryKey = "idportfolio";
	public tableName = "portfolio";
	constructor() {
		super();
	}
};

