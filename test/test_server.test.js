const app = require("../dist/server");
const http = require("http");
const helpers = require("../dist/helpers")
const supertest = require("supertest")

const server = http.createServer(app);

const request = supertest.agent(server) 

describe("Endpoint "/"", () => {
    it("Gets index on /", async done => {
        const response = await request.get("/");
        expect(response.status).toBe(200)
        expect(response.headers["Content-Type"]).toBe("text/html")
        done();
    });
    it("Throws 404 on not registered route", async done => {
        const response = await request.get("/je-ne-exist-pas");
        expect(response.status).toBe(404)
        done();
    })
})

describe("Helpers", ()=>{
    it("parseParams()", done=>{
        routeUrl ="/api/endpoint/:param1/entity/:param2";
        requestUrl="/api/endpoint/1/entity/delete/soft";
        const params= helpers.parseParams(routeUrl, requestUrl);
        expect(Object.keys(params)[0]).toBe("param1");
        expect(Object.keys(params)[1]).toBe("param2");
        expect(Object.values(params)[0]).toBe("1");
        expect(Object.values(params)[1]).toBe("delete");
        done();
    })
    it("convertOnRegexUrl()", done=>{
        url ="/api/endpoint/:param1/entity/:param2";
        const parsedUrl= helpers.convertOnRegexUrl(url);
        
        expect(parsedUrl).toBe("\\/api\\/endpoint\\/.+\\/entity\\/.+");
        done();
    })
})