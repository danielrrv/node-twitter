import { Response, Request } from "express";
export declare interface Payload {
	Request: Request;

}
type HandlerFunc = (req: Request, res: Response) => void;
export declare interface IRoute {
	path: string;
	handler: HandlerFunc;
}