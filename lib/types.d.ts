import { Response, Request } from "express";
export declare interface Payload {
	Request: Request;

}
/*Implementation to describe Handler functions*/
type HandlerFunc = (req: Request, res: Response, params?:Params) => Promise<RedirectResponse> | void;

export declare interface IRoute {
	path: string;
	handler: HandlerFunc;
	params?: Params
}
export declare interface IModel {
	Find(id?: string): Promise<QueryResults>;
	Where(column: string, condition: string, filter: string):Promise<QueryResults>;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export type Results = any; 

export type RedirectResponse = void | Response;
export declare interface QueryResults {
	results: any,
	fields: any,
	error: any
}

export declare interface Params {
	[key: string]: string;
}