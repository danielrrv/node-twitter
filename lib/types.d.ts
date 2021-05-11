import { Response, Request } from "express";
export declare interface Payload {
	Request: Request;

}
type HandlerFunc = (req: Request, res: Response, params?:Params) => Promise<void> | void;
export declare interface IRoute {
	path: string;
	handler: HandlerFunc;
	params?: Params
}
export declare interface IModel {

	find(id?: string): Promise<QueryResults>;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export declare interface QueryResults {
	results: any,
	fields: any,
	error: any
}

export declare interface Params {
	[key: string]: string;
}