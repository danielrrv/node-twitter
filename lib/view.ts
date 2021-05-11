
const fs = require('fs');
const http = require('http');
const path = require("path");
const Handlebars = require("handlebars");
import { Response } from "express";

const view = (response: Response, file: string, options: any): any => {
	try {
		const stringHtml = fs.readFileSync(path.resolve(path.join(__dirname, "..", "templates", file)), "utf-8");
		response.write(Handlebars.compile(stringHtml)(options));
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html');
		response.end();
	} catch (error) {
		throw new Error("No view found. Place views on Templates folder.");
	}
}
export default view;